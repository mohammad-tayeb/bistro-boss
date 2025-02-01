import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Shop from "../Pages/Shop/Shop/Shop";
import Login from "../Pages/Login/Login";
import SignIn from "../Pages/SignIn/SignIn";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUser from "../Pages/Dashboard/Cart/AllUser/AllUser";
import AddItem from "../Pages/Dashboard/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItem from "../Pages/Dashboard/ManageItem";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/menu",
        element: <Menu></Menu>
      },
      {
        path: "/shop",
        element: <PrivateRoute><Shop></Shop></PrivateRoute>
      },
      {
        path: "/shop/:category",
        element: <Shop></Shop>
      }
    ],
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/signin",
    element: <SignIn></SignIn>
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      //user route
      {
        path: "cart",
        element: <Cart></Cart>
      },
      //admin routes
      {
        path: "allUser",
        element: <AdminRoute><AllUser></AllUser></AdminRoute>
      },
      {
        path: "addItem",
        element: <AdminRoute><AddItem></AddItem></AdminRoute>
      },
      {
        path: "manageItem",
        element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
      }
    ]
  }
]);