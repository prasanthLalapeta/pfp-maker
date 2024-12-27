import { MAX_IMAGE_SIZE } from '../config';

export class ImageProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageProcessingError';
  }
}

export async function processImage(file: File): Promise<string> {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new ImageProcessingError('Please upload an image file');
  }

  // Validate file size (5MB limit)
  if (file.size > MAX_IMAGE_SIZE) {
    throw new ImageProcessingError('Image size must be less than 5MB');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      try {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        
        if (!base64Data) {
          reject(new ImageProcessingError('Failed to process image'));
          return;
        }
        
        resolve(base64Data);
      } catch (error) {
        reject(new ImageProcessingError('Failed to process image'));
      }
    };
    
    reader.onerror = () => {
      reject(new ImageProcessingError('Failed to read image file'));
    };
    
    reader.readAsDataURL(file);
  });
}