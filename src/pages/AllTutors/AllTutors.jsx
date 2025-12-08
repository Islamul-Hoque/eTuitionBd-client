import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TutorsCard from '../Home/Tutors/TutorsCard';
import { motion } from "framer-motion";

const AllTutors = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allTutors = [], isLoading, isError } = useQuery({
        queryKey: ['all-tutors'],
        queryFn: async () => {
        const res = await axiosSecure.get('/all-tutors');
        return res.data;
    }
});

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div className='py-12 px-6 md:px-16'>
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-indigo-600 mb-2">All Tutors</h2>
                <p className="text-gray-600 mb-6"> Browse all verified tutors with their qualifications and experience.  </p>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} transition={{ staggerChildren: 0.15 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {allTutors.map(tutor => ( <TutorsCard key={tutor} tutor={tutor}/> ))}
            </motion.div>
        </div>
    );
};

export default AllTutors;