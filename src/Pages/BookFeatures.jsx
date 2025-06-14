import { motion } from "framer-motion";
import { FaBookOpen, FaGift, FaHome } from "react-icons/fa";

const features = [
  {
    icon: <FaBookOpen className="text-4xl text-cyan-500 mb-4" />,
    title: "Used Book Buying",
    desc: "At our store, readers and students can buy books that have been sent to us as a charity.",
  },
  {
    icon: <FaGift className="text-4xl text-cyan-500 mb-4" />,
    title: "Gift Cards",
    desc: "They say a book is the best gift for a reason. Get a gift card for a family member or a friend!",
  },
  {
    icon: <FaHome className="text-4xl text-cyan-500 mb-4" />,
    title: "Returns and Exchanges",
    desc: "We are open for reasonable exchanges and returns with refund or replacement upon request.",
  },
];

const BookFeatures = () => {
  return (
    <section className="py-16 px-4 md:px-20 bg-white">
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800"
        >
          📘 Why Choose Us?
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BookFeatures;
