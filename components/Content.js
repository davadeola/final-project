import UploadImage from "./UploadImage";
import ProgressBar from "./ProgressBar";
import { useState, useEffect, useContext } from "react";

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/clientApp";

import { AuthContext } from "../context/AuthContext";

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

  const handleCategory = async (src) => {
    const model = await tf.loadGraphModel("/tfjs/model.json");
    var img = new Image();
    img.width = 200;
    img.height = 200;
    img.src = src;

    const example = tf.browser.fromPixels(img);
    const newImage = tf.cast(
      tf.image.resizeBilinear(example, [200, 200]),
      "float32"
    );
    const norm = tf.fill([200, 200, 3], 255);
    const normalisedImage = tf.div(newImage, norm);
    const predictme = tf.cast(tf.expandDims(normalisedImage), "float32");
    const prediction = model.predict(predictme);
    const classificationData = await prediction.data();
    const classificationName = classificationData[0];
    console.log(classificationData);
    console.log(classificationName - 0.5 * 2 * 100);
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
            handleCategory(downloadURL);
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
