import { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Jhankar Mahbub",
        role: "Chief Executive Officer (CEO)",
        comment:
            "This is a great place to start your additional education, degree upgrade, or simply any information that a good school can give. Thank you!",
        avatar: "https://scontent.fcgp36-1.fna.fbcdn.net/v/t39.30808-6/467444869_10160351769061891_3964624160658220491_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=dqKrlwdOtTsQ7kNvwG3XCcy&_nc_oc=Adl4YHOLph7RA6UkpphTD7afJ9N8JzgFnQAdd3p2VmGX6T5QfmlPv1C0K9o6k_--JkA&_nc_zt=23&_nc_ht=scontent.fcgp36-1.fna&_nc_gid=bPGaEYkiZoSgDtV_KKyJxQ&oh=00_AfPefbuXpajzkgxr9aCT1xxi0cHv5wMkDVWnorNjik9q5Q&oe=68538010",
    },
    {
        name: "ABDUR RAKIB",
        role: "Chief Operating Officer (COO)",
        comment:
            "Such a lovely collection of books! I'm really impressed by the organization and quality.",
        avatar: "https://scontent.fcgp36-1.fna.fbcdn.net/v/t39.30808-6/471818204_9008512842600903_1180405456225003584_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=d3zjiniHGIMQ7kNvwFIF0xc&_nc_oc=Adm0OThme_6eRQxoRsUPeN4Hk4Ah0RBTZGia_a-FLCj8rsfNmskDSzErFGl6-aCTfS8&_nc_zt=23&_nc_ht=scontent.fcgp36-1.fna&_nc_gid=yZ6DXoLU0iPlppovkBjMqA&oh=00_AfMR-JcjjBERqxsWM-n-KBIJCt99rZmm4Zq4aE_HcilFZA&oe=68537932",
    },
    {
        name: "MD GIAS UDDIN",
        role: "Senior Web Instructor",
        comment:
            "Amazing experience! This platform helped me find rare books I couldn't get anywhere else.",
        avatar: "https://scontent.fcgp36-1.fna.fbcdn.net/v/t39.30808-6/500118671_4150388448579696_348121560353291310_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=mZd1xbrxRJMQ7kNvwF3TOj1&_nc_oc=AdlTaILucporbGGnlnXLNLW7O0lxcnThd-xQVPLzze2GNBCP0ibQS4SY09TM2xC3etQ&_nc_zt=23&_nc_ht=scontent.fcgp36-1.fna&_nc_gid=jcfEjqXNSkatzWUQ1mrsIg&oh=00_AfPFMbjUaWrHOJzcrDaBdCAFAC4KfnXw6E2RlilL5UMTlQ&oe=68537EDA",
    },
];

const Testimonial = () => {
    const [selected, setSelected] = useState(0);

    const { name, role, comment,} = testimonials[selected];

    return (
        <div className="bg-sky-600 bg-cover bg-center py-16 px-6 text-white text-center relative mb-20">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-5xl mb-6">❝</p>
                    <p className="text-lg md:text-xl font-light">{comment}</p>
                    <h4 className="mt-6 font-bold text-lg">{name}</h4>
                    <p className="text-sm opacity-90">{role}</p>
                </motion.div>

                {/* Avatars */}
                <div className="flex justify-center gap-4 mt-8">
                    {testimonials.map((person, index) => (
                        <img
                            key={index}
                            src={person.avatar}
                            alt={person.name}
                            onClick={() => setSelected(index)}
                            className={`w-14 h-14 rounded-full object-cover border-4 cursor-pointer transition duration-300 ${selected === index
                                ? "border-white scale-110"
                                : "border-transparent opacity-60 hover:opacity-100"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
