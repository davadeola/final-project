import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import UploadImage from "./UploadImage";
import Modal from "react-modal";

//firebase store
import { db, storage } from "../firebase/clientApp";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//importing context
import { AuthContext } from "../context/AuthContext";
import { verifyClientFace } from "../util/faceApi";

export default function NewClientForm() {
  //setting local state
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, toggleOpen] = useState(false);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const { register, handleSubmit } = useForm();

  const AuthCtx = useContext(AuthContext);
  const currentUser = AuthCtx.currentUser;

  const changeImageField = (index, parameter, value) => {
    const newArray = [...files];
    newArray[index][parameter] = value;
    setFiles(newArray);
  };

  const submitProfileImage = (emailAddress) => {
    let image = files[0];
    let index = 0;

    if (
      image.status === "FINISH" ||
      image.status === "UPLOADING" ||
      upload == false
    )
      return;
    changeImageField(index, "status", "UPLOADING");

    const storageRef = ref(storage, image.fileName);
    const uploadTask = uploadBytesResumable(storageRef, image.file);

    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        console.log("Error Image Upload:", err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          changeImageField(index, "downloadURL", downloadURL);
          changeImageField(index, "status", "FINISH");
          updateDoc(doc(db, `clients`, emailAddress), {
            profilePhoto: downloadURL,
          }).then(() => {
            toggleOpen(true);
            setMessage("Added Your New Client");
            setUpload(false);
          });
        });
      }
    );
  };

  const onSubmit = async (data) => {
    if (files.length > 0) {
      let verified = await verifyClientFace(files[0].preview);
      if (verified == true) {
        console.log({ ...data, photographer: currentUser.email });

        setDoc(doc(db, "clients", data.emailAddress), {
          ...data,
          photographer: currentUser.email,
        });

        submitProfileImage(data.emailAddress);
      } else {
        toggleOpen(true);
        setMessage("Choose a different picture. No face detected");
        console.log("Choose a different picture. No face detected");
      }
    } else {
      toggleOpen(true);
      setMessage("Please select a picture");
      console.log("Select a picture");
    }
  };

  const closeModal = () => {
    toggleOpen(false);
  };

  return (
    <div style={{ padding: "0 10em 10em" }}>
      <Modal isOpen={isOpen} className="my-modal" onRequestClose={closeModal}>
        <h2
          className="text-center"
          style={{ position: "relative", marginTop: "15%" }}
        >
          {message}
        </h2>
      </Modal>
      <div className="col-md-12">
        <div className="text-center">
          {files.length > 0 ? (
            <img
              src={files[0].preview}
              style={{ width: "20em", height: "20em", objectFit: "cover" }}
            />
          ) : (
            <UploadImage
              setUpload={setUpload}
              files={files}
              multiple={false}
              setFiles={setFiles}
            />
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="new_name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="new_name"
              placeholder="John Doe"
              {...register("name")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="new_email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="new_email"
              placeholder="name@example.com"
              {...register("emailAddress")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="new_description" className="form-label">
              Client Description
            </label>
            <textarea
              className="form-control"
              id="description"
              {...register("description")}
              rows="3"
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit">
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
}

Modal.setAppElement("#__next");
