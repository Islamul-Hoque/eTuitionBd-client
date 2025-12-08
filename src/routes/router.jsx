import { createBrowserRouter } from "react-router";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllTuitions from "../pages/AllTuitions/AllTuitions";
import AllTutors from "../pages/AllTutors/AllTutors";
import About from "../pages/About/About";



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
        path: 'all-tutors',
        Component: AllTutors
      },
      {
        path: 'about',
        Component: About
      },
    ]
  }, 

]);