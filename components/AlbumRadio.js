import React from "react";

function AlbumRadio({ index, album, selCategory }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="albumRadio"
        id={`albumRadio${index}`}
        value={album}
        defaultChecked={selCategory.toLowerCase() === album.toLowerCase()}
      />
      <label className="form-check-label" htmlFor="albumRadio2">
        {album}
      </label>
    </div>
  );
}

export default AlbumRadio;
