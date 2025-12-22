import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

const handleSubmit = (e) => { e.preventDefault(); toast.success("Your message has been sent successfully!"); e.target.reset(); };

const Contact = () => {
    const { user } = useAuth();
    return (
        <div className=" px-6 md:px-10 py-6 md:py-10 bg-linear-to-br from-indigo-50 via-purple-50/0.1 to-white">
            <div className="max-w-7xl mx-auto">
                <motion.h2 className="text-4xl font-bold text-indigo-600 text-center mb-4" 
                    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
                    Contact Us</motion.h2>
                <motion.p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto" 
                    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
                    Got a question or need support? We’re here to help — whether it’s tuition, tech, or collaboration.</motion.p>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div className="bg-white p-8 rounded-xl shadow-lg" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-6">Get in Touch</h3>
                        <motion.div className="flex items-start space-x-4 mb-5" variants={fadeInUp}><FaEnvelope className="text-indigo-500 text-xl shrink-0 mt-1" /><div><h4 className="text-lg font-medium text-gray-900">Email Address</h4><p className="text-gray-700">etuitionbd@gmail.com</p></div></motion.div>
                        <motion.div className="flex items-start space-x-4 mb-5" variants={fadeInUp}><FaPhoneAlt className="text-indigo-500 text-xl shrink-0 mt-1" /><div><h4 className="text-lg font-medium text-gray-900">Phone</h4><p className="text-gray-700">+8801761830425</p></div></motion.div>
                        <motion.div className="flex items-start space-x-4 mb-5" variants={fadeInUp}><FaMapMarkerAlt className="text-indigo-500 text-xl shrink-0 mt-1" /><div><h4 className="text-lg font-medium text-gray-900">Office Location</h4><p className="text-gray-700">Chittagong, Bangladesh (Headquarters)</p></div></motion.div>
                        <hr className="my-6 border-gray-200" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Hours</h3>
                        <motion.div className="flex items-start space-x-4 mb-3" variants={fadeInUp}><FaCalendarAlt className="text-indigo-500 text-xl shrink-0 mt-1" /><div><h4 className="text-lg font-medium text-gray-900">Working Days</h4><p className="text-gray-700">Saturday to Thursday (Friday Off)</p></div></motion.div>
                        <motion.div className="flex items-start space-x-4" variants={fadeInUp}><FaClock className="text-indigo-500 text-xl shrink-0 mt-1" /><div><h4 className="text-lg font-medium text-gray-900">Timing</h4><p className="text-gray-700">9:00 AM - 6:00 PM (GMT+6)</p></div></motion.div>
                    </motion.div>

                    <motion.form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-6">Send us a Message</h3>
                        <input type="text" defaultValue={user?.displayName || ""} readOnly={!!user?.displayName} placeholder="Your Name" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 disabled:opacity-75" />
                        <input type="email" defaultValue={user?.email || user?.providerData?.[0]?.email || ""} readOnly={!!(user?.email || user?.providerData?.[0]?.email)} placeholder="Your Email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 disabled:opacity-75" />
                        <input type="text" required placeholder="Subject" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <textarea rows="4" required placeholder="Your Message" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        <button type="submit" className="w-full bg-indigo-600 text-white mt-2 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold shadow-md">Send Message</button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default Contact;