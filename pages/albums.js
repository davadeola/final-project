import styles from "../styles/Home.module.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CategoryCard from "../components/CategoryCard";

//firebase store
import { db } from "../firebase/clientApp";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useState, useContext, useEffect } from "react";

//importing context
import { AuthContext } from "../context/AuthContext";

export default function Albums() {
  const [category, setCategory] = useState([]);
  const [photos, setPhotos] = useState([]);

  const AuthCtx = useContext(AuthContext);
  const currentUser = AuthCtx.currentUser;

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
    if (category) {
      newItems = photos.filter((photo) => {
        return photo.category == category;
      });
    } else {
      newItems = photos;
    }

    setCategory(newItems);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className={`container ${styles.container}`}>
      <section className="row section">
        <div className="col-md-12">
          <h2>Albums</h2>
          <p className="lead">Select an Event to view.</p>
        </div>
      </section>

      <div className="row">
        <div className="col-md-3">
          <div className="d-flex flex-column bd-highlight mb-3 flex-wrap">
            <div className="p-2 bd-highlight" onClick={() => changeCategory()}>
              <CategoryCard name="All" />
            </div>
            <div
              className="p-2 bd-highlight"
              onClick={() => changeCategory("sports")}
            >
              <CategoryCard name="Sports" />
            </div>
            <div
              className="p-2 bd-highlight"
              onClick={() => changeCategory("portrait")}
            >
              <CategoryCard name="Portrait" />
            </div>
            <div
              className="p-2 bd-highlight"
              onClick={() => changeCategory("wedding")}
            >
              <CategoryCard name="Wedding" />
            </div>
            <div
              className="p-2 bd-highlight"
              onClick={() => changeCategory("family")}
            >
              <CategoryCard name="Family" link="family" />
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
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
  );
}
