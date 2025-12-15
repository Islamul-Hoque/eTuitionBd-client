import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const OngoingTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: ongoingTuitions = [], isLoading } = useQuery({
        queryKey: ["ongoingTuitions", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/ongoing/${user?.email}`);
        return res.data;
    },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="px-6 md:px-10 py-6 md:py-10">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Ongoing Tuitions ({ongoingTuitions.length})</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Student</th>
                            <th>Schedule</th>
                            <th>Budget</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                <tbody>{ongoingTuitions.map((tuition, index) => (
                    <tr key={tuition._id}>
                        <td>{index + 1}</td>
                        <td>{tuition.tuitionSubject}</td>
                        <td>{tuition.tuitionClass}</td>
                        <td>{tuition.studentName}</td>
                        <td>{tuition.schedule}</td>
                        <td>{tuition.expectedSalary} Tk</td>
                        <td> <span className="badge badge-success">{tuition.status}</span></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default OngoingTuitions;
