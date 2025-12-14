import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const StudentDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = { totalPosts: 0, approved: 0, pending: 0, rejected: 0 } } = useQuery({
    queryKey: ['studentStats', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student/stats/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email ,
  });

  return (
    <div className="px-6 md:px-14 py-10">
      <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
        Student Dashboard
      </h2>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Tuition Posts */}
        <div className="bg-indigo-50 shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            Total Tuition Posts
          </h3>
          <p className="text-3xl font-bold text-indigo-700">{stats.totalPosts}</p>
        </div>

        {/* Approved Tuitions */}
        <div className="bg-green-50 shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            Approved Tuitions
          </h3>
          <p className="text-3xl font-bold text-green-700">{stats.approved}</p>
        </div>

        {/* Pending Tuitions */}
        <div className="bg-yellow-50 shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-600 mb-2">
            Pending Tuitions
          </h3>
          <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
        </div>

        {/* Rejected Tuitions */}
        <div className="bg-red-50 shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Rejected Tuitions
          </h3>
          <p className="text-3xl font-bold text-red-700">{stats.rejected}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;