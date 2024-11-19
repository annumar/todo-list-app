import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import classes from './TodoList.module.css'

interface Todo {
    id: string,
    title: string,
    description: string,
    status: 'complete' | 'incomplete'
}

function TodoList() {
    const todos = useLoaderData() as Todo[]
    const navigate = useNavigate()

    const toggleCompletion = async (todo: Todo): Promise<void> => {
        const newStatus = todo.status === 'complete' ? 'incomplete' : 'complete';

        await fetch(`http://localhost:8080/todos/${todo.id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: newStatus }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        navigate('/')
    };

    return (
        <div>
            {todos.length > 0 &&
                <ul className={classes.todo}>
                    {todos.map((todo) => (
                        <li className={classes.todoList} key={todo.id} >
                            <div onClick={() => toggleCompletion(todo)}>
                                <p className={todo.status === 'complete' ? classes.completed : classes.title}>
                                    {todo.title}
                                </p>
                                <p className={todo.status === 'complete' ? classes.completedDesc : classes.text}>
                                    {todo.description}
                                </p>
                            </div>
                            <div>
                                <Link to={`/edit-todo/${todo.id}`} className={classes.editIcon}><MdEdit size={18} /></Link>
                                <Link to={`/delete-todo/${todo.id}`} className={classes.deleteIcon}><MdDelete size={18} /></Link>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default TodoList   