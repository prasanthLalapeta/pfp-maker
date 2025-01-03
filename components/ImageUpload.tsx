"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
}

export default function ImageUpload({ onUpload, isUploading }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"]
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
      {isDragActive ? (
        <p className="text-primary">Drop the image here...</p>
      ) : (
        <div className="space-y-2">
          <p className="text-muted-foreground">Drag & drop an image here, or click to select</p>
          <p className="text-sm text-muted-foreground/75">Supports JPEG and PNG</p>
        </div>
      )}
    </div>
  );
}