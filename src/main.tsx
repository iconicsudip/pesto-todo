import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Auth from './pages/Auth'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import App from './App'
import TodoList from './pages/TodoList'



const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Auth />,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <TodoList/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
          <RouterProvider router={router} />
    </App>
  </React.StrictMode>,
)