import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Login from "./../Pages/Login/Login";
import SignUp from "./../Pages/SignUp/SignUp";
import App from "./../Layout/App";
import Dashboard from "../Layout/Dashboard";
import OwnerHouse from "./../Pages/Dashboard/OwnerHouse/OwnerHouse";
import AddHouse from "../Pages/Dashboard/AddHouse/AddHouse";
import ManageHouse from "../Pages/Dashboard/ManageHouse/ManageHouse";
import UpdateHouse from './../Pages/Dashboard/UpdateHouse/UpdateHouse';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "ownerHome",
        element: <OwnerHouse></OwnerHouse>,
      },
      {
        path: "addHouse",
        element: <AddHouse></AddHouse>,
      },
      {
        path: "manageHouse",
        element: <ManageHouse></ManageHouse>,
      },
      {
        path: "update/:id",
        element: <UpdateHouse></UpdateHouse>,
        loader: ({ params }) =>fetch(`http://localhost:5000/menu/${params.id}`),
      },
    ],
  },
]);

export default router;
