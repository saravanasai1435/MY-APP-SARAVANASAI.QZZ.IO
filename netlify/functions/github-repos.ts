export default async (req: Request): Promise<Response> => {
  if (req.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const authHeader = req.headers.get('authorization');
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    const headers: Record<string, string> = {
      'User-Agent': 'Saravanasai-Portfolio',
      Accept: 'application/vnd.github.v3+json',
    };

    if (authHeader && authHeader.startsWith('Bearer ')) {
      headers.Authorization = authHeader;
    } else if (clientId && clientSecret) {
      const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      headers.Authorization = `Basic ${basicAuth}`;
    }

    const response = await fetch(
      'https://api.github.com/users/saravanasai1435/repos?sort=updated&per_page=30',
      { headers }
    );

    if (!response.ok) {
      const remaining = response.headers.get('x-ratelimit-remaining');
      return Response.json(
        {
          error: `GitHub API returned ${response.status}`,
          rateLimited: remaining === '0',
        },
        { status: response.status }
      );
    }

    const repos = await response.json();
    return Response.json(repos);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch GitHub repositories';
    return Response.json({ error: message }, { status: 500 });
  }
};
