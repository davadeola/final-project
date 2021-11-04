export default function UploadImage() {
  return (
    <>
      <input
        ref="fileInput"
        type="file"
        style={{ display: "none" }}
        // multiple={false}
      />
      <button>Upload File</button>
    </>
  );
}
