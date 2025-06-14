import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion } from "motion/react";
import { motion } from "motion/react"
import { Player } from "@lottiefiles/react-lottie-player";
import loginAnim from "../assets/Animation - 1749897834069.json";
import { use, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
const Login = () => {
    const [error, setError] = useState("")
    const { signInUser } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider;
    //  console.log(location)
    const handleGoogleLoginIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                navigate(`${location.state ? location.state : "/"}`)
                console.log(result)
            }).then(error => {
                const errormasses = error.message
                setError(errormasses)
            })
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(password, email)

        // signIn User
        signInUser(email, password)
            .then((user) => {
                navigate(`${location.state ? location.state : "/"}`)
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)

            })
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 px-4"
        >
            {/* Left Animation */}
            <div className="hidden md:flex w-1/2 justify-center items-center">
                <Player
                    autoplay
                    loop
                    src={loginAnim}
                    style={{ height: "600px", width: "600px" }}
                />
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>
                    {
                        error && <p className='text-red-500'> {error} </p>
                    }


                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline">
                        Register
                    </Link>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-gray-500 mb-2">or</p>
                    <button onClick={handleGoogleLoginIn} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300">
                        Sign In with Google
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
