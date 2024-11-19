import { Link, Form, ActionFunctionArgs, redirect} from 'react-router-dom';
import classes from './NewTodo.module.css';
import Modal from '../components/Modal';

type NewTodoData = {
    title: string;
    description: string;
  };

function NewTodo() {
    return (
        <Modal>
            <Form method='post' className={classes.form}>
                <p>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name='title' required />
                </p>
                <p>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name='description' required rows={3} />
                </p>
                <p className={classes.actions}>
                    <Link to=".." type='button'>Cancel</Link>
                    <button >Submit</button>
                </p>
            </Form>
        </Modal>
    );
}

export default NewTodo;

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const postData = Object.fromEntries(formData) as NewTodoData;

    await fetch('http://localhost:8080/todos', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return redirect('/')
}