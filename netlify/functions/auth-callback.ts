import { escapeHtml } from '../../server/html';

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  if (error || !code) {
    const safeErrorMsg = escapeHtml(errorDescription || error || 'No authorization code provided');
    const safeErrorCode = JSON.stringify(error || 'Authentication failed');

    return new Response(
      `<!DOCTYPE html>
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
      </html>`,
      { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Configuration Error</title></head>
        <body style="font-family: monospace; background: #080c14; color: #f87171; padding: 2rem; text-align: center;">
          <h3>GitHub OAuth is not configured</h3>
          <p>Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variables.</p>
        </body>
      </html>`,
      { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to exchange token');
    }

    const accessToken = tokenData.access_token;

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Saravanasai-Portfolio',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const userData = (await userResponse.json()) as {
      id: number;
      login: string;
      name?: string;
      avatar_url?: string;
      bio?: string;
      public_repos?: number;
      html_url: string;
    };

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

    return new Response(
      `<!DOCTYPE html>
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
      </html>`,
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (err: unknown) {
    console.error('Error exchanging GitHub token:', err);
    const safeErr = escapeHtml(err instanceof Error ? err.message : 'Unknown error');
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Authentication Error</title></head>
        <body style="font-family: monospace; background: #080c14; color: #f87171; padding: 2rem; text-align: center;">
          <h3>OAuth Exchange Failed</h3>
          <p>${safeErr}</p>
        </body>
      </html>`,
      { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
};
