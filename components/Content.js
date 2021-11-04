import UploadImage from "./UploadImage";

export const Content = () => {
  return (
    <div className="container">
      <section className="row section">
        <h1>Organize your Amazing moments </h1>
        <p className="lead">
          Click on the ‘Upload’ button to sort your images using A.I
        </p>
      </section>

      <section className="row section">
        <div className="col-md-6">
          <h3>Recent Clients</h3>
        </div>
        <div className="col-md-6">
          <h3>Portfolio</h3>
        </div>
      </section>
    </div>
  );
};
