export default async (req: Request): Promise<Response> => {
  if (req.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return Response.json(
      { error: 'GitHub OAuth is not configured on this deployment.' },
      { status: 503 }
    );
  }

  const requestUrl = new URL(req.url);
  const queryRedirect = requestUrl.searchParams.get('redirect_uri');
  const siteBase = (process.env.URL || process.env.APP_URL || requestUrl.origin).replace(/\/$/, '');
  const redirectUri = queryRedirect || `${siteBase}/auth/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user,public_repo',
    allow_signup: 'true',
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return Response.json({
    url: authUrl,
    clientId,
    redirectUri,
  });
};
