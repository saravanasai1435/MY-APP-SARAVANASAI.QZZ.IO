import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateAssistantReply } from './server/assistant';
import { escapeHtml } from './server/html';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// GitHub OAuth Configuration (set via environment variables)
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';

app.use(express.json());

// AI Assistant endpoint
app.post('/api/assistant/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const reply = await generateAssistantReply(message.trim().slice(0, 2000));
    res.json({ reply });
  } catch (error: unknown) {
    console.error('Error handling assistant request:', error);
    res.status(500).json({ error: 'Failed to process AI assistant request' });
  }
});

// ==========================================
// GitHub OAuth & Elevated API Integration
// ==========================================

// 1. Get OAuth authorization URL for popup
app.get('/api/auth/github/url', (req: Request, res: Response) => {
  if (!GITHUB_CLIENT_ID) {
    res.status(503).json({ error: 'GitHub OAuth is not configured.' });
    return;
  }

  const queryRedirect = req.query.redirect_uri as string | undefined;
  const appUrl = process.env.APP_URL ? `${process.env.APP_URL.replace(/\/$/, '')}/auth/callback` : '';
  const redirectUri = queryRedirect || appUrl || `http://localhost:${PORT}/auth/callback`;

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'read:user,public_repo',
    allow_signup: 'true',
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  res.json({
    url: authUrl,
    clientId: GITHUB_CLIENT_ID,
    redirectUri,
  });
});

// 2. OAuth Callback handler (compatible with popup postMessage pattern)
app.get(['/auth/callback', '/auth/callback/'], async (req: Request, res: Response) => {
  const { code, error, error_description } = req.query;

  if (error || !code) {
    const safeErrorMsg = escapeHtml(String(error_description || error || 'No authorization code provided'));
    const safeErrorCode = JSON.stringify(String(error || 'Authentication failed'));
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GitHub Authentication Error</title>
          <style>
            body { font-family: monospace; background: #080c14; color: #f87171; padding: 2rem; text-align: center; }
          </style>
        </head>
        <body>
          <h2>GitHub Auth Failed</h2>
          <p>${safeErrorMsg}</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: ${safeErrorCode} }, window.location.origin);
              setTimeout(() => window.close(), 1800);
            }
          </script>
        </body>
      </html>
    `);
    return;
  }

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    res.status(500).send('GitHub OAuth credentials are not configured.');
    return;
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to exchange token');
    }

    const accessToken = tokenData.access_token;

    // Fetch user details with the token
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Saravanasai-Portfolio',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const userData = await userResponse.json();

    const sanitizedUser = JSON.stringify({
      id: userData.id,
      login: userData.login,
      name: userData.name || userData.login,
      avatar_url: userData.avatar_url,
      bio: userData.bio || '',
      public_repos: userData.public_repos || 0,
      html_url: userData.html_url,
    });

    const safeAvatar = escapeHtml(
      userData.avatar_url || 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
    );
    const safeLogin = escapeHtml(userData.login || 'User');

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GitHub Authentication Successful</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #080c14;
              color: #f1f5f9;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .card {
              background: #0e1626;
              border: 1px solid #1e293b;
              padding: 2.5rem;
              border-radius: 1rem;
              text-align: center;
              max-width: 420px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
            }
            .avatar {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              border: 2px solid #06b6d4;
              margin-bottom: 1rem;
            }
            .spinner {
              width: 28px;
              height: 28px;
              border: 3px solid #1e293b;
              border-top-color: #06b6d4;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 1.25rem auto 0;
            }
            @keyframes spin { to { transform: rotate(360deg); } }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${safeAvatar}" alt="Avatar" class="avatar" />
            <h3 style="color: #38bdf8; margin: 0 0 0.5rem;">Authentication Successful</h3>
            <p style="color: #cbd5e1; margin: 0; font-size: 14px;">Connected as <strong>@${safeLogin}</strong></p>
            <div class="spinner"></div>
            <p style="font-size: 11px; color: #64748b; margin-top: 1rem; font-family: monospace;">Closing window and returning to portfolio...</p>
          </div>
          <script>
            const payload = {
              type: 'OAUTH_AUTH_SUCCESS',
              token: ${JSON.stringify(accessToken)},
              user: ${sanitizedUser}
            };
            if (window.opener) {
              window.opener.postMessage(payload, window.location.origin);
              setTimeout(() => {
                window.close();
              }, 600);
            } else {
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error('Error exchanging GitHub token:', err);
    const safeErr = escapeHtml(err?.message || 'Unknown error');
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Error</title></head>
        <body style="font-family: monospace; background: #080c14; color: #f87171; padding: 2rem; text-align: center;">
          <h3>OAuth Exchange Failed</h3>
          <p>${safeErr}</p>
        </body>
      </html>
    `);
  }
});

// 3. Current authenticated user profile
app.get('/api/auth/github/user', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'Saravanasai-Portfolio',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userRes.ok) {
      res.status(userRes.status).json({ error: 'Failed to fetch user from GitHub' });
      return;
    }

    const userData = await userRes.json();
    res.json({
      id: userData.id,
      login: userData.login,
      name: userData.name,
      avatar_url: userData.avatar_url,
      bio: userData.bio,
      public_repos: userData.public_repos,
      html_url: userData.html_url,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// 4. Elevated Repositories Fetching Proxy (elevates rate limits from 60 to 5,000 req/hr)
app.get('/api/github/repos', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const headers: Record<string, string> = {
      'User-Agent': 'Saravanasai-Portfolio',
      Accept: 'application/vnd.github.v3+json',
    };

    if (authHeader && authHeader.startsWith('Bearer ')) {
      headers.Authorization = authHeader;
    } else if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
      // Basic auth with Client credentials gives 5,000 req/hour for public GitHub API queries
      const basicAuth = Buffer.from(`${GITHUB_CLIENT_ID}:${GITHUB_CLIENT_SECRET}`).toString('base64');
      headers.Authorization = `Basic ${basicAuth}`;
    }

    const response = await fetch(
      'https://api.github.com/users/saravanasai1435/repos?sort=updated&per_page=30',
      { headers }
    );

    if (!response.ok) {
      const remaining = response.headers.get('x-ratelimit-remaining');
      res.status(response.status).json({
        error: `GitHub API returned ${response.status}`,
        rateLimited: remaining === '0',
      });
      return;
    }

    const repos = await response.json();
    res.json(repos);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch GitHub repositories' });
  }
});

// Serve frontend in development and production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
