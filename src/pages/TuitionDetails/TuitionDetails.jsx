import React, { useRef } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaBookOpen, FaGraduationCap, FaSchool, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaUser, FaPhoneAlt, FaEye, FaClipboardList, FaEnvelope, FaRegCalendarAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import toast from "react-hot-toast";
import { format } from "date-fns";

const TuitionDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const email = user?.email || user?.providerData?.[0]?.email ;

  const { data: tuition = {}, isLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition/${id}`);
      return res.data;
    },
  });

const { data: role = null, isLoading: roleLoading,  } = useQuery({
  enabled: !!email,   
  queryKey: ["user-role", email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/${email}/role`);
    return res.data?.role;
  },
});

  const ApplyModalRef = useRef(null);
  const handleApplyModalOpen = () => {  ApplyModalRef.current.showModal() };

  const handleApplySubmit = async (e) => {
  e.preventDefault();
  const form = e.target;

  const application = {
    tuitionId: id,
    tuitionClass: tuition.class,
    tuitionSubject: tuition.subject,
    schedule: tuition.schedule, 
    studentName: tuition.studentName,
    studentEmail: tuition.studentEmail,
    tutorPhoto: user?.photoURL ||  user?.providerData?.[0]?.photoURL,
    tutorName: form.name.value,
    tutorEmail: form.email.value,
    qualifications: form.qualifications.value,
    experience: form.experience.value,
    expectedSalary: form.salary.value,
    contact: form.contact.value,
  };

try {
  const res = await axiosSecure.post("/apply-tuition", application);

  if (res.data.success) {
    toast.success(` ${res.data.message}`);
    ApplyModalRef.current.close();
  } else {
    toast.error(`${res.data.message}`);
  }
} catch (err) {
  toast.error(`${err.response?.data?.message }`);
  console.error(err);
}
};

  if (isLoading || roleLoading) return <Loading />;

  return (
    <div className="px-6 md:px-10 py-14 bg-linear-to-br from-indigo-50 via-purple-50/0.1 to-white ">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center">{tuition.subject} Tuition Details</h1>
    <motion.div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10 space-y-4" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 flex items-center gap-2"><FaBookOpen /> {tuition.subject}</h2>

      <p className="text-gray-700 flex items-center gap-2"><FaGraduationCap className="text-indigo-500" /> Class: {tuition.class}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaSchool className="text-indigo-500" /> Institution: {tuition.institution}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaMapMarkerAlt className="text-indigo-500" /> Location: {tuition.location}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaClock className="text-indigo-500" /> Schedule: {tuition.schedule} ({tuition.duration})</p>
      <p className="text-gray-700 flex items-center gap-2"><FaMoneyBillWave className="text-indigo-500" /> Budget: {tuition.budget} Tk/Month</p>
      <p className="text-gray-700 flex items-center gap-2"><FaUser className="text-indigo-500" /> Student: {tuition.studentName}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaPhoneAlt className="text-indigo-500" /> Phone: {tuition.phone}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaEnvelope className="text-indigo-500" /> Email: {tuition.studentEmail}</p>
      <p className="text-gray-700 flex items-center gap-2"> <FaClipboardList className="text-indigo-500" />Additional Requirements: {tuition.additionalRequirements}</p>
      <div className="text-gray-600 text-sm flex items-center gap-2"> <FaRegCalendarAlt className='text-indigo-500'/> {format(new Date(tuition.createdAt), "dd/MM/yyyy")}</div>
      {user && role === "Tutor" && (
            <button className="mt-6 w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold shadow-md"
              onClick={handleApplyModalOpen} 
              > Apply Now </button>
      )} 
    
    </motion.div>

    <dialog ref={ApplyModalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-[1.5rem] text-center"> Apply for {tuition.subject} </h3>

            <form onSubmit={handleApplySubmit} className="space-y-3 mt-4">
              <div className="flex gap-4">
                <div className="w-1/2"><label className="label">Name</label><input name="name" defaultValue={user?.displayName} readOnly type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" required /></div>
                <div className="w-1/2"><label className="label">Email</label><input name="email" defaultValue={user?.email || user?.providerData?.[0]?.email} readOnly type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your email" required /></div>
              </div>
              <label className="label -mb-[0.2rem]">Qualifications</label><input name="qualifications" type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder={`e.g. B.Sc in ${tuition.subject}`} required />
              <label className="label -mb-[0.2rem]">Experience</label><input name="experience" type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. 6 years overall teaching experience" required />
              <label className="label -mb-[0.2rem]">Expected Salary</label><input name="salary" type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. 4000" required />
              <label className="label -mb-[0.2rem]">Contact Number</label><input name="contact" type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. 017XXXXXXXX" required />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold shadow-md mt-3">Submit Application</button>
            </form>

        <div className="modal-action">
          <form method="dialog" className="w-full">
            <button  className="w-full bg-indigo-100 text-gray-800 py-2 rounded-lg hover:bg-indigo-200 transition duration-300 font-semibold shadow-md"  >  Cancel  </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
  );
};

export default TuitionDetails;