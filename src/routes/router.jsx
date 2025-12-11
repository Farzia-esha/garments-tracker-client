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
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminProducts from "../pages/Dashboard/Admin/AdminProducts";
import AllOrders from "../pages/Dashboard/Admin/AllOrders";
import ManageProducts from "../pages/Dashboard/manager/ManageProducts";
import AddProduct from "../pages/Dashboard/manager/AddProduct";
import PendingOrders from "../pages/Dashboard/manager/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/manager/ApprovedOrders";

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
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <div className="text-center py-20">
          <h2 className="text-3xl font-bold">Welcome to Dashboard</h2>
          <p className="text-gray-600 mt-4">Select a menu item to get started</p>
        </div>
      },
      {
        path: 'manage-users',
        element: <ManageUsers />
      },
      {
        path:'all-products',
        element:<AdminProducts></AdminProducts>
      },
      {
        path: 'all-orders',
        element: <AllOrders />
      },

      //manager
      {
        path: 'add-product',
        element: <AddProduct />
      },
      {
        path: 'manage-products',
        element: <ManageProducts />
      },
      {
        path: 'pending-orders',
        element: <PendingOrders />
      },
      {
        path:'approved-orders',
        element: <ApprovedOrders />
      }
    ]
  }
]);