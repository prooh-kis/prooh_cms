import React, { useState, useRef } from "react";

interface FileUploadProps {
  accept?: string; // e.g. "image/*,.pdf"
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  onFilesChange: (files: File[]) => void;
  label?: string;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = "*",
  multiple = false,
  maxFiles = 5,
  maxSize = 10,
  onFilesChange,

  label = "Choose A File Or Drag And Drop It Here",
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (newFiles: File[]) => {
    // Filter by accepted file types
    const filteredFiles = newFiles.filter((file) => {
      if (accept === "*") return true;
      const acceptedTypes = accept.split(",");
      return acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          // File extension check
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        // MIME type check
        return file.type.match(type.replace("*", ".*"));
      });
    });

    // // Check file size
    // const sizeValidFiles = filteredFiles.filter(
    //   (file) => file.size <= maxSize * 1024 * 1024
    // );

    // // Check max files
    // const finalFiles = multiple
    //   ? [...sizeValidFiles].slice(0, maxFiles)
    //   : sizeValidFiles.slice(0, 1);

    onFilesChange(filteredFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={!disabled ? triggerFileInput : undefined}
        onDragOver={!disabled ? handleDragOver : undefined}
        onDragLeave={!disabled ? handleDragLeave : undefined}
        onDrop={!disabled ? handleDrop : undefined}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <i className="fi fi-rr-cloud-upload-alt text-[#129BFF] text-[28px] w-[1.2em] h-[1.2em]"></i>
          <p className="text-gray-600">
            <span className="text-[#129BFF] font-semibold">Choose A File </span>
            Or Drag And Drop It Here
          </p>
          <p className="text-sm text-gray-500">
            {accept !== "*"
              ? `Accepted formats: ${accept}`
              : "All file types accepted"}
          </p>
          {/* <p className="text-sm text-gray-500">
            Max size: {maxSize}MB {multiple ? `| Max files: ${maxFiles}` : ""}
          </p> */}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
