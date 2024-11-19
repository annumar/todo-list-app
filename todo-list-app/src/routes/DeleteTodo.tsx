import { Form, Link, ActionFunctionArgs, redirect } from "react-router-dom";
import Modal from "../components/Modal";
import classes from './NewTodo.module.css'

function DeleteTodo() {
    return (
        <Modal>
            <Form method="delete" className={classes.form}>
                    <p>Are you sure you want to delete?</p>
                    <div className={classes.actions}>
                        <Link to=".." type='button'>Cancel</Link>
                        <button type="submit">OK</button>
                    </div>
            </Form>
        </Modal>
    )
}

export default DeleteTodo;

export async function deleteAction({ params }: ActionFunctionArgs) {
    const { id } = params;

    const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete the todo.');
    }

    return redirect('/');
}