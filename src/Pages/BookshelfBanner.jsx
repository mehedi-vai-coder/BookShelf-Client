import { motion } from "framer-motion";


const BookshelfBanner = () => {
    return (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 py-16 px-6 md:px-12 rounded-2xl shadow-lg mt-6 mb-12">

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-center text-purple-700 mb-4"
            >
                Welcome to Your <span className="text-blue-600">Virtual Bookshelf</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-lg md:text-xl text-center text-gray-700 mb-8"
            >
                Track, Review & Discover Books in One Place 📚
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center items-center max-w-5xl mx-auto">
                <motion.div
                    animate={{ x: ["0%", "-200%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 10,
                    }}
                   
                    className="w-full h-70 bg-white rounded-xl shadow-md overflow-hidden">
                    <img src="https://pics.cdn.librarything.com/picsizes/87/55/8755049-b-h635-w450-pv25_596d6d586851444341587343_v5.jpg" alt="Book 1" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className="w-full h-70 bg-white rounded-xl shadow-md overflow-hidden">
                    <img src="https://images-na.ssl-images-amazon.com/images/P/0439895294.01._SX200_SCLZZZZZZZ_.jpg" alt="Book 2" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className="w-full h-70 bg-white rounded-xl shadow-md overflow-hidden">
                    <img src="https://images-na.ssl-images-amazon.com/images/P/0307279952.01._SX200_SCLZZZZZZZ_.jpg" alt="Book 3" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className="w-full h-70 bg-white rounded-xl shadow-md overflow-hidden">
                    <img src="https://images-na.ssl-images-amazon.com/images/P/3518382969.01._SX200_SCLZZZZZZZ_.jpg" alt="Book 4" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 10,
                    }}
                    className="w-full h-70 bg-white rounded-xl shadow-md overflow-hidden">
                    <img src="https://pics.cdn.librarything.com/picsizes/16/60/16603104-b-h0-w200-pv25_597542582f51444941414141_v5.jpg" alt="Book 5" className="w-full h-full object-cover" />
                </motion.div>
            </div>
        </div>
    );
};

export default BookshelfBanner;
