/**
 * Response structure from Gemini API
 */
export interface GeminiResponse {
  text: string;
}

/**
 * Error structure from Gemini API
 */
export interface GeminiError {
  message: string;
  code?: string;
}

/**
 * Message structure for Gemini API requests
 */
export interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
}