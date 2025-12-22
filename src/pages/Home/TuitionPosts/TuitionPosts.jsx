import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaGraduationCap, FaSchool, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TuitionCard from "./TuitionCard";

const TuitionPosts = () => {
    const [tuitions, setTuitions] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
    axiosSecure.get("/latest-tuitions")
        .then(res => setTuitions(res.data))
        .catch(error => console.error("Error fetching tuitions:", error));
    }, [axiosSecure]);

    const headingVariants = {
        hidden: { opacity: 0, y: 50 },   
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } 
    };

    return (
        <section className="px-6 md:px-10 py-6 md:py-10 bg-gradient-to-br from-indigo-50 via-purple-50/0.1 to-gray-50">
            <div className="max-w-7xl mx-auto ">
                <motion.h2 variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} className="text-3xl md:text-4xl font-bold text-indigo-600 mb-8 text-center"> Latest Tuition Posts</motion.h2>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} transition={{ staggerChildren: 0.15 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tuitions.map(tuition => (
                    <TuitionCard key={tuition._id} tuition={tuition} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TuitionPosts;