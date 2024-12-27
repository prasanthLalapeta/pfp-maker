import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

/**
 * Generates a detailed description of a headshot image using Gemini AI,
 * including experimental attachments for enhanced image recognition.
 */
export async function generateImageDescription(imageMetadata: {
  id: string;
  name: string;
  contentType: string;
  url: string;
}): Promise<string> {
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const model = google('models/gemini-2.0-flash-exp');

  const prompt = `
    Create a detailed description of this headshot image, focusing on:
    1. Facial features: Describe the person's face, including any distinct features like beard, glasses, and expressions.
    2. Accessories: Mention visible accessories such as a chain, glasses, or other items.
    3. Clothing: Describe the clothing, including the style, pattern, and color.
    4. Background: Include details about the background, whether it's plain, natural, or has specific elements.

    The description should guide an AI to generate a chibi-style cartoon version of the person, retaining all key features, using a pastel color palette for simplicity and cuteness.
  `.trim();

  // Prepare experimental attachment metadata
  const experimentalAttachments = [
    {
      id: imageMetadata.id, // Unique identifier for the image
      name: imageMetadata.name, // File name
      contentType: imageMetadata.contentType, // MIME type (e.g., "image/jpeg")
      url: imageMetadata.url, // Publicly accessible URL of the uploaded image
      status: "uploaded", // Indicates the upload is complete
    },
  ];

  const result = await generateText({
    model,
    messages: [
      {
        role: 'user',
        content: prompt,
        experimental_attachments: experimentalAttachments,
      },
    ],
    maxTokens: 512,
    temperature: 0.7,
    topP: 0.4,
  });

  if (!result || !result.text) {
    throw new Error('No response received from Gemini AI.');
  }

  return result.text;
}
