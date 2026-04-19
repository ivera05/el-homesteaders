const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY;

type ApiRequestOptions = RequestInit & {
  isAdmin?: boolean;
  method?: string;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    isAdmin = false,
    headers: customHeaders,
    ...fetchOptions
  } = options;

  const apiKey = isAdmin ? ADMIN_API_KEY : PUBLIC_API_KEY;

  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  if (!apiKey) {
    throw new Error('Missing API key. Please check your environment variables.');
  }

  const headers = new Headers(customHeaders);

  headers.set('Content-Type', 'application/json');
  headers.set('x-api-key', apiKey);

  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
