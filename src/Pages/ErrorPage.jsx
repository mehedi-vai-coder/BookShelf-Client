import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4"
        >
            <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
            <p className="text-2xl font-semibold mt-4">Oops! Page not found</p>
            <p className="text-gray-500 mt-2 max-w-md">
                The page you’re looking for doesn’t exist or has been moved.
            </p>

            <Link
                to="/"
                className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
                🔙 Go Home
            </Link>

            <motion.img
                src="https://i.pinimg.com/1200x/eb/6b/46/eb6b46a7bdea7ac31e3d5d3b74f069ce.jpg"
                alt="404 Illustration"
                className="mt-10 w-72"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            />
        </motion.div>
    );
};

export default ErrorPage;
