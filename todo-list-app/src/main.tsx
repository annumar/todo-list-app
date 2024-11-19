import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import RootLayout from './routes/RootLayout.tsx'
import TodoBase, { loader as todoLoader } from './routes/TodoBase.tsx'
import NewTodo, { action as newPostAction } from './routes/NewTodo.tsx'
import EditTodoForm, { editTodoAction, editTodoLoader } from './routes/EditTodoForm.tsx'
import DeleteTodo, { deleteAction } from './routes/DeleteTodo.tsx'
import ErrorPage from './components/ErrorPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />, 
    children: [
      {
        path: '/',
        element: <TodoBase />,
        loader: todoLoader,
        children: [
          {
            path: '/create-todo',
            element: <NewTodo />,
            action: newPostAction
          },
          {
            path: '/edit-todo/:id',
            element: <EditTodoForm />,
            loader: editTodoLoader,
            action: editTodoAction
          },
          {
            path: '/delete-todo/:id',
            element: <DeleteTodo />,
            action: deleteAction
          },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
