import UploadImage from "./UploadImage";
import ProgressBar from "./ProgressBar";
import { useState, useEffect, useContext } from "react";

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/clientApp";

import { AuthContext } from "../context/AuthContext";
import axios from "axios";

//tensorflow
import * as tf from "@tensorflow/tfjs";

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

  const baseURL =
    "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/68a42beb-9682-4929-9edb-6b7a9c690db9/classify/iterations/Iteration3/url";

  const headers = {
    "Prediction-Key": "356c46ca41ab44a69579e74ae6ebfbea",
    "Content-Type": "application/json",
  };

  const handleCategory = (imageUrl) => {
    let prediction;
    let data = { Url: imageUrl };

    return axios.post(baseURL, data, { headers: headers }).then((res) => {
      prediction = res.data.predictions[0].tagName;
      return prediction;
    });
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            changeImageField(index, "downloadURL", downloadURL);
            changeImageField(index, "status", "FINISH");
            handleCategory(downloadURL).then((res) => {
              setDoc(doc(db, `photos`, image.fileName), {
                photographer: AuthCtx.currentUser.email,
                fileName: image.fileName,
                client: "",
                category: res,
              });
            });
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
            {files.map((file, i) => (
              <div key={i} className="d-flex flex-column mb-3">
                <p>{file.fileName}</p>
                <ProgressBar progress={file.progress} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
