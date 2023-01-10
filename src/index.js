import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterComponent from "./component/register";
import LoginComponent from "./component/login";
//import HomeComponent from "./component/home/index";
import DetailProductComponent from './component/detailProduct/index';
import UserComponent from './component/users/index';
import UserComponentEdit from './component/users/edit';

const router = createBrowserRouter([
  {
    path : "/",
    element :<UserComponent />
  },
  {
    path : "/user/edit/:id",
    element :<UserComponentEdit />
  },
  {
    path : "/login",
    element: <LoginComponent/>
  },
  {
    path : "/register",
    element: <RegisterComponent/>
  },
  {
    path: "/product/:id",
    element: <DetailProductComponent />,
  }
  ,{
    path : "/user/:id",
    element: <UserComponent/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);