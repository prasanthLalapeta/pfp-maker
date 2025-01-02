"use client";

import { Copy } from 'lucide-react';
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

interface DescriptionDisplayProps {
  description: string;
  isLoading: boolean;
}

export default function DescriptionDisplay({ description, isLoading }: DescriptionDisplayProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(description);
      toast.success('Description copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy description');
    }
  };

  return (
    <div className="relative min-h-[200px] rounded-lg p-4 flex items-center justify-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="text-sm text-center text-muted-foreground">
            Analyzing image...
          </p>
        </div>
      ) : description ? (
        <div className="w-full h-full flex flex-col justify-between gap-4">
          <div>
            <ReactMarkdown
              className="text-sm leading-relaxed"
              components={{
                p: ({ node, ...props }) => (
                  <p {...props} className="mb-4">
                    {props.children}
                  </p>
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="list-disc pl-6 mb-4">
                    {props.children}
                  </ul>
                ),
                ol: ({ node, ...props }) => (
                  <ol {...props} className="list-decimal pl-6 mb-4">
                    {props.children}
                  </ol>
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </div>
          <div className="flex justify-center">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                text-white rounded-full shadow-lg shadow-purple-500/20
                hover:shadow-purple-500/30 hover:scale-105
                transform transition-all duration-200"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          Upload an image to generate description
        </p>
      )}
    </div>
  );
}