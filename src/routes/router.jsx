import { createBrowserRouter } from "react-router";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllTuitions from "../pages/AllTuitions/AllTuitions";
import AllTutors from "../pages/AllTutors/AllTutors";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import TuitionDetails from "../pages/TuitionDetails/TuitionDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/Dashboard/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";



export const router = createBrowserRouter([
  {
    path:"/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'all-tuitions',
        Component: AllTuitions
      },
      {
        path: 'tuition-details/:id',
        Component: TuitionDetails,
        
      },
      {
        path: 'all-tutors',
        Component: AllTutors
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'contact',
        Component: Contact
      },
    ]
  }, 
  {
    path: '*',
    Component: ErrorPage
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      // {
      //   path: 'my-parcels', 
      //   Component: MyParcels
      // },
      // {
      //   path: 'payment/:parcelId',
      //   Component: Payment
      // }, 
      // {
      //   path: 'payment-history',
      //   Component: PaymentHistory
      // },
      // {
      //   path: 'payment-success',
      //   Component: PaymentSuccess
      // }, 
      // {
      //   path: 'payment-cancelled', 
      //   Component: PaymentCancelled
      // }, 
      // rider only routes
      // {
      //   path: 'assigned-deliveries',
      //   element: <RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>
      // },
      // {
      //   path: 'completed-deliveries',
      //   element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
      // },

      // admin only routes
      // {
      //   path: 'approve-riders',
      //   element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
      // },
      // {
      //   path: 'assign-riders',
      //   element: <AdminRoute><AssignRiders></AssignRiders></AdminRoute>
      // },
      // {
      //   path: 'users-management',
      //   element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      // }
    ]
  }

]);