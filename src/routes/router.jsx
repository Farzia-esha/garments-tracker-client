import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
        {
            path:'login',
            Component:Login,
        },
        {
            path:'register',
            Component: Register,

        }
    ]
  }
]);