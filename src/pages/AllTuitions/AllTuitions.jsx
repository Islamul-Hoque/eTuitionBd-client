import React, { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TuitionCard from '../Home/TuitionPosts/TuitionCard';
import { motion } from "framer-motion";
import Loading from '../../Components/Loading/Loading';
import { useState } from 'react';

const AllTuitions = () => {
    const axiosSecure = useAxiosSecure();
  // 🔎 Search state
  const [search, setSearch] = useState("");

const { data: tuitions = [], isLoading, isError } = useQuery({
  queryKey: ['all-tuitions', search],
  queryFn: async () => {
    const res = await axiosSecure.get(`/all-tuitions?search=${search}`);
    return res.data;
  }
});




const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

    if (isLoading) return <Loading/>
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div className="p-6">
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-indigo-600 mb-2"> All Tuitions </h2>
                <p className="text-gray-600 mb-6">Browse all available tuition posts from verified students and institutions. </p>
            </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-6 flex items-center justify-center">
          <label className="input w-full sm:w-[20rem] md:w-[25.1rem] gap-2 border rounded-md px-3 py-2 bg-white flex items-center">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"> <circle cx="11" cy="11" r="8" /> <path d="m21 21-4.3-4.3" /> </g> </svg>
            <input type="search" value={search}
            onChange={(e) => setSearch(e.target.value)}  placeholder="Search by subject or location..." className="outline-none bg-transparent w-full" />
          </label>
        </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} transition={{ staggerChildren: 0.15 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {tuitions.map(tuition => ( <TuitionCard key={tuition._id} tuition={tuition} /> ))}
            </motion.div>




            
        </div>
    )
};

export default AllTuitions;