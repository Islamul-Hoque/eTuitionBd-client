import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";

const MyTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myTuitions = [], refetch, isLoading, isError } = useQuery({
        queryKey: ["my-tuitions", user?.email],
        queryFn: async () => {
        const res = await axiosSecure.get(`/my-tuitions?email=${user?.email}`);
        return res.data;
    }})

     // delete tuition post
    const handleTuitionsDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tuition/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your tuition post has been deleted.",
                                icon: "success",
                            })
                        }
                    }
                )
            }
        })
    }

    const handlePayment = async (tuition) => {
        const paymentInfo = {
            amount: tuition.budget,   
            tuitionId: tuition._id,   
            studentEmail: tuition.studentEmail,
            subject: tuition.subject
        };

        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
        window.location.assign(res.data.url);
    };

    if (isLoading) return <Loading/>
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4"> My Tuitions ({myTuitions.length}) </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Budget</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTuitions.map((tuition, index) => (
                        <tr key={tuition._id}>
                            <td>{index + 1}</td>
                            <td>{tuition.subject}</td>
                            <td>{tuition.class}</td>
                            <td>{tuition.budget} Tk/Month</td>
                            {/* <td>{tuition.schedule}</td> */}
                            <td>
                                {tuition.paymentStatus === 'paid' ? ( <span className="text-green-800 font-semibold">Paid</span>
                                    ) : (
                                    <button onClick={() => handlePayment(tuition)} className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700"> Pay </button> )}
                            </td>

                            {/* <td>{tuition.studentEmail}</td> */}
                            <td>{tuition.status}</td>
                            <td className="flex gap-2">
                                <Link to={`/tuition-details/${tuition._id}`} className="btn btn-sm btn-info flex items-center gap-1"> <FaEye /> <span>View</span></Link>
                                <button className="btn btn-sm btn-warning flex items-center gap-1"> <FiEdit /> <span>Edit</span> </button>
                                <button onClick={() => handleTuitionsDelete(tuition._id)}  className="btn btn-sm btn-error flex items-center gap-1" > <FaTrashCan /> <span>Delete</span> </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTuitions;