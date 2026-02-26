/**
 * Safely builds a URL-encoded static asset path for files with spaces and special characters.
 * Preserves the /assets/ prefix while encoding the filename portion.
 * Handles cases where the input might already include /assets/ or be an absolute URL.
 */
export function getStaticAssetUrl(filename: string): string {
  // If already an absolute URL (http/https), return as-is
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  
  // If already starts with /assets/, strip it to avoid duplication
  const cleanFilename = filename.startsWith('/assets/') 
    ? filename.substring(8) 
    : filename;
  
  // Split the filename into path segments
  const segments = cleanFilename.split('/');
  
  // URL-encode each segment (handles spaces, special chars, etc.)
  const encodedSegments = segments.map(segment => encodeURIComponent(segment));
  
  // Reconstruct the path with /assets/ prefix
  return `/assets/${encodedSegments.join('/')}`;
}
