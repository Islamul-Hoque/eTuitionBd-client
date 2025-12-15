import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers, FaMoneyCheckAlt, FaChalkboardTeacher } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-indigo-500 text-3xl" />,
      title: "Verified Tutors",
      desc: "All tutors are verified by admin to ensure trust and quality.",
    },
    {
      icon: <FaUsers className="text-indigo-500 text-3xl" />,
      title: "Smart Matching",
      desc: "Students get matched with the right tutors based on subject and location.",
    },
    {
      icon: <FaMoneyCheckAlt className="text-indigo-500 text-3xl" />,
      title: "Transparent Payments",
      desc: "Secure payment tracking ensures clarity and trust for both sides.",
    },
    {
      icon: <FaChalkboardTeacher className="text-indigo-500 text-3xl" />,
      title: "Easy Communication",
      desc: "Structured chat and updates for smooth student–tutor interaction.",
    },
  ];

  return (
    <section className="px-6 md:px-10 py-6 md:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2  variants={headingVariants}  initial="hidden"  whileInView="visible"  viewport={{ once: false, amount: 0.2 }}  className="text-3xl md:text-4xl font-bold text-indigo-600 mb-12 text-center"  > Why Choose Us </motion.h2>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} transition={{ staggerChildren: 0.15 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={cardVariants} className="p-6 rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-[1.05]" >
              <div className="flex flex-col items-center text-center space-y-4">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;