/**
 * Constructs and returns the full domain URL based on the request headers
 * or URL.
 *
 * @param request - Request object to extract domain and protocol information.
 * @return The full domain URL including protocol and host.
 */
export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ??
    request.headers.get('host') ??
    new URL(request.url).host;
  const protocol = request.headers.get('X-Forwarded-Proto') ?? 'http';
  return `${protocol}://${host}`;
}
