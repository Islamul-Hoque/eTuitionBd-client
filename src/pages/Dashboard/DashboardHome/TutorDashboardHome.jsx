import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const TutorDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email || user?.providerData?.[0]?.email || "";

    const { data: stats = { totalApplications: 0, approvedApplications: 0, pendingApplications: 0, rejectedApplications: 0 } } = useQuery({
        queryKey: ['tutorStats', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor/stats/${email}`);
            return res.data;
        },
        enabled: !!email, 
    });

    return (
        <div className="px-6 md:px-14 py-10">
            <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center"> Tutor Dashboard </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-indigo-50 shadow rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-2"> Total Applications </h3>
                    <p className="text-3xl font-bold text-indigo-700">{stats.totalApplications}</p>
                </div>

                <div className="bg-green-50 shadow rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-green-600 mb-2"> Approved Applications </h3>
                    <p className="text-3xl font-bold text-green-700">{stats.approvedApplications}</p>
                </div>

                <div className="bg-yellow-50 shadow rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-yellow-600 mb-2"> Pending Applications </h3>
                    <p className="text-3xl font-bold text-yellow-700">{stats.pendingApplications}</p>
                </div>

                <div className="bg-red-50 shadow rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">  Rejected Applications </h3>
                    <p className="text-3xl font-bold text-red-700">{stats.rejectedApplications}</p>
                </div>
            </div>
        </div>
    );
};

export default TutorDashboardHome;