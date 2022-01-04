import styles from "../styles/Home.module.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

//firebase store
import { db } from "../firebase/clientApp";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { useState, useContext, useEffect } from "react";

//importing context
import { AuthContext } from "../context/AuthContext";
import AuthRoute from "../HOC/authRoute";

import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import AlbumRadio from "../components/AlbumRadio";
import EventSelection from "../components/EventSelection";

export default function Albums() {
  const [category, setCategory] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [categoryName, setCategoryName] = useState("All");

  const AuthCtx = useContext(AuthContext);
  const currentUser = AuthCtx.currentUser;

  const categories_ = ["All", "Wedding", "Sports", "Portrait", "Family"];

  const getPhotos = async () => {
    if (currentUser != null) {
      const q = query(
        collection(db, "photos"),
        where("photographer", "==", currentUser.email)
      );

      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setPhotos(arr);
      setCategory(arr);
    }
  };

  const changeCategory = (category) => {
    var newItems;
    if (category != "all") {
      newItems = photos.filter((photo) => {
        return photo.category == category;
      });
    } else {
      newItems = photos;
    }
    setCategoryName(category);
    setCategory(newItems);
  };

  //for modal
  const [selPhoto, setSelPhoto] = useState();
  const [isOpen, toggleOpen] = useState(false);
  const categories = ["Wedding", "Sports", "Portrait", "Family"];

  const onChangeValue = (event) => {
    console.log(event.target.value);

    let new_photos = [...photos];
    let index = new_photos.findIndex((x) => x.fileName == selPhoto.fileName);
    new_photos[index] = {
      ...new_photos[index],
      category: event.target.value.toLowerCase(),
    };
    setPhotos(new_photos);

    updateDoc(doc(db, `photos`, selPhoto.fileName), {
      category: event.target.value.toLowerCase(),
    }).then(() => {
      console.log("updated");
    });
  };

  const onPhotoClick = (photo) => {
    setSelPhoto(photo);
    toggleOpen(true);
  };

  const closeModal = () => {
    toggleOpen(false);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <AuthRoute>
      <div className={`container ${styles.container}`}>
        <section className="row section">
          <div className="col-md-12">
            <h2>Albums</h2>
            <p className="lead">Your images have been sorted by category</p>
          </div>
        </section>

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
                    <h6>Change image's category </h6>
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
            <div className="d-flex flex-column bd-highlight mb-3 flex-wrap">
              <ul className="nav nav-tabs nav-fill">
                {categories_.map((item, i) => (
                  <li
                    className="nav-item"
                    key={i}
                    onClick={() => changeCategory(item.toLowerCase())}
                  >
                    <a
                      className={`nav-link ${
                        categoryName == item.toLowerCase() && "active"
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
            >
              <Masonry>
                {category.map((photo, i) => (
                  <img
                    key={i}
                    src={photo.fileUrl}
                    alt="Picture of the author"
                    className="masonry-brick"
                    onClick={() => onPhotoClick(photo)}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </div>
    </AuthRoute>
  );
}

Modal.setAppElement("#__next");
