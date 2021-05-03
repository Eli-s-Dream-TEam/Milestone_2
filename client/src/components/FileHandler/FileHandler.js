import "./FileHandler.css";
import { FileDrop } from "react-file-drop";
import { useRef, useState } from "react";

export default function FileHandler(props) {
  const [file, setFile] = useState(null);
  const uploaderRef = useRef(null);

  const removeActiveAndHover = () => {
    uploaderRef.current.classList.remove("active", "dragOver");
  };

  const onFrameEnter = () => {
    uploaderRef.current.classList.add("active");
  };

  const onDragOver = () => {
    removeActiveAndHover();
    uploaderRef.current.classList.add("dragOver");
  };

  const onDragLeave = () => {
    uploaderRef.current.classList.remove("dragOver");
  };

  const handleFileUpload = (files) => {
    removeActiveAndHover();
    const file = files[0];

    // No file
    if (!file) {
      return;
    }

    if (file.name) setFile(files[0]);
  };

  return (
    <>
      <div className="container">
        <FileDrop
          className="fileDrop"
          onFrameDragEnter={onFrameEnter}
          onFrameDragLeave={removeActiveAndHover}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={(files, event) => handleFileUpload(files)}
        >
          <label className="uploader" ref={uploaderRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="uploadIcon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Drop Train/Test File Here
          </label>
        </FileDrop>
        <div>
          {file && (
            <button className="btn btn-primary">
              Train a model with this file
            </button>
          )}
          {file && <div className="showcase">File Showcase</div>}
        </div>
      </div>
    </>
  );
}
