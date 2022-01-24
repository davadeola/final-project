import Link from "next/link";

import styles from "../../styles/Home.module.css";

//firebase store
import { db } from "../../firebase/clientApp";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import {
  faDownload,
  faLongArrowAltLeft,
  faShare,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useContext, useEffect } from "react";

//importing context
import { AuthContext } from "../../context/AuthContext";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import AuthRoute from "../../HOC/authRoute";

function Profile({ photos, clientInfo }) {
  const onDeletePhoto = (fileName) => {
    updateDoc(doc(db, `photos`, fileName), {
      clients: arrayRemove(clientInfo.emailAddress),
    }).then(() => {
      console.log("updated");
    });
  };

  return (
    <AuthRoute>
      <div className={`container ${styles.container}`}>
        <div className="container" style={{ width: "100vw" }}>
          <div className="row" style={{ marginBottom: "3.75rem" }}>
            <div className="col-md-2">
              <div className="d-flex align-self-center">
                <Link href="/clients">
                  <a>
                    <FontAwesomeIcon
                      icon={faLongArrowAltLeft}
                    ></FontAwesomeIcon>
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-8">
              <div className="d-flex  justify-content-center">
                <img
                  src={clientInfo.profilePhoto}
                  className="img"
                  style={{
                    width: "7.5rem",
                    height: "7.5rem",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginRight: "1.5em",
                  }}
                />
                <div className="d-flex flex-column align-self-center">
                  <h4>{clientInfo.name}</h4>
                  <h6>{clientInfo.emailAddress}</h6>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="d-flex align-self-center justify-content-evenly">
                <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
              >
                <Masonry>
                  {photos.map((photo, i) => (
                    <div key={i} className="masonry-brick">
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        style={{ position: "absolute", right: 0, top: 0 }}
                        onClick={() => {
                          onDeletePhoto(photo.fileName);
                        }}
                      />
                      <img src={photo.fileUrl} alt={photo.fileName} />
                    </div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          </div>
        </div>
      </div>
    </AuthRoute>
  );
}

export const getServerSideProps = async ({ params }) => {
  const clientInfo = {};
  // const AuthCtx = useContext(AuthContext);
  // const currentUser = AuthCtx.currentUser;

  let arr = [];

  // if (currentUser != null) {
  const q = query(
    collection(db, "photos"),
    // where("photographer", "==", currentUser.email),
    where("clients", "array-contains", params.id)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });

  const q_client = query(
    collection(db, "clients"),
    where("emailAddress", "==", params.id)
  );
  const querySnapshotClient = await getDocs(q_client);

  querySnapshotClient.forEach((doc) => {
    clientInfo["name"] = doc.data().name;
    clientInfo["emailAddress"] = doc.data().emailAddress;
    clientInfo["profilePhoto"] = doc.data().profilePhoto;
  });

  //}

  return {
    props: {
      photos: arr,
      clientInfo,
    },
  };
};

export default Profile;
