import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProductDetails from "../pages/Home/ProductDetails";
import AllProducts from "../pages/Product/AllProducts";
import PrivateRoute from "../contexts/PrivateRoute";
import BookingForm from "../pages/Booking/BookingForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'all-products',
          Component: AllProducts,

        },
        {
            path:'product/:id',
            element:<PrivateRoute>
                      <ProductDetails></ProductDetails>
                    </PrivateRoute>
        },
        {
            path: "booking/:id",
            element:<PrivateRoute>
                      <BookingForm />
                    </PrivateRoute>
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