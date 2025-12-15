import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="bg-indigo-50 text-gray-800 min-h-[80vh] flex items-center px-6 md:px-10 py-6 md:py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.3, type: "spring", stiffness: 70 }} className="flex justify-center md:justify-end order-1 md:order-2" >
          <img src="https://i.ibb.co.com/fVMfzsRF/hand-drawn-online-tutor-illustration.png"  className="w- 64 md:w-100 object-contain drop-shadow-xl"  alt="Education Hero" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 20 }}
         className="space-y-6 text-center md:text-left order-2 md:order-1  mb-10 md:mb-0" >
          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring" }}  className="text-3xl md:text-5xl font-extrabold leading-tight text-indigo-600"  > Find Verified Tutors & Trusted Tuition Posts
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, type: "spring" }} className="text-base md:text-xl text-gray-700" > eTuitionBd connects students and tutors with a seamless platform for learning, teaching, and growth. </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, type: "spring" }} 
              className="flex flex-row gap-4 justify-center md:justify-start" >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/all-tuitions" className="bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-indigo-600 transition" > Browse Tuitions </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/all-tutors" className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition" >  Explore Tutors  </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
