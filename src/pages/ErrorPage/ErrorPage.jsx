import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const containerVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const textVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } } };
const buttonVariants = { hover: { scale: 1.05, transition: { duration: 0.3 } }, tap: { scale: 0.95 } };

const ErrorPage = () => {
    return (
        <motion.div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50/0.1 to-white "
            initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h1 className="text-8xl md:text-9xl font-extrabold text-indigo-600 mb-4" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, delay: 0.2 }}>404</motion.h1>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" variants={textVariants}>Page Not Found!</motion.h2>
            <motion.p className="text-lg text-gray-600 w-[90%] mb-8" variants={textVariants} transition={{ delay: 0.5 }}> Sorry, we couldn’t find that page. It may have been moved or no longer exists. </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <Link to="/"><motion.button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300" variants={buttonVariants} whileHover="hover" whileTap="tap">Go to Homepage</motion.button></Link>
            </motion.div>

            <motion.p className="mt-10 text-sm text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>Need help? Contact etuitionbd@gmail.com</motion.p>
        </motion.div>
    );
};

export default ErrorPage;
