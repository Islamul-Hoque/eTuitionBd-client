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
      // {
      //   index: true,
      //   Component: DashboardHome
      // },
      {
        path: 'add-tuition', 
        Component: AddTuition
      },
      {
        path: 'update-tuition/:id', 
        Component: UpdateTuitionPost
      },
      {
        path: 'my-tuitions', 
        Component: MyTuitions
      },
      {
        path: 'applied-tutors', 
        Component: AppliedTutors
      },
    ]
  }

]);