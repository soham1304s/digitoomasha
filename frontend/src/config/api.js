// Centralized API and WebSockets Environment Configuration
export const API_BASE_URL =
  (import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? `${window.location.origin}/api`
    : 'http://localhost:5000/api');

export const SOCKET_SERVER_URL =
  (import.meta.env && import.meta.env.VITE_SOCKET_URL) ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? window.location.origin
    : 'http://localhost:5000');


/**
 * Universal fetch wrapper for API endpoints with JWT token auto-injection
 */
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('digitoomasha_jwt_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let cleanEndpoint = endpoint;
  if (cleanEndpoint.startsWith('/api/')) {
    cleanEndpoint = cleanEndpoint.slice(4);
  } else if (cleanEndpoint.startsWith('api/')) {
    cleanEndpoint = cleanEndpoint.slice(3);
  }

  const base = API_BASE_URL.replace(/\/api\/?$/, '');
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${base}/api${cleanEndpoint.startsWith('/') ? '' : '/'}${cleanEndpoint}`;

  try {
    const response = await fetch(url, { ...options, headers });
    const json = await response.json().catch(() => ({}));

    return {
      ok: response.ok,
      status: response.status,
      ...json,
      data: json,
    };
  } catch (error) {
    console.warn(`[API Connection Warning] ${endpoint}:`, error.message);
    return {
      ok: false,
      status: 0,
      error: error.message,
      data: null,
    };
  }
}
