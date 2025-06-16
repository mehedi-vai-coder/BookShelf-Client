import { createBrowserRouter } from "react-router";
import MainlayOut from "../Layouts/MainlayOut";
import Home from "../Pages/Home";
import Bookshelf from "../Pages/Bookshelf ";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import MyBooks from "../Pages/MyBooks";
import AddBookForm from "../Pages/AddBookForm";
import UpdateBookModal from "../Pages/UpdateBookModal";
import Profile from "../Pages/Profile";
import ErrorPage from "../Pages/ErrorPage";
import BookDetails from "../Pages/BookDetails";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainlayOut,
        errorElement: ErrorPage,
        children: [
            {
                index: true,
                path: '/',
                Component: Home
            },
            {
                path: '/bookshelf',
                Component: Bookshelf,

            },
            {
                path: '/addbooks',
                Component: AddBookForm
            },
            {
                path: 'mybooks',
                Component: MyBooks
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'updatebook/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/books/${params.id}`),
                Component: UpdateBookModal
            },
            {
                path: 'profile',
                Component: Profile
            },
            {
                path: '*',
                Component: ErrorPage
            },
            {
                path: "/books/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/books/${params.id}`),
                Component: BookDetails
            }
        ]
    },
]);


