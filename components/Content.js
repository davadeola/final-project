import UploadImage from "./UploadImage";
import ProgressBar from "./ProgressBar";
import { useState, useEffect, useContext } from "react";

import {
  doc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/clientApp";

import { AuthContext } from "../context/AuthContext";
import axios from "axios";

//tensorflow
// import * as tf from "@tensorflow/tfjs";
import { findMatchedFaces, findNewFaces } from "../util/faceApi";

export const Content = () => {
  const AuthCtx = useContext(AuthContext);
  const currentUser = AuthCtx.currentUser;

  //setting local state
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    if (currentUser != null) {
      const q = query(
        collection(db, "clients"),
        where("photographer", "==", currentUser.email)
      );

      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setClients(arr);
    }
  };

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
    let prediction = "";
    let data = { Url: imageUrl };

    return axios.post(baseURL, data, { headers: headers }).then((res) => {
      if (res.data.predictions[0].probability > 0.65) {
        prediction = res.data.predictions[0].tagName;
      }

      return prediction;
    });
  };

  // const handleCategory = async (src) => {
  //   let imgWidth = 224;
  //   let imgHeight = 224;

  //   // The model is present in public folder, so that it could be downloaded over http/https
  //   const model = await tf.loadLayersModel("/tfjs/model.json");
  //   var img = new Image();

  //   img.src = src;
  //   img.width = 224;
  //   img.height = 224;

  // const example = tf.browser.fromPixels(img);
  // const newImage = tf.cast(
  //   tf.image.resizeBilinear(example, [224, 224]),
  //   "float32"
  // );
  // const norm = tf.fill([224, 224, 1], 255);
  // const normalisedImage = tf.div(newImage, norm);
  // const predictme = tf.cast(tf.expandDims(normalisedImage), "float32");

  //   var tensorImg = tf.browser
  //     .fromPixels(img)
  //     .resizeNearestNeighbor([imgWidth, imgHeight])

  //     .toFloat()
  //     .expandDims();

  //   const prediction = model.predict(tensorImg);
  //   const classificationData = await prediction.dataSync()[0];
  //   prediction.dispose();

  //   console.log(tensorImg);
  // };

  useEffect(() => {
    files.forEach((image, index) => {
      if (
        image.status === "FINISH" ||
        image.status === "UPLOADING" ||
        upload == false
      )
        return;
      changeImageField(index, "status", "UPLOADING");

      const storageRef = ref(storage, image.fileName);
      const uploadTask = uploadBytesResumable(storageRef, image.file);

      console.log("Upload Starting");

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
            console.log("Adding to Db");
            changeImageField(index, "downloadURL", downloadURL);
            changeImageField(index, "status", "FINISH");

            handleCategory(downloadURL).then((res) => {
              setDoc(doc(db, `photos`, image.fileName), {
                photographer: AuthCtx.currentUser.email,
                fileName: image.fileName,
                client: "",
                category: res,
                fileUrl: downloadURL,
              }).then(() => {
                console.log("Added to Db");
                console.log("Assigning to client");
                let client = findMatchedFaces(clients, downloadURL);
                console.log(client);
              });
            });
          });
        }
      );
    });

    return () => setUpload(false);
  }, [upload]);

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="container">
      <section className="row section">
        <h1>Organize your Amazing moments </h1>
        <p className="lead">
          Click on the ‘Upload’ button to sort your images using A.I
        </p>
        <UploadImage
          setFiles={setFiles}
          files={files}
          multiple={true}
          setUpload={setUpload}
        />
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
