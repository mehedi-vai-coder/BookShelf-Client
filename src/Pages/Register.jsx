import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import registerAnim from "../assets/Animation - 1749897956409.json"; 


const Register = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 px-4"
        >
            {/* Left Animation */}
            <div className="hidden md:flex w-1/2 justify-center items-center">
                <Player
                    autoplay
                    loop
                    src={registerAnim}
                    style={{ height: "400px", width: "400px" }}
                />
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Create Account</h2>

                <form className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Profile Photo URL</label>
                        <input
                            type="url"
                            placeholder="https://photo-url.com"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Must be 6+ chars, include upper and lower case
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-gray-500 mb-2">or</p>
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300">
                        Sign Up with Google
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Register;
