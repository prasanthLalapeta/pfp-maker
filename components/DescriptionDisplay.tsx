"use client";

import { Loader2, CheckCircle } from "lucide-react"; // Import CheckCircle icon
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DescriptionDisplayProps {
  description: string;
  isLoading: boolean;
}

export default function DescriptionDisplay({
  description,
  isLoading,
}: DescriptionDisplayProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(description);
      console.log("Copying text:", description);
      toast.success("Description copied successfully", {
        icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      });
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy description");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {description ? (
        <>
          {description && (
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
          )}

          <Button onClick={copyToClipboard} variant="secondary" className="w-full">
            Copy Description
          </Button>
        </>
      ) : (
        <div className="text-center text-muted-foreground h-48 flex items-center justify-center">
          <p>Upload an image to generate a description</p>
        </div>
      )}
    </div>
  );
}