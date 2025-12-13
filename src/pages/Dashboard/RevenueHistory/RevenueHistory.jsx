import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";

const RevenueHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["revenueHistory", user?.email],
        queryFn: async () => { 
            const res = await axiosSecure.get(`/revenue/${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4"> Revenue History </h3>

            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <p className="text-lg font-semibold text-indigo-700"> Total Earnings: {totalEarnings} {payments[0]?.currency?.toUpperCase() || "Tk"} </p>
                <p className="text-sm text-gray-600"> Total Transactions: {payments.length} </p>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Student Email</th>
                            <th>Amount</th>
                            <th>Paid At</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                <tbody>{payments.map((p, index) => (
                    <tr key={p._id}>
                        <td>{index + 1}</td>
                        <td>{p.subject}</td>
                        <td>{p.class}</td>
                        <td>{p.studentEmail}</td>
                        <td>{p.amount} {p.currency.toUpperCase()}</td>
                        <td>{new Date(p.paidAt).toLocaleString()}</td>
                        <td className="font-mono text-sm">{p.transactionId}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default RevenueHistory;