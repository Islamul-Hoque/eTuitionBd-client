import React from "react";
import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AppliedTutors = () => {
  // const { id: tuitionId } = useParams();
  const { user } = useAuth();  
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/student/${user?.email || user?.providerData?.[0]?.email}`
      );
      return res.data;
    }
  });

  const handleApprove = async (application) => {
    try {
      const paymentInfo = {
        applicationId: application._id,
        expectedSalary: application.expectedSalary,
        tutorEmail: application.tutorEmail,
        tutorName: application.tutorName,
        subject: application.tuitionInfo?.subject,
        tuitionClass: application.tuitionInfo?.class,
        tuitionId: application.tuitionInfo?._id,
        studentEmail: user.email
      };

      const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
      window.location.assign(res.data.url);
    } catch (err) {
      Swal.fire("Error", "Failed to start payment", "error");
    }
  };

  // const handleReject = async (applicationId) => {
  //   const res = await axiosSecure.patch(`/applications/${applicationId}`, { status: "Rejected" });
  //   if (res.data.modifiedCount > 0) {
  //     Swal.fire("Rejected!", "Tutor application has been rejected.", "success");
  //     refetch();
  //   }
  // };

  const handleReject = async (applicationId) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to reject this tutor application?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, Reject",
    cancelButtonText: "Cancel"
  });

  if (result.isConfirmed) {
    const res = await axiosSecure.patch(`/applications/${applicationId}`, { status: "Rejected" });
    if (res.data.modifiedCount > 0) {
      Swal.fire("Rejected!", "Tutor application has been rejected.", "success");
      refetch();
    }
  }
};


  if (isLoading) return <Loading />;

  return (
    <div className="px-6 md:px-10 py-6 md:py-10">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Applied Tutors ({applications.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
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
                <td>{index + 1}</td>

                <td>
                  <span className="font-semibold">Subject: {app.tuitionInfo.subject}</span>
                  <br />
                  <span>Class: {app.tuitionInfo.class}</span>
                </td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">  <div className="mask mask-squircle h-12 w-12">  <img  src={app.tutorPhoto || "https://img.daisyui.com/images/profile/demo/2@94.webp"}  alt="Tutor Avatar" /> </div> </div>
                    <div>
                      <div className="font-bold">{app.tutorName}</div>
                      <div className="text-sm opacity-50">{app.tutorEmail}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="block">Qualification: {app.qualifications}</span>
                  <span className="block">Experience: {app.experience}</span>
                </td>

                <td>{app.expectedSalary} Tk/Month</td>
                <td> <span className={ app.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm"
                      : app.status === "Approved"
                      ? "bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
                      : "bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm"  } > {app.status} </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(app)}  className="btn btn-sm btn-success"  disabled={app.status !== "Pending"} >  Approve </button>
                    <button  onClick={() => handleReject(app._id)}  className="btn btn-sm btn-error"  disabled={app.status !== "Pending"} >  Reject  </button>
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