import UploadImage from "./UploadImage";
import ProgressBar from "./ProgressBar";
import { useState, useEffect, useContext } from "react";

import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/clientApp";

import { AuthContext } from "../context/AuthContext";

export const Content = () => {
  const AuthCtx = useContext(AuthContext);

  //setting local state
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  //for ...
  const changeImageField = (index, parameter, value) => {
    const newArray = [...files];
    newArray[index][parameter] = value;
    setFiles(newArray);
  };

  useEffect(() => {
    files.forEach((image, index) => {
      if (image.status === "FINISH" || image.status === "UPLOADING") return;
      changeImageField(index, "status", "UPLOADING");

      const storageRef = ref(storage, image.fileName);
      const uploadTask = uploadBytesResumable(storageRef, image.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          changeImageField(index, "progress", prog);
        },
        (err) => {
          console.log("Error Image Upload:", err);
        },
        () => {
          setDoc(doc(db, `photos`, image.fileName), {
            photographer: AuthCtx.currentUser.email,
            fileName: image.fileName,
            client: "",
          });

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            changeImageField(index, "downloadURL", downloadURL);
            changeImageField(index, "status", "FINISH");
          });
        }
      );
    });
  });

  return (
    <div className="container">
      <section className="row section">
        <h1>Organize your Amazing moments </h1>
        <p className="lead">
          Click on the ‘Upload’ button to sort your images using A.I
        </p>
        <UploadImage setFiles={setFiles} files={files} multiple={true} />
        {files.length > 0 && (
          <div style={{ paddingTop: "3.5em" }}>
            {files.map((file) => (
              <div key={file.fileName} className="d-flex flex-column mb-3">
                <p>{file.fileName}</p>
                <ProgressBar progress={file.progress} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="row section">
        <div className="col-md-6">
          <h3>Recent Clients</h3>
        </div>
        <div className="col-md-6">
          <h3>Portfolio</h3>
        </div>
      </section>
    </div>
  );
};
