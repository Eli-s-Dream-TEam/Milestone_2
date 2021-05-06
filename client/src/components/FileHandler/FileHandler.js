// Imports
import { useRef, useState } from "react";

// Utils & API
import { addModel, testModel } from "../../api/api";
import parse from "../../utils/csvParser";

// UI
import "./FileHandler.css";
import { FileDrop } from "react-file-drop";
import { Facebook } from "react-spinners-css";

// Consts
const TYPES = ["hybrid", "regression"];

export default function FileHandler({ updateModels, model, alert }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(TYPES[0]);
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
    const regexPattern = new RegExp(/.+\.csv$/);

    // No file
    if (!file) {
      setFile(null);
      return;
    }

    // Not a csv type
    if (!file?.name.match(regexPattern)) {
      setFile(null);
      return;
    }

    setFile(files[0]);
  };

  const handleTrainModel = async () => {
    setLoading(true);
    parse(file)
      .then(async (fileData) => {
        const data = { train_data: fileData };
        await addModel(data, type);
        updateModels();
        alert("success", "Model added succesfully");
      })
      .catch((error) => {
        alert("error", "Can not add a model right now");
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const handleTestModel = async () => {
    // Make sure a model is selected
    if (!model || Object.keys(model).length === 0) {
      alert("error", "Please select an existing model first");
      return;
    }

    setLoading(true);
    parse(file)
      .then(async (fileData) => {
        const data = { predict_data: fileData };
        const response = await testModel(data, model.model_id);
        console.log(response);
        alert("success", "Anomalies detected succesfully");
      })
      .catch((error) => {
        console.error(error);
        alert("error", "Can not detect anomalies for that model right now");
      })
      .finally(() => setLoading(false));
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
        {file && <hr style={{ width: "100%" }} />}
        <div style={{ width: "100%" }}>
          {file && (
            <div className="showcase-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="showcase-close-icon"
                onClick={() => setFile(null)}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="showcase-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="showcase-name">{file.name}</p>
              </div>
            </div>
          )}
          {loading && <Facebook color="#4188ff" />}
          {file && !loading && (
            <div>
              <div className="select-container">
                <label htmlFor="type">Model Type:</label>
                <select
                  type="select"
                  name="type"
                  onChange={(e) => setType(e.target.value)}
                >
                  {TYPES.map((type) => (
                    <option key={`option-type-${type}`}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="btn-container">
                <button className="btn btn-primary" onClick={handleTrainModel}>
                  Train
                </button>
                <button className="btn btn-secondary" onClick={handleTestModel}>
                  Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
