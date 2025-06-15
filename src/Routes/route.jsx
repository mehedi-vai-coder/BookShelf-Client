import { createBrowserRouter } from "react-router";
import MainlayOut from "../Layouts/MainlayOut";
import Home from "../Pages/Home";
import Bookshelf from "../Pages/Bookshelf ";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import MyBooks from "../Pages/MyBooks";
import AddBookForm from "../Pages/AddBookForm";

 
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainlayOut,
    children: [
        {   
            index:true,
            path:'/',
            Component:Home
        },
        {
            path:'/bookshelf',
            Component:Bookshelf,

        },
        {
            path:'/addbooks',
            Component:AddBookForm
        },
        {
            path:'mybooks',
            Component:MyBooks
        },
        {
            path:'/register',
            Component:Register
        },
        {
            path:'login',
            Component:Login
        }
    ]
  },
]);


