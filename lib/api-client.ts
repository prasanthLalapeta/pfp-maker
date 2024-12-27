interface GeneratePromptResponse {
  prompt: string;
  error?: string;
}

export async function generatePrompt(imageBase64: string): Promise<string> {
  try {
    const response = await fetch('/api/generatePrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageBase64 }),
    });

    const data: GeneratePromptResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    if (!data.prompt) {
      throw new Error('No description generated');
    }

    return data.prompt;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate description';
    console.error('Error generating prompt:', errorMessage);
    throw new Error(errorMessage);
  }
}