import React, { useRef, ChangeEvent, useEffect, useState } from "react";

interface FileUploaderProps {
  handleFilesUploader: (files: FileList) => void;
  fileType: string;
}

export const MultipleFileUploader: React.FC<FileUploaderProps> = ({
  handleFilesUploader,
  fileType = "all",
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded: any = event.target.files || [];
    handleFilesUploader(fileUploaded);
  };

  const getContentType = () => {
    let type = "";
    if (fileType == "image") {
      type = "image/*";
    } else if (fileType == "video") {
      type = "video/*";
    } else {
      return type;
    }
    return type;
  };

  return (
    <div className="py-2">
      <button
        className="p-2 w-full border rounded h-20 bg-[#129BFF] text-white"
        onClick={handleClick}
      >
        Upload multiple files
      </button>
      <input
        accept={getContentType()}
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
