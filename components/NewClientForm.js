export default function NewClientForm() {
  return (
    <>
      <div class="mb-3">
        <label htmlFor="new_name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="new_name"
          placeholder="John Doe"
        />
      </div>
      <div class="mb-3">
        <label htmlFor="new_email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="new_email"
          placeholder="name@example.com"
        />
      </div>
      <div class="mb-3">
        <label htmlFor="new_description" className="form-label">
          Client Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
    </>
  );
}
