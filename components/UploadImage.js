import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { ref } from "firebase/storage";
import { storage } from "../firebase/clientApp";

const containerStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "5em",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#000",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#000",
  outline: "none",
  transition: "border .24s ease-in-out",
};

export default function UploadImage({ setFiles, files, multiple, setUpload }) {
  const [modal, setModal] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 25000000,
    accept: "image/*",
    multiple: multiple,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const newImages = Array.from(acceptedFiles).map((file) => {
          return {
            file: file,
            fileName: file.name,
            status: "CREATED",
            storageRef: ref(storage, file.name),
            downloadURL: "",
            description: "",
            preview: URL.createObjectURL(file),
          };
        });

        //setFiles((prevState) => [...prevState, ...newImages]);
        //setModal(true);
        setFiles(newImages);
        setUpload(true);
      }
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
      (
      <div style={containerStyle} {...getRootProps()}>
        <input {...getInputProps()} />
        {files.length <= 0 && isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      )
    </>
  );
}
