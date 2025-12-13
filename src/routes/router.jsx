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
import AddTuition from "../pages/Dashboard/AddTuition/AddTuition";
import MyTuitions from "../pages/Dashboard/My Tuitions/MyTuitions";
import UpdateTuitionPost from "../pages/Dashboard/UpdateTuitionPost/UpdateTuitionPost";
import AppliedTutors from "../pages/Dashboard/AppliedTutors/AppliedTutors";
import MyApplications from "../pages/Dashboard/MyApplications/MyApplications";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import TuitionManagement from "../pages/Dashboard/TuitionManagement/TuitionManagement";
import EditProfile from "../pages/Dashboard/EditProfile/EditProfile";
import AdminRoute from "./AdminRoute";
import TutorRoute from "./TutorRoute";
import StudentRoute from "./StudentRoute";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import OngoingTuitions from "../pages/Dashboard/OngoingTuitions/OngoingTuitions";


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
      //   path: 'payment/:parcelId',
      //   Component: Payment
      // },
      {path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      }, 
      {
        path: 'payment-cancelled', 
        Component: PaymentCancelled
      },
      {
        path: 'add-tuition', 
        element: <StudentRoute> <AddTuition/> </StudentRoute>,
      },
      {
        path: 'update-tuition/:id', 
        element: <StudentRoute> <UpdateTuitionPost/> </StudentRoute>,
      },
      {
        path: 'my-tuitions', 
        element: <StudentRoute> <MyTuitions/> </StudentRoute>
      },
      {
        path: 'applied-tutors', 
        element: <StudentRoute> <AppliedTutors/> </StudentRoute>,
      },
      // Tutor route......................
      {
        path: 'my-applications', 
        element: <TutorRoute> <MyApplications/> </TutorRoute>
      },
      {
        path: 'ongoing-tuitions', 
        element: <TutorRoute> <OngoingTuitions/> </TutorRoute>
      },
      // Admin route.......................
      {
        path: 'users-management', 
        element: <AdminRoute> <UserManagement/> </AdminRoute>,
      },
      {
        path: 'tuition-management', 
        element: <AdminRoute> <TuitionManagement/> </AdminRoute>,
      },
      {
        path: 'edit-profile', 
        Component: EditProfile
      },
    ]
  }
]);