"use client";
import { useState } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import ImageUpload from '@/components/ImageUpload';
import DescriptionDisplay from '@/components/DescriptionDisplay';
import { generateImageDescription } from '@/lib/services/gemini';
import { generateChibiImage } from '@/lib/services/openai';
import { PageHeader } from '@/components/PageHeader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingChibi, setIsGeneratingChibi] = useState(false);
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [chibiImage, setChibiImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setChibiImage(null);
    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const imageMetadata = await response.json();
      setImagePreview(imageMetadata.url);

      // Generate description using the image metadata
      const description = await generateImageDescription(imageMetadata);
      setDescription(description);
      setIsLoading(false); // Set loading to false after description is generated

      // Generate chibi image based on the description
      setIsGeneratingChibi(true);
      try {
        const chibiUrl = await generateChibiImage(description);
        setChibiImage(chibiUrl);
      } catch (error: any) {
        console.error('Error generating chibi:', error);
        toast.error('Failed to generate chibi image');
      } finally {
        setIsGeneratingChibi(false);
      }

    } catch (error: any) {
      console.error('Error processing image:', error);
      toast.error(error.message || 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!chibiImage) return;

    try {
      const response = await fetch(chibiImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-chibi.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download image');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <PageHeader />
        <div className="grid md:grid-cols-3 gap-8">
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

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generated Chibi
            </h2>
            {isGeneratingChibi ? (
              <div className="text-center text-muted-foreground h-48 flex flex-col items-center justify-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                <p>Generating chibi from description...</p>
              </div>
            ) : chibiImage ? (
              <div className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden border">
                  <img
                    src={chibiImage}
                    alt="Generated Chibi"
                    className="object-cover w-full h-full"
                  />
                </div>
                <Button
                  onClick={handleDownload}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground h-48 flex items-center justify-center">
                <p>Description will be used to generate a chibi image</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
