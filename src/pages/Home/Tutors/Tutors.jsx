import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaEnvelope, FaPhone } from "react-icons/fa"; // 👈 missing imports fixed
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TutorsCard from "./TutorsCard";

const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const headingVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/latest-tutors")
      .then(res => setTutors(res.data))
      .catch(error => console.error("Error fetching tutors:", error));
  }, [axiosSecure]);

  return (
    <section className="py-12 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} className="text-3xl md:text-4xl font-bold text-indigo-600 mb-8 text-center">Latest Tutors</motion.h2>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} transition={{ staggerChildren: 0.15 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tutors.map(tutor => (
            // <motion.div key={tutor._id} variants={cardVariants} className="group block p-6 rounded-xl border border-gray-200 bg-white shadow-lg transform transition-all duration-300 ease-out hover:scale-[1.05] cursor-pointer">
            //     <img src={tutor.photoURL} alt={tutor.displayName} className="w-20 h-20 rounded-full mx-auto mb-4" />
            //     <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 justify-center">{tutor.displayName}</h3>
            //     <p className="text-gray-600 text-sm text-center">{tutor.email}</p>
            //     <p className="text-gray-600 text-sm text-center">{tutor.phone}</p>
            // </motion.div>
            <TutorsCard key={tutor._id} tutor={tutor} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTutors;