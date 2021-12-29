import styles from "../styles/Home.module.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

//firebase store
import { db } from "../firebase/clientApp";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useState, useContext, useEffect } from "react";

//importing context
import { AuthContext } from "../context/AuthContext";
import AuthRoute from "../HOC/authRoute";

export default function Albums() {
  const [category, setCategory] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [categoryName, setCategoryName] = useState("All");

  const AuthCtx = useContext(AuthContext);
  const currentUser = AuthCtx.currentUser;

  const categories = ["All", "Wedding", "Sports", "Portrait", "Family"];

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
            <div className="d-flex flex-column bd-highlight mb-3 flex-wrap">
              <ul className="nav nav-tabs nav-fill">
                {categories.map((item, i) => (
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
