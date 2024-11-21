import { Link, redirect, useNavigate, useRevalidator } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classes from './NewTodo.module.css';
import Modal from '../components/Modal';

type NewTodoData = {
  title: string;
  description: string;
};

function NewTodo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewTodoData>({
    defaultValues: { title: "", description: "" },
  });
  const navigate = useNavigate();
  const { revalidate } = useRevalidator()

  const title = watch("title");
  const description = watch("description");

  const isSubmitDisabled = !title || !description;

  const onSubmit = async (data: NewTodoData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      const request = new Request("/todos", {
        method: "POST",
        body: formData,
      });

      await action({ request });
      revalidate()

      navigate("/");
    } catch (error) {
      console.error("Failed to add the todo:", error);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className={classes.error}>{errors.title.message}</span>
          )}
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            rows={3}
          />
          {errors.description && (
            <span className={classes.error}>{errors.description.message}</span>
          )}
        </p>
        <p className={classes.actions}>
          <Link to="..">Cancel</Link>
          <button type="submit" disabled={isSubmitDisabled}>
            Submit
          </button>
        </p>
      </form>
    </Modal>
  );
}

export default NewTodo;

export async function action({ request }: any) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData) as NewTodoData;

  const response = await fetch("http://localhost:8080/todos", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create the todo.");
  }

  return redirect("/");
}