import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import TuitionCard from '../Home/TuitionPosts/TuitionCard';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { motion } from "framer-motion";

const AllTuitions = () => {
  const axiosSecure = useAxiosSecure()
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const [page, setPage] = useState(1)
  const [limit] = useState(8)

  const [sort, setSort] = useState('date-desc')

  const [showFilters, setShowFilters] = useState(false)
  const [filterClass, setFilterClass] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterLocation, setFilterLocation] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Dropdown filters (Class, Subject, Location)
  const { data: filterData = {},  } = useQuery({
    queryKey: ['tuition-filters'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition-filters');
      return res.data;
    }
  });

  // Tuition list 
  const { data: listData,  } = useQuery({
    queryKey: ['all-tuitions', searchQuery, sort, page, filterClass, filterSubject, filterLocation],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-tuitions', {
        params: { search: searchQuery, sort, page, limit, class: filterClass, subject: filterSubject, location: filterLocation }
      });
      return res.data;
    },
    keepPreviousData: true
  });

  const tuitions = listData?.data || [];
  const total = listData?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const headingVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
  return (
    <div className="bg-gray-50 p-6">
      <div className="text-center mb-6">
        <motion.h2 variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} className="text-3xl md:text-4xl font-bold text-indigo-600 text-center" >All Tuitions</motion.h2>
        <br />
        <p className="text-gray-600">Showing {tuitions.length} of {total} tuitions</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <label className="input flex items-center gap-2 w-full sm:w-64 md:w-80"> <FaSearch className="opacity-50" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by subject, location or class..."  className="w-full outline-none bg-transparent" />
          </label>

          <button onClick={() => setShowFilters(!showFilters)} className="btn flex items-center gap-2"> <FaFilter /> Filters </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered">
            <option value="budget-desc">Budget: High to Low</option>
            <option value="budget-asc">Budget: Low to High</option>
            <option value="date-desc">Date: Newest First</option>
            <option value="date-asc">Date: Oldest First</option>
          </select>
        </div>

        {showFilters && (
          <div className="w-full max-w-6xl mx-auto mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control w-full">
                <label className="label"><span className="label-text">Class/Grade</span></label>
                <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="select select-bordered w-full">
                  <option value="">All Classes</option>
                  {filterData.classes?.map(cls => <option key={cls}>{cls}</option>)}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text">Subject</span></label>
                <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="select select-bordered w-full">
                  <option value="">All Subjects</option>
                  {filterData.subjects?.map(sub => <option key={sub}>{sub}</option>)}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text">Location</span></label>
                <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="select select-bordered w-full">
                  <option value="">All Locations</option>
                  {filterData.locations?.map(loc => <option key={loc}>{loc}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tuitions.map(tuition => <TuitionCard key={tuition._id} tuition={tuition} />)}
        {tuitions.length === 0 && <div className="col-span-full text-center text-gray-500">No tuitions found.</div>}
      </div>

      <div className="flex justify-center mt-8">
        <div className="join gap-2">
          {page > 1 && <button onClick={() => setPage(page - 1)} className="join-item btn btn-sm bg-indigo-100 text-gray-800 hover:bg-indigo-200 flex items-center gap-1 ">Previous</button>}
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`join-item btn btn-sm ${page === i + 1 ?
              "btn-active bg-indigo-600 text-white" :
              "btn btn-sm bg-indigo-100 text-gray-800 hover:bg-indigo-200 flex items-center gap-1 shadow"}`}>{i + 1}</button>
          ))}
          {page < totalPages && <button onClick={() => setPage(page + 1)} className="join-item btn btn-sm bg-indigo-100 text-gray-800 hover:bg-indigo-200 flex items-center gap-1 ">Next</button>}
        </div>
      </div>
    </div>
  );
};

export default AllTuitions;