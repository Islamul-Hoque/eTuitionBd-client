import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AppliedTutors = () => {

  const { id: tuitionId } = useParams();
console.log("tuitionId from route:", tuitionId);


const { user } = useAuth();  
const axiosSecure = useAxiosSecure();

const { data: applications = [], isLoading } = useQuery({
  queryKey: ["applications", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/applications/student/${user?.email || user?.providerData?.[0]?.email}`);
    return res.data;
  }
});


  const handleReject = async (applicationId) => {
    const res = await axiosSecure.patch(`/applications/${applicationId}`, { status: "Rejected" });
    if (res.data.modifiedCount > 0) {
      Swal.fire("Rejected!", "Tutor application has been rejected.", "success");
      refetch();
    }
  };

  const handleApprove = async (application) => {
    Swal.fire("Approve clicked!", "Payment flow will be added later.", "info");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Applied Tutors ({applications.length})
      </h2>

<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Tuition Info</th>
        <th>Tutor</th>
        <th>Other Info</th>
        <th>Expected Salary</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {applications.map((app, index) => (
        <tr key={app._id}>
          {/* Serial */}
          <td>{index + 1}</td>

          {/* Tuition Info */}
          <td>
            <span className="font-semibold">Subject: {app.tuitionInfo.subject}</span>
            <br />
            <span className="badge badge-ghost badge-sm">Class: {app.tuitionInfo.class}</span>
          </td>

          {/* Tutor Info */}
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={app.tutorPhoto || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                    alt="Tutor Avatar"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{app.tutorName}</div>
                <div className="text-sm opacity-50">{app.tutorEmail}</div>
              </div>
            </div>
          </td>

          {/* Other Info (Qualifications + Experience) */}
          <td>
            <span className="block">Qualification: {app.qualifications}</span>
            <span className="block">Experience: {app.experience}</span>
          </td>

          {/* Expected Salary */}
          <td>{app.expectedSalary} Tk/Month</td>

          {/* Status */}
          <td>{app.status}</td>

          {/* Actions */}
          <td>
            <div className="flex gap-2">
              <button onClick={() => handleApprove(app)} className="btn btn-sm btn-success">Approve</button>
              <button onClick={() => handleReject(app._id)} className="btn btn-sm btn-error">Reject</button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



    
    
    </div>
  );
};

export default AppliedTutors;