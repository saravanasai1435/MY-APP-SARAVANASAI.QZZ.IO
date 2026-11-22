import React, { createContext, useContext, useState, useEffect } from 'react';

export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  bio?: string;
  public_repos?: number;
  html_url: string;
}

interface AuthContextType {
  user: GitHubUser | null;
  token: string | null;
  isLoading: boolean;
  loginWithGitHub: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'saravanasai_gh_token';
const USER_KEY = 'saravanasai_gh_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });
  const [user, setUser] = useState<GitHubUser | null>(() => {
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Validate or refresh user profile on mount if token exists
  useEffect(() => {
    if (token && !user) {
      fetch('/api/auth/github/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.login) {
            setUser(data);
            localStorage.setItem(USER_KEY, JSON.stringify(data));
          } else {
            // Token expired or invalid
            logout();
          }
        })
        .catch(() => {});
    }
  }, [token]);

  // Listen for popup postMessage events (mandated by oauth-integration skill)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      // Validate origin matches current site, Netlify preview/prod, run.app, or localhost
      if (
        origin !== window.location.origin &&
        !origin.endsWith('.netlify.app') &&
        !origin.endsWith('.run.app') &&
        !origin.includes('localhost') &&
        !origin.includes('127.0.0.1')
      ) {
        return;
      }

      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const { token: receivedToken, user: receivedUser } = event.data;
        if (receivedToken) {
          setToken(receivedToken);
          localStorage.setItem(TOKEN_KEY, receivedToken);
        }
        if (receivedUser) {
          setUser(receivedUser);
          localStorage.setItem(USER_KEY, JSON.stringify(receivedUser));
        }
        setIsLoading(false);
      } else if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        console.error('GitHub OAuth error:', event.data?.error);
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const loginWithGitHub = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch the exact GitHub authorize URL from server
      const redirectUri = `${window.location.origin}/auth/callback`;
      const res = await fetch(`/api/auth/github/url?redirect_uri=${encodeURIComponent(redirectUri)}`);
      
      if (!res.ok) {
        throw new Error(`Failed to retrieve OAuth authorization URL (${res.status})`);
      }

      const { url } = await res.json();

      // 2. Open the OAuth provider's URL directly in popup (NOT a container route)
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const authWindow = window.open(
        url,
        'github_oauth_popup',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
      );

      if (!authWindow) {
        alert('Please allow popups for this site to sign in with GitHub.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Failed to initiate GitHub OAuth:', err);
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, loginWithGitHub, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
