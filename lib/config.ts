export const config = {
  geminiApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  maxImageSize: 5 * 1024 * 1024, // 5MB
} as const;

export const MAX_IMAGE_SIZE = config.maxImageSize;

export function validateConfig() {
  if (!config.geminiApiKey) {
    throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable');
  }
}