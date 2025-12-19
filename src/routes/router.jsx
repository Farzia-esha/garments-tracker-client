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
import MyProfile from "../pages/Dashboard/Manager/MyProfile";
import MyOrders from "../pages/Dashboard/Buyer/MyOrders";
import AboutUs from "../Components/Shared/AboutUs";
import ContactUs from "../Components/Shared/ContactUs";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Payment/PaymentCancelled";
import ManageTracking from "../pages/Dashboard/Admin/ManageTracking";
import TrackOrder from "../pages/Dashboard/Buyer/TrackOrder";
import TrackOrders from "../pages/Dashboard/Buyer/TrackOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout/>,
    children:[
        {
            index:true,
            element:<Home/>,
        },
        {
          path:'about',
          element:<AboutUs/>
        },
        {
          path:'contact',
          element:<ContactUs/>,
          loader:()=>fetch('/serviceCenters.json').then(res=>res.json())
        },
        {
          path:'all-products',
          element:<AllProducts/>

        },
        {
            path:'product/:id',
            element:<PrivateRoute> <ProductDetails></ProductDetails> </PrivateRoute>
        },
        {
            path: "booking/:id",
            element:<PrivateRoute> <BookingForm /> </PrivateRoute>
        },

        {
        path: "payment-success",
        element: <PrivateRoute> <PaymentSuccess />  </PrivateRoute>
      },

      {
        path: "payment-cancelled",
        element: <PrivateRoute> <PaymentCancelled /> </PrivateRoute>
      },

    ]
  },
  {
    path:'/',
    element: <AuthLayout/>,
    children:[
        {
            path:'login',
            element:<Login/>
        },
        {
            path:'register',
            element:<Register/>
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

      //admin
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
      {
        path:'manage-tracking',
        element:<ManageTracking />
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
      },
      {
        path:'profile',
        element:<MyProfile/>
      },

      //buyer
      {
        path:'my-orders',
        element: <MyOrders />
      },
      {
        path:'track-orders',
        element:<TrackOrders />
      },
      {
        path:'track-order/:orderId',
        element:<TrackOrder />

      }

    ]
  }
]);