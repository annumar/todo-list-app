import { Form, Link, LoaderFunctionArgs, ActionFunctionArgs, useLoaderData, redirect } from "react-router-dom";
import classes from "../routes/NewTodo.module.css";
import Modal from "../components/Modal";

type Todo = {
    id: string;
    title: string;
    description: string;
};

function EditTodoForm() {
    const todo = useLoaderData() as Todo
    return (
        <Modal>
            <Form method="put" className={classes.form}>
                <p>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={todo?.title || ""}
                        required
                    />
                </p>
                <p>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={todo?.description || ""}
                        required
                        rows={3}
                    />
                </p>
                <p className={classes.actions}>
                    <Link to=".." type='button'>Cancel</Link>
                    <button type="submit">Save</button>
                </p>
            </Form>
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

export async function editTodoAction({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const updatedTodo = Object.fromEntries(formData);

    const { id } = params

    await fetch(`http://localhost:8080/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return redirect("/");
}

