import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import UploadImage from "./UploadImage";

//firebase store
import { db, storage } from "../firebase/clientApp";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//importing context
import { AuthContext } from "../context/AuthContext";

export default function NewClientForm() {
  //setting local state
  const [files, setFiles] = useState([]);
  const { register, handleSubmit } = useForm();
  const [uploadComplete, setUploadComplete] = useState(false);

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

    if (image.status === "FINISH" || image.status === "UPLOADING") return;
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
        updateDoc(doc(db, `clients`, emailAddress), {
          profilePhoto: image.fileName,
        });

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          changeImageField(index, "downloadURL", downloadURL);
          changeImageField(index, "status", "FINISH");
          setUploadComplete(true);
        });
      }
    );
  };

  const onSubmit = (data) => {
    console.log({ ...data, photographer: currentUser.email });

    setDoc(doc(db, "clients", data.emailAddress), {
      ...data,
      photographer: currentUser.email,
    });

    submitProfileImage(data.emailAddress);
  };

  return (
    <>
      <div class="col-md-4">
        {uploadComplete ? (
          <img src={files[0].downloadURL} style={{ width: "100%" }} />
        ) : (
          <UploadImage files={files} multiple={false} setFiles={setFiles} />
        )}
      </div>
      <div class="col-md-8">
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
    </>
  );
}
