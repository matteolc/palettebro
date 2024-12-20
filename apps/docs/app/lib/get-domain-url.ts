import type { Nullable } from '../types';

/**
 * Extracts the domain URL from an HTTP request.
 */
export function getDomainUrl(request: Request): Nullable<string> {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('Host');
  if (!host) return null;

  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}
