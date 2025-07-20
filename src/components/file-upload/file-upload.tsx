"use client";

import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { UploadCloud, X } from "lucide-react";

interface FileUploadProps {
  maxSizeMB?: number;
  onFileSelect?: (files: File[]) => void;
  error?: string;
}

export default function MultiFileUpload({
  maxSizeMB = 5,
  onFileSelect,
  error,
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [internalError, setInternalError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalError("");
    const files = e.target.files;
    if (files) {
      const validFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const sizeInMB = file.size / (1024 * 1024);
        if (sizeInMB > maxSizeMB) {
          setInternalError(
            `File "${file.name}" exceeds ${maxSizeMB} MB limit.`
          );
        } else {
          validFiles.push(file);
        }
      }
      const newFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(newFiles);
      if (onFileSelect) {
        onFileSelect(newFiles);
      }
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (onFileSelect) {
      onFileSelect(updatedFiles);
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="fileUpload">Upload Files</Label>

      <div>
        <input
          id="fileUpload"
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={inputRef}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 ${
            error || internalError ? "border-red-500" : "border-gray-300"
          }`}
        >
          <UploadCloud className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">Choose files</span>
        </button>
      </div>

      {(internalError || error) && (
        <div className="text-red-600 text-sm">{internalError || error}</div>
      )}

      {selectedFiles.length > 0 && (
        <div className="space-y-1">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 rounded px-2 py-1 text-sm"
            >
              <span className="truncate">
                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}
                MB)
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-600 "
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
