import React from 'react';
import { motion } from "framer-motion";

const TutorsCard = ({tutor}) => {
    const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
    return (
        <div>
        <motion.div variants={cardVariants} className="group block p-6 rounded-xl border border-gray-200 bg-white shadow-lg transform transition-all duration-300 ease-out hover:scale-[1.05] cursor-pointer">
            <img src={tutor.photoURL} alt={tutor.displayName} className="w-20 h-20 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 justify-center">{tutor.displayName}</h3>
            <p className="text-gray-600 text-sm text-center">{tutor.email}</p>
        </motion.div>
        </div>
    );
};

export default TutorsCard;