import { useForm } from "react-hook-form";

export default function NewClientForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="mb-3">
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
      <div class="mb-3">
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
      <div class="mb-3">
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
  );
}
