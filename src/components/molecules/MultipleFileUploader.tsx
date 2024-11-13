import React, { useRef, ChangeEvent, useEffect, useState } from "react";

interface FileUploaderProps {
  handleFilesUploader: (files: FileList) => void;
}

export const MultipleFileUploader: React.FC<FileUploaderProps> = ({
  handleFilesUploader,
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded: any = event.target.files || [];
    handleFilesUploader(fileUploaded);
  };

  return (
    <div className="py-2">
      <button
        className="p-2 w-full border rounded h-20 bg-sky-400 text-white"
        onClick={handleClick}
      >
        Upload multiple files
      </button>
      <input
        title="upload"
        type="file"
        multiple
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />
    </div>
  );
};
