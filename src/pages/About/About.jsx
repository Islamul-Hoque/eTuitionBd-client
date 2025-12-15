import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaLightbulb, FaHeadset, FaUserCheck, FaHandsHelping } from 'react-icons/fa';

const fadeInUp = { 
  hidden: { opacity: 0, y: 40 }, 
  visible: { opacity: 1, y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  } 
};
const staggerContainer = { 
  hidden: { opacity: 1 }, 
  visible: { opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  } 
};

const About = () => {
  const coreValues = [
    { icon: <FaLightbulb className="text-3xl text-indigo-500" />, 
      title: "Transparency", 
      desc: "Ensuring complete transparency in every transaction and workflow." 
    },
    { icon: <FaUserCheck className="text-3xl text-indigo-500" />, 
      title: "Trust & Verification", 
      desc: "Building trust through verified tutors and a secure platform." 
    },
    { icon: <FaBullseye className="text-3xl text-indigo-500" />, 
      title: "Quality Education", 
      desc: "Connecting students only with highly qualified and reviewed educators." 
    },
  ];

  return (
    <div className="bg-gray-50 px-6 md:px-10 py-6 md:py-10">
      <div className="max-w-7xl mx-auto ">
        <motion.header className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-4">About eTuitionBD</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">We are more than just a platform—we are the trusted connector for education in Bangladesh.</p>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-8 pb-14">
          <motion.div className="p-6 bg-white rounded-xl shadow-lg" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-semibold mb-3 text-center">Our Mission</h3>
            <p className="text-gray-700 text-center">We aim to simplify tuition finding by providing a trusted platform where students can connect with verified tutors quickly and securely.</p>
          </motion.div>
          <motion.div className="p-6 bg-white rounded-xl shadow-lg" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl text-center font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-700 text-center">To make quality education accessible for everyone by bridging the gap between learners and educators through technology.</p>
          </motion.div>
        </div>

        <div className="mb-20">
          <motion.h2 className="text-4xl font-bold text-center text-indigo-600 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }}>Our Core Values</motion.h2>
          <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
            {coreValues.map((value, idx) => (
              <motion.div key={idx} className="p-6 text-center bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.05]" variants={fadeInUp}>
                <div className="flex justify-center mb-3 text-indigo-500">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div className="text-center p-12 bg-white rounded-xl shadow-xl" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
          <motion.h3 className="text-3xl font-bold text-indigo-600 mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>Join Our Community Today!</motion.h3>
          <motion.p className="text-gray-700 mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>Discover the perfect tutor or find your next great tuition job with ease.</motion.p>
          <motion.a href="/register" className="inline-block px-10 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Register Now</motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;