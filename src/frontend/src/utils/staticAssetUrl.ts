/**
 * Safely builds a URL-encoded static asset path for files with spaces and special characters.
 * Preserves the /assets/ prefix while encoding the filename portion.
 */
export function getStaticAssetUrl(filename: string): string {
  // Split the filename into path segments
  const segments = filename.split('/');
  
  // URL-encode each segment (handles spaces, special chars, etc.)
  const encodedSegments = segments.map(segment => encodeURIComponent(segment));
  
  // Reconstruct the path with /assets/ prefix
  return `/assets/${encodedSegments.join('/')}`;
}
