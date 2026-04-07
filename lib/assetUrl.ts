/**
 * Utility function to generate asset URLs from AWS S3
 * Falls back to local paths if S3 URL is not configured
 */
export const getAssetUrl = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_AWS_S3_URL;
  
  if (!baseUrl) {
    // Fallback to local path
    return `/${path}`.replace(/\/+/g, '/');
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${baseUrl}/${cleanPath}`.replace(/\/+/g, '/');
};
