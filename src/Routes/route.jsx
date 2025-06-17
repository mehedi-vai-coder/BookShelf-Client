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
import PrivateRoute from "../Context/Privateroute";
import Loading from "../Pages/Loading";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainlayOut,
        errorElement: ErrorPage,
        children: [
            {
                index: true,
                path: '/',
                Component: Home,
                hydrateFallbackElement:<Loading></Loading>
            },
            {
                path: '/bookshelf',
                Component: Bookshelf,

            },
            {
                path: '/addbooks',
                element: <PrivateRoute>
                    <AddBookForm></AddBookForm>
                </PrivateRoute>
            },
            {
                path: 'mybooks',
                element:<PrivateRoute>
                    <MyBooks></MyBooks>
                </PrivateRoute>
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
                loader: ({ params }) => fetch(`https://virtual-bookshelf-server-teal.vercel.app/books/${params.id}`),
                Component: UpdateBookModal,
                hydrateFallbackElement:<Loading></Loading>
            },
            {
                path: 'profile',
                element:<PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>
            },
            {
                path: '*',
                Component: ErrorPage
            },
            {
                path: "/books/:id",
                loader: ({ params }) => fetch(`https://virtual-bookshelf-server-teal.vercel.app/books/${params.id}`),
                hydrateFallbackElement:<Loading></Loading>,
                element:<PrivateRoute>
                    <BookDetails></BookDetails>
                </PrivateRoute>
            }
        ]
    },
]);


