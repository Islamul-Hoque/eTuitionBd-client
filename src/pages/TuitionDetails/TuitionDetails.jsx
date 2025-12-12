import React, { useRef } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaBookOpen, FaGraduationCap, FaSchool, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaUser, FaPhoneAlt, FaEye, FaClipboardList } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";

const TuitionDetails = () => {
  const { role } = useRole()
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: tuition = {}, isLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition/${id}`);
      return res.data;
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
  toast.error(`${err.response?.data?.message || "Error submitting application!"}`);
  console.error(err);
}
};

  if (isLoading) return <Loading />;

  return (
    <div className="px-6 md:px-14 py-14"><h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center">{tuition.subject} Tuition Details</h1>
    <motion.div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10 space-y-4" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 flex items-center gap-2"><FaBookOpen /> {tuition.subject}</h2>

      <p className="text-gray-700 flex items-center gap-2"><FaGraduationCap className="text-indigo-500" /> Class: {tuition.class}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaSchool className="text-indigo-500" /> Institution: {tuition.institution}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaMapMarkerAlt className="text-indigo-500" /> Location: {tuition.location}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaClock className="text-indigo-500" /> Schedule: {tuition.schedule} ({tuition.duration})</p>
      <p className="text-gray-700 flex items-center gap-2"><FaMoneyBillWave className="text-indigo-500" /> Budget: {tuition.budget} Tk/Month</p>
      <p className="text-gray-700 flex items-center gap-2"><FaUser className="text-indigo-500" /> Student: {tuition.studentName}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaPhoneAlt className="text-indigo-500" /> Phone: {tuition.phone}</p>
      <p className="text-gray-700 flex items-center gap-2"> <FaClipboardList className="text-indigo-500" />Additional Requirements: {tuition.additionalRequirements}</p>
      <p className="text-gray-700 flex items-center gap-2"><FaEye className="text-indigo-500" />  Status: {tuition.status}</p>

    {user?.role === "Tutor" && (
          <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold shadow-md"
            onClick={handleApplyModalOpen} 
            > Apply Now </button>
        )}
    </motion.div>

<dialog ref={ApplyModalRef} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box bg-white">
    <h3 className="font-bold text-[1.5rem] text-center">
      Apply for {tuition.subject}
    </h3>

        <form onSubmit={handleApplySubmit} className="space-y-3 mt-4">
          <div className="flex gap-4">
            <div className="w-1/2"><label className="label">Name</label><input name="name" defaultValue={user?.displayName} readOnly type="text" className="input w-full" placeholder="Your name" required /></div>
            <div className="w-1/2"><label className="label">Email</label><input name="email" defaultValue={user?.email || user?.providerData?.[0]?.email} readOnly type="email" className="input w-full" placeholder="Your email" required /></div>
          </div>
          <label className="label">Qualifications</label><input name="qualifications" type="text" className="input w-full" placeholder={`e.g. B.Sc in ${tuition.subject}`} required />
          <label className="label">Experience</label><input name="experience" type="text" className="input w-full" placeholder="e.g. 6 years overall teaching experience" required />
          <label className="label">Expected Salary</label><input name="salary" type="number" className="input w-full" placeholder="e.g. 4000" required />
          <label className="label">Contact Number</label><input name="contact" type="text" className="input w-full" placeholder="e.g. 017XXXXXXXX" required />
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