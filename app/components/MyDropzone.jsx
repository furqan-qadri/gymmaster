import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`w-full h-32 flex items-center justify-center border-2 border-dashed rounded-lg transition-colors duration-300 ${
        isDragActive
          ? "bg-green-100 border-green-400"
          : "bg-yellow-50 border-gray-300"
      }`}
    >
      <input {...getInputProps()} className="hidden" />
      {isDragActive ? (
        <p className="text-lg font-semibold text-green-700">
          Drop the files here ...
        </p>
      ) : (
        <p className="text-lg font-semibold text-gray-600">
          Drag and drop some files here, or click to select files
        </p>
      )}
    </div>
  );
}
