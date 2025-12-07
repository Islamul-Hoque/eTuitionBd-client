import { createBrowserRouter } from "react-router";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import RootLayout from "../layouts/RootLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
    //   {
    //     index: true,
    //     Component: Home
    //   },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }, 

]);