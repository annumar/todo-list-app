import { Link, LoaderFunctionArgs, useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { useForm } from "react-hook-form"
import classes from "../routes/NewTodo.module.css";
import Modal from "../components/Modal";

type Todo = {
    id: string;
    title: string;
    description: string;
};

function EditTodoForm() {
    const todo = useLoaderData() as Todo
    const navigate = useNavigate();
    const { revalidate } = useRevalidator();

    const {
        register,
        handleSubmit,
        formState: { isDirty, errors },
    } = useForm<Todo>({
        defaultValues: {
            title: todo.title,
            description: todo.description,
        },
    });

    const onSubmit = async (data: Todo) => {
        try {
            await editTodoAction({
                formData: data,
                params: { id: todo.id },
            });
            revalidate();
            navigate("/");
        } catch (error) {
            console.error("Failed to update the todo:", error);
        }
    };

    return (
        <Modal>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
            >
                <p>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                        <span className={classes.error}>
                            {errors.title.message}
                        </span>
                    )}
                </p>
                <p>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows={3}
                        {...register("description", {
                            required: "Description is required",
                        })}
                    />
                    {errors.description && (
                        <span className={classes.error}>
                            {errors.description.message}
                        </span>
                    )}
                </p>
                <p className={classes.actions}>
                    <Link to="..">
                        Cancel
                    </Link>
                    <button type="submit" disabled={!isDirty}>
                        Save
                    </button>
                </p>
            </form>
        </Modal>
    );
}

export default EditTodoForm;

export async function editTodoLoader({ params }: LoaderFunctionArgs) {
    const { id } = params;
    const response = await fetch(`http://localhost:8080/todos/${id}`);

    if (!response.ok) {
        throw new Error('Could not fetch the todo.');
    }

    const data: { todo: Todo } = await response.json();
    return data.todo;
}

export async function editTodoAction({
    params,
    formData,
}: {
    params?: { id?: string };
    formData?: FormData | Record<string, string>;
}) {
    const updatedTodo =
        formData instanceof FormData
            ? Object.fromEntries(formData)
            : formData;

    const todoId = params?.id || (updatedTodo as { id?: string })?.id;

    const response = await fetch(`http://localhost:8080/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to update the todo.");
    }

    const updatedData = await response.json();
    return updatedData;
}


