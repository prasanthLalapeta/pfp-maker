import { createOpenAI } from '@ai-sdk/openai';
import { experimental_generateImage as generateImage } from 'ai';

/**
 * Generates a chibi-style image based on the provided description using DALL·E
 */
export async function generateChibiImage(description: string): Promise<string> {
    // Initialize OpenAI client
    const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Define the prompt for image generation
    const prompt = `
        Okay, here's a detailed description of the headshot image, designed to guide an AI in creating a chibi-style cartoon version: 
        ${description}
        Please ensure the following:
        - Focus on producing one consistent, detailed chibi-style avatar based on the provided description.
    
        Thank you!
    `.trim();


    try {
        // Generate the image using DALL·E
        const { image } = await generateImage({
            model: openai.image('dall-e-3'),
            prompt,
            size: '1024x1024',
        });

        // Check if the image data is available
        if (image?.base64) {
            // Convert base64 to a data URL
            const imageUrl = `data:image/png;base64,${image.base64}`;
            return imageUrl;
        } else {
            throw new Error('Image generation failed: No image data returned');
        }
    } catch (error) {
        console.error('Error generating chibi image:', error);
        throw new Error('Failed to generate chibi image');
    }
}
