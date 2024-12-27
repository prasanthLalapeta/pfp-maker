"use client";
import { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import DescriptionDisplay from '@/components/DescriptionDisplay';
import { generateImageDescription } from '@/lib/services/gemini';
import { PageHeader } from '@/components/PageHeader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    try {
      // Upload image to Vercel Blob
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const imageMetadata = await response.json();

      // Set image preview to the uploaded image URL
      setImagePreview(imageMetadata.url);

      // Generate description using the image metadata
      const description = await generateImageDescription(imageMetadata);
      setDescription(description);
    } catch (error: any) {
      console.error('Error processing image:', error);
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <PageHeader />
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Image
            </h2>
            <ImageUpload onUpload={handleImageUpload} />
            {imagePreview && (
              <div className="relative aspect-square rounded-lg overflow-hidden border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Generated Description
            </h2>
            <DescriptionDisplay description={description} isLoading={isLoading} />
          </Card>
        </div>
      </div>
    </main>
  );
}
