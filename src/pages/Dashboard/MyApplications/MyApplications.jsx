import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const UpdateModalRef = useRef(null);

  const { data: myApplications = [], isLoading, refetch } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications/tutor/${user?.email || user?.providerData?.[0]?.email}`);
      return res.data;
    },
  });

  const handleUpdateSubmit = async (e, app) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = { 
      qualifications: form.qualifications.value, 
      experience: form.experience.value, 
      expectedSalary: form.salary.value, 
      contact: form.contact.value 
    }
    const res = await axiosSecure.patch(`/applications/${app._id}`, updatedData);
    if (res.data.modifiedCount > 0) { refetch(); UpdateModalRef.current.close(); }
  };

const handleDelete = async (appId) => {
  // Swal.fire({
  //   title: "Are you sure?",
  //   text: "You won't be able to revert this!",
  //   icon: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Yes, delete it!"
  // }).then(async (result) => {
  //   if (result.isConfirmed) {
  //     const res = await axiosSecure.delete(`/applications/${appId}`);
  //     if (res.data.deletedCount > 0) {
  //       Swal.fire("Deleted!", "Application removed successfully.", "success");
  //       refetch();
  //     }
  //   }
  // });
};


  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">My Applications ({myApplications.length})</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr><th>#</th><th>Tuition Info</th><th>Qualifications</th><th>Experience</th><th>Expected Salary</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {myApplications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td><span className="font-semibold">Subject: {app.tuitionSubject}</span><br /><span>Class: {app.tuitionClass}</span></td>
                <td>{app.qualifications}</td>
                <td>{app.experience}</td>
                <td>{app.expectedSalary} Tk/Month</td>
                <td>{app.status}</td>
                <td className="flex gap-2">
                  {app.status !== "Approved" ? (
                    <>
                      <button onClick={() => { setSelectedApp(app); UpdateModalRef.current.showModal(); }} className="btn btn-sm btn-warning">Update</button>
                      <button onClick={() => handleDelete(app._id)} className="btn btn-sm btn-error">Delete</button>
                    </>
                  ) : (
                    <span className="text-green-600 font-semibold">Locked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={UpdateModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-[1.5rem] text-center">Update Application</h3>
          {selectedApp && (
            <form onSubmit={(e) => handleUpdateSubmit(e, selectedApp)} className="space-y-3 mt-4">
  <label className="label">Qualifications</label>
  <input 
    name="qualifications" 
    type="text" 
    value={selectedApp?.qualifications || ""} 
    onChange={(e) => setSelectedApp({ ...selectedApp, qualifications: e.target.value })} 
    className="input w-full" 
    required 
  />

  <label className="label">Experience</label>
  <input 
    name="experience" 
    type="text" 
    value={selectedApp?.experience || ""} 
    onChange={(e) => setSelectedApp({ ...selectedApp, experience: e.target.value })} 
    className="input w-full" 
    required 
  />

  <label className="label">Expected Salary</label>
  <input 
    name="salary" 
    type="number" 
    value={selectedApp?.expectedSalary || ""} 
    onChange={(e) => setSelectedApp({ ...selectedApp, expectedSalary: e.target.value })} 
    className="input w-full" 
    required 
  />

  <label className="label">Contact Number</label>
  <input 
    name="contact" 
    type="text" 
    value={selectedApp?.contact || ""} 
    onChange={(e) => setSelectedApp({ ...selectedApp, contact: e.target.value })} 
    className="input w-full" 
    required 
  />

  <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold shadow-md mt-3">
    Update Application
  </button>
</form>

          )}
          <div className="modal-action">
            <form method="dialog" className="w-full"><button className="w-full bg-indigo-100 text-gray-800 py-2 rounded-lg hover:bg-indigo-200 transition duration-300 font-semibold shadow-md">Cancel</button></form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;