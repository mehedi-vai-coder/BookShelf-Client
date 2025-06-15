import { createBrowserRouter } from "react-router";
import MainlayOut from "../Layouts/MainlayOut";
import Home from "../Pages/Home";
import Bookshelf from "../Pages/Bookshelf ";
import AddBook from "../Pages/AddBook";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import MyBooks from "../Pages/MyBooks";

 
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
            Component:AddBook
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


