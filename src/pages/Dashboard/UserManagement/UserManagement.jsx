import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaSync } from "react-icons/fa";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const UpdateModalRef = useRef(null);

  const { data: users = [], isLoading, refetch } = useQuery({ queryKey: ["users"], queryFn: async () => { const res = await axiosSecure.get("/users"); return res.data; } });

  const handleUpdateSubmit = async (e, user) => {
    e.preventDefault();
    // const form = e.target;
    // const updatedData = { displayName: form.displayName.value, email: form.email.value, photoURL: form.photoURL.value, phone: form.phone.value, role: form.role.value, status: form.status.value };
    // const res = await axiosSecure.patch(`/users/${user._id}`, updatedData);
    // if (res.data.modifiedCount > 0) { refetch(); UpdateModalRef.current.close(); toast.success("User updated successfully!"); }
  };

  const handleDelete = async (userId) => {
    Swal.fire({ 
      title: "Are you sure?", 
      text: "This account will be permanently deleted!", 
      icon: "warning", 
      showCancelButton: true, 
      confirmButtonColor: "#3085d6", 
      cancelButtonColor: "#d33", 
      confirmButtonText: "Yes, delete it!" 
    }).then(async (result) => {
      if (result.isConfirmed) { 
        const res = await axiosSecure.delete(`/users/${userId}`); 
          if (res.data.deletedCount > 0) { 
            Swal.fire("Deleted!", "User account removed successfully.", "success"); 
            refetch(); 
          } 
        }
    })
  }

  const handleRoleUpdate = async (userId, newRole) => {
    Swal.fire({ 
      title: "Confirm Role Change", 
      text: `Are you sure you want to change role to ${newRole}?`, 
      icon: "question", 
      showCancelButton: true, 
      confirmButtonText: "Yes, change it!" 
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/${userId}`, { role: newRole }); 
        if (res.data.modifiedCount > 0) { 
          toast.success("Role updated successfully!"); refetch(); } 
        }
    })
  }

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">User Management ({users.length})</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead><tr><th>#</th><th>Profile</th><th>Role</th><th>Role Update</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar"><div className="mask mask-squircle h-12 w-12"><img src={user?.photoURL || "https://img.daisyui.com/images/profile/demo/2@94.webp"} alt="User Avatar" /></div></div>
                    <div><div className="font-bold">{user?.displayName}</div><div className="text-sm opacity-50">{user?.email}</div></div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td><select defaultValue={user.role} onChange={(e) => handleRoleUpdate(user._id, e.target.value)} className="select select-sm"><option value="Student">Student</option><option value="Tutor">Tutor</option><option value="Admin">Admin</option></select></td>
                <td>{user.status}</td>
                <td className="flex gap-2">
                  <button onClick={() => { setSelectedUser(user); UpdateModalRef.current.showModal(); }} className="btn btn-sm btn-warning flex items-center gap-1"><FaEdit /> Update</button>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-error flex items-center gap-1"><FaTrash /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={UpdateModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-[1.5rem] text-center">Update User</h3>
          {selectedUser && (
            <form onSubmit={(e) => handleUpdateSubmit(e, selectedUser)} className="space-y-3 mt-4">
              <label className="label">Name</label><input name="displayName" type="text" value={selectedUser.displayName || ""} onChange={(e) => setSelectedUser({ ...selectedUser, displayName: e.target.value })} className="input w-full" required />
              <label className="label">Email</label><input name="email" type="email" value={selectedUser.email || ""} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} className="input w-full" required />
              <label className="label">Photo URL</label><input name="photoURL" type="text" value={selectedUser.photoURL || ""} onChange={(e) => setSelectedUser({ ...selectedUser, photoURL: e.target.value })} className="input w-full" />
              <label className="label">Phone</label><input name="phone" type="text" value={selectedUser.phone || ""} onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })} className="input w-full" />
              <label className="label">Status</label>
                <select name="status" value={selectedUser.status || ""} onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })} className="select w-full">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold shadow-md mt-3 flex items-center justify-center gap-2"><FaSync /> Save Changes</button>
            </form>
          )}
          <div className="modal-action"><form method="dialog" className="w-full"><button className="w-full bg-indigo-100 text-gray-800 py-2 rounded-lg hover:bg-indigo-200 transition duration-300 font-semibold shadow-md">Cancel</button></form></div>
        </div>
      </dialog>
    </div>
  );
};

export default UserManagement;