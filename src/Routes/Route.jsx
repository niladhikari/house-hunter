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
import AdminRoute from "./AdminRoute";
import HouseRenter from './../Pages/Dashboard/HouseRenter/HouseRenter';

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
        element: <AdminRoute><OwnerHouse></OwnerHouse></AdminRoute>,
      },
      {
        path: "addHouse",
        element:<AdminRoute> <AddHouse></AddHouse></AdminRoute>,
      },
      {
        path: "manageHouse",
        element: <AdminRoute><ManageHouse></ManageHouse></AdminRoute>,
      },
      {
        path: "update/:id",
        element: <AdminRoute><UpdateHouse></UpdateHouse></AdminRoute>,
        loader: ({ params }) =>fetch(`http://localhost:5000/menu/${params.id}`),
      },
      {
        path: "houseRenter",
        element:<HouseRenter></HouseRenter>,
      },
    ],
  },
]);

export default router;
