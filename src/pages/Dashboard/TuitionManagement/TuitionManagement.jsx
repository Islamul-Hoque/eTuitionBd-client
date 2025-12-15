import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], isLoading, refetch } = useQuery({
    queryKey: ["pending-tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions/pending");
      return res.data;
    },
  });

  const handleStatusChange = async (tuitionId, newStatus) => {
    Swal.fire({
        title: `Confirm ${newStatus}`,
        text: `Are you sure you want to mark this tuition as ${newStatus}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: `Yes, ${newStatus}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/tuitions/${tuitionId}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", `Tuition marked as ${newStatus}.`, "success");
          refetch();
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-6 md:px-10 py-6 md:py-10">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4"> Tuition Management ({tuitions.length}) </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Location</th>
                <th>Budget</th>
                <th>Posted By</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map((tuition, index) => (
              <tr key={tuition._id}>
                <td>{index + 1}</td>
                <td>{tuition.subject}</td>
                <td>{tuition.class}</td>
                <td>{tuition.location}</td>
                <td>{tuition.budget} Tk</td>
                <td>{tuition.studentName}</td>
                <td>{tuition.status}</td>
                <td className="flex gap-2">
                    <button onClick={() => handleStatusChange(tuition._id, "Approved")} className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 shadow-md"> <HiCheckCircle className="text-lg" /> Approve</button>
                    <button onClick={() => handleStatusChange(tuition._id, "Rejected")} className="btn btn-sm bg-indigo-100 text-gray-800 hover:bg-indigo-200 flex items-center gap-2 shadow-md"><HiXCircle className="text-lg" /> Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TuitionManagement;