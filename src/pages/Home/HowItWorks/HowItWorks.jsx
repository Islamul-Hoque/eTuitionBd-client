import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-indigo-500 text-4xl" />,
      title: "Post Tuition",
      desc: "Students register and post tuition requirements including subject, class, budget, and location.",
    },
    {
      icon: <FaChalkboardTeacher className="text-indigo-500 text-4xl" />,
      title: "Apply as Tutor",
      desc: "Tutors browse available tuition posts and apply to suitable opportunities with expected salary.",
    },
    {
      icon: <FaUserShield className="text-indigo-500 text-4xl" />,
      title: "Admin Approval",
      desc: "Admin reviews applications, verifies tutors, and approves or rejects tuition posts for quality.",
    },
  ];

  return (
    <section className="px-6 md:px-10 py-6 md:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2  variants={headingVariants} initial="hidden"  whileInView="visible" viewport={{ once: false, amount: 0.2 }} className="text-3xl md:text-4xl font-bold text-indigo-600 mb-12 text-center" > How the Platform Works </motion.h2>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} transition={{ staggerChildren: 0.15 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={cardVariants} className="p-6 rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-[1.05]" >
              <div className="flex flex-col items-center text-center space-y-4">
                {step.icon}
                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;