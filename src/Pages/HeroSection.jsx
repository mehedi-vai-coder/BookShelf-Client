import { motion } from "framer-motion";

const containerVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HeroSection() {
    return (
        <motion.section
            variants={containerVariant}
            initial="hidden"
            animate="show"
            className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 gap-10 bg-white overflow-hidden"
        >
          
            <motion.div
                variants={itemVariant}
                className="md:w-1/2"
            >
                <p className="text-sm text-sky-600 font-semibold uppercase tracking-wide mb-3">
                    Online Data
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
                    The largest library on the planet
                </h1>
                <p className="text-gray-600 mb-6 text-lg">
                    We share thousands of books with others by reviewing them. Our goal is to get the books in the readers' hands all over the world.
                </p>
                <motion.ul
                    className="grid grid-cols-2 gap-3 text-sky-700 font-medium text-sm"
                    variants={containerVariant}
                >
                    {[
                        "Scientific Department",
                        "Audio Books",
                        "Technical Literature",
                        "Rare Manuscripts",
                        "Global Scholar Library",
                        "Classic Literature",
                    ].map((item, index) => (
                        <motion.li key={index} variants={itemVariant}>
                            • {item}
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>

         
            <motion.div
                variants={itemVariant}
                className="md:w-1/2 flex flex-col gap-4 items-center relative"
            >
                <motion.img
                    src="https://cdn.aarp.net/content/dam/aarp/entertainment/books/2021/12/1140-flying-books-illustration.jpg" 
                    alt="Person typing"
                    className="rounded-lg w-200  shadow-xl border border-gray-200"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.img
                    src="https://booksbythefoot.com/wp-content/uploads/2023/02/vintagecombo1-400x500.png" // 
                    alt="Person smiling"
                    className="rounded-lg w-80 h-auto shadow-md absolute -bottom-8 -left-8 border border-gray-200"
                    whileHover={{ rotate: 2, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 200 }}
                />
            </motion.div>
        </motion.section>
    );
}
