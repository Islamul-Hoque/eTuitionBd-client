import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TutorsCard from "./TutorsCard";

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
    <section className="px-6 md:px-10 py-6 md:py-10 bg-linear-to-bl from-indigo-50  via-purple-50/0.1 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.h2 variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} className="text-3xl md:text-4xl font-bold text-indigo-600 mb-8 text-center">Latest Tutors</motion.h2>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} transition={{ staggerChildren: 0.15 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          { 
            tutors.map(tutor => ( <TutorsCard key={tutor._id} tutor={tutor} />

          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTutors;