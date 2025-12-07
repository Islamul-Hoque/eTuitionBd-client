import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaGraduationCap, FaSchool, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const TuitionPosts = () => {
    const [tuitions, setTuitions] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
    axiosSecure.get("/latest-tuitions")
        .then(res => setTuitions(res.data))
        .catch(error => console.error("Error fetching tuitions:", error));
    }, [axiosSecure]);

    const cardVariants = {
    hidden: { opacity: 0, y: 40 },  
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
    };

    const headingVariants = {
        hidden: { opacity: 0, y: 50 },   
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } 
    };

    return (
        <section className="py-12 px-6 md:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.h2 variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} className="text-3xl md:text-4xl font-bold text-indigo-600 mb-8 text-center"> Latest Tuition Posts</motion.h2>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} transition={{ staggerChildren: 0.15 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tuitions.map(tuition => (
                    <motion.div key={tuition._id} variants={cardVariants} className="group block p-6 rounded-xl border border-gray-200 bg-white shadow-lg transform transition-all duration-300 ease-out hover:scale-[1.05] cursor-pointer">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2"><FaBookOpen className="text-indigo-500" /> {tuition.subject}</h3>
                            <p className="text-gray-600 text-sm flex items-center gap-2"><FaGraduationCap className="text-indigo-500" /> {tuition.class}</p>
                            <p className="text-gray-600 text-sm flex items-center gap-2"><FaSchool className="text-indigo-500" /> {tuition.institution}</p>
                            <div className="text-gray-600 text-sm flex items-start gap-2"><FaMapMarkerAlt className="text-indigo-500" /> {tuition.location}</div>
                            <p className="text-gray-600 text-sm flex items-center gap-2"><FaClock className="text-indigo-500" /> {tuition.schedule}</p>
                            <p className="text-gray-600 text-sm flex items-center gap-2"><FaMoneyBillWave className="text-indigo-500" /> {tuition.budget} Tk/Month</p>
                        </div>
                        <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition flex items-center justify-center gap-2"><FaEye /> View Details</button>
                    </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TuitionPosts;