import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ProgressBar from "./ProgressBar";

const containerStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10em",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

export default function UploadImage() {
  //setting local state
  const [files, setFiles] = useState([]);
  const [modal, setModal] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 25000000,
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
      setModal(true);
    },
  });

  const Modal = () => (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div style={containerStyle} {...getRootProps()}>
        <input {...getInputProps()} />
        {!modal && isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {files.length > 0 && <ProgressBar />}
      {modal && <Modal />}
    </>
  );
}
