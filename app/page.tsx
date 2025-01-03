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

  const uploadToBlob = async (base64Data: string) => {
    try {
      // Convert base64 to blob
      const base64Response = await fetch(base64Data);
      const blob = await base64Response.blob();

      // Create a file from the blob
      const file = new File([blob], 'generated-chibi.png', { type: 'image/png' });

      // Upload to Vercel Blob
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error('Failed to upload chibi image');
      }

      const imageMetadata = await response.json();
      return imageMetadata.url;
    } catch (error) {
      console.error('Error uploading chibi to blob:', error);
      throw error;
    }
  };

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
      setIsLoading(false);

      // Generate chibi image based on the description
      setIsGeneratingChibi(true);
      try {
        const chibiBase64 = await generateChibiImage(description);
        // Upload the generated chibi to Vercel Blob
        const chibiUrl = await uploadToBlob(chibiBase64);
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
      a.download = 'chibi-avatar.png';
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
    <>
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <PageHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 !mt-[5px]">
            <div className="space-y-8">
              <Card className="p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Image
                </h2>
                <ImageUpload onUpload={handleImageUpload} />
              </Card>

              <Card className="p-6 space-y-6 md:hidden">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Image Transformation
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">Original Photo</p>
                    <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Original"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                          Upload an image
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">Chibi Version</p>
                    <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                      {isGeneratingChibi ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4 p-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                          <p className="text-sm text-center text-muted-foreground">
                            Generating...
                          </p>
                        </div>
                      ) : chibiImage ? (
                        <img
                          src={chibiImage}
                          alt="Generated Chibi"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                          Awaiting generation
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {chibiImage && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white 
                        bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                        rounded-full shadow-lg shadow-purple-500/30 
                        hover:shadow-purple-500/40 hover:scale-105
                        transform transition-all duration-200 
                        animate-pulse-slow"
                    >
                      <Download className="w-5 h-5" />
                      Download Chibi Image
                    </button>
                  </div>
                )}
              </Card>

              <Card className="hidden md:block p-6 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Image Transformation
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">Original Photo</p>
                    <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Original"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                          Upload an image
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">Chibi Version</p>
                    <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                      {isGeneratingChibi ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4 p-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                          <p className="text-sm text-center text-muted-foreground">
                            Generating...
                          </p>
                        </div>
                      ) : chibiImage ? (
                        <img
                          src={chibiImage}
                          alt="Generated Chibi"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                          Awaiting generation
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {chibiImage && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white 
                        bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                        rounded-full shadow-lg shadow-purple-500/30 
                        hover:shadow-purple-500/40 hover:scale-105
                        transform transition-all duration-200 
                        animate-pulse-slow"
                    >
                      <Download className="w-5 h-5" />
                      Download Chibi Image
                    </button>
                  </div>
                )}
              </Card>
            </div>

            <div className="h-full">
              <Card className="p-6 space-y-4 h-full">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Generated Description
                </h2>
                <DescriptionDisplay description={description} isLoading={isLoading} />
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
