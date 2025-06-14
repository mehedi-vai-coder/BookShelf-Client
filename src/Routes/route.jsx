import { createBrowserRouter } from "react-router";
import MainlayOut from "../Layouts/MainlayOut";
import Home from "../Pages/Home";

 
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainlayOut,
    children: [
        {
            path:'/',
            Component:Home
        }
    ]
  },
]);


