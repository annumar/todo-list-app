import { Outlet } from 'react-router-dom';
import TodoList from "../components/TodoList";

function TodoBase() {
    return (
        <>
            <Outlet />
            <main>
                <TodoList />
            </main>
        </>
    )
}

export default TodoBase;

export async function loader() {
    const response = await fetch('http://localhost:8080/todos')
    const resData = await response.json()
    return resData.todos
}