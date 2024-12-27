export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface GeneratePromptResponse {
  prompt: string;
}