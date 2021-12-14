import EventSelection from "../../components/EventSelection";
import Link from "next/link";

import styles from "../../styles/Home.module.css";
import Modal from "react-modal";

//firebase store
import { db } from "../../firebase/clientApp";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  faDownload,
  faLongArrowAltLeft,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useContext, useEffect } from "react";

//importing context
import { AuthContext } from "../../context/AuthContext";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import AlbumRadio from "../../components/AlbumRadio";
import AuthRoute from "../../HOC/authRoute";

function Profile({ photos, clientInfo }) {
  const [selPhoto, setSelPhoto] = useState();
  const [isOpen, toggleOpen] = useState(false);
  const categories = ["Wedding", "Sports", "Portrait", "Family"];

  const onPhotoClick = (photo) => {
    setSelPhoto(photo);
    toggleOpen(true);
  };

  const closeModal = () => {
    toggleOpen(false);
  };

  const onChangeValue = (event) => {
    console.log(event.target.value);
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
              {selPhoto && isOpen && (
                <Modal
                  isOpen={isOpen}
                  onRequestClose={closeModal}
                  className="my-modal"
                >
                  <div className="row " style={{ height: "25em" }}>
                    <div className="col-md-6 d-flex align-content-center">
                      <div className="d-flex">
                        <img
                          src={selPhoto.fileUrl}
                          style={{
                            justifyContent: "center",
                            width: "100%",
                            maxHeight: "40em",
                          }}
                          className="align-self-center"
                        />
                      </div>
                    </div>
                    <div className="col-md-6" style={{ padding: "2em" }}>
                      <div className="d-flex flex-column justify-content-between"></div>
                      <p>
                        Shot taken by <b>{selPhoto.photographer}</b>
                      </p>
                      <h6>Select a category </h6>
                      <div onChange={onChangeValue}>
                        {categories.map((item, i) => (
                          <AlbumRadio
                            key={i}
                            album={item}
                            index={i}
                            selCategory={selPhoto.category}
                          />
                        ))}
                      </div>

                      <div className="d-flex  justify-content-end">
                        <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}

              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
              >
                <Masonry>
                  {photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo.fileUrl}
                      alt={photo.fileName}
                      className="masonry-brick"
                      onClick={() => onPhotoClick(photo)}
                    />
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
Modal.setAppElement("#__next");

export default Profile;
