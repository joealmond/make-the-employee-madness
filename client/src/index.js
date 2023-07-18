import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Layout from './Pages/Layout';
import EmployeeList from './Pages/EmployeeList';
import EmployeeCreator from './Pages/EmployeeCreator';
import EmployeeUpdater from './Pages/EmployeeUpdater';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <EmployeeList />
      },
      {

        path: "/create",
        element: <EmployeeCreator />
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
