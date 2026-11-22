export default async (req: Request): Promise<Response> => {
  if (req.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
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
      return Response.json({ error: 'Failed to fetch user from GitHub' }, { status: userRes.status });
    }

    const userData = (await userRes.json()) as {
      id: number;
      login: string;
      name?: string;
      avatar_url: string;
      bio?: string;
      public_repos?: number;
      html_url: string;
    };

    return Response.json({
      id: userData.id,
      login: userData.login,
      name: userData.name,
      avatar_url: userData.avatar_url,
      bio: userData.bio,
      public_repos: userData.public_repos,
      html_url: userData.html_url,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return Response.json({ error: message }, { status: 500 });
  }
};
