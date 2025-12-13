import { useQuery } from '@tanstack/react-query';
import React from 'react';
// import { Legend, Pie, PieChart, Tooltip, Cell } from 'recharts';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: adminStats = { userStats: [], roleStats: [], tuitionStats: [] } } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    },
  });

  // Pie chart data
  const getPieChartData = (data) =>
    data.map((item) => ({
      name: item._id,
      value: item.count,
    }));

  // Custom colors for tuition status
  const COLORS = {
    Approved: '#6D28D9', // Indigo
    Pending: '#FBBF24',  // Amber
    Rejected: '#EF4444', // Red
  };

  // Total users count
  const totalUsers = adminStats.userStats.reduce(
    (sum, stat) => sum + stat.count,
    0
  );
const totalRoleUsers = adminStats.roleStats.reduce(
  (sum, stat) => sum + stat.count,
  0
);
const combinedData = [
  // User Status
  ...adminStats.userStats.map(stat => ({
    name: `${stat._id} Users`, // e.g. "Active Users"
    value: stat.count
  })),

  // User Roles
  ...adminStats.roleStats.map(stat => ({
    name: stat._id === 'Student' ? 'Students' : stat._id + 's', // pluralize
    value: stat.count
  })),

  // Tuition Status
  ...adminStats.tuitionStats.map(stat => ({
    name: `${stat._id} Posts`, // e.g. "Approved Posts"
    value: stat.count
  }))
];

  return (
    <div className="px-6 md:px-14 py-10">
      <h2 className="text-4xl font-bold text-indigo-600 mb-8 text-center">
        Admin Dashboard Overview
      </h2>

{/* Stats in one row */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
  {/* User Stats */}
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h3 className="text-2xl font-semibold text-indigo-500 mb-4">
      User Stats
    </h3>
    <p className="text-gray-600 mb-2">
      Total Users:{' '}
      <span className="font-bold text-indigo-600">{totalUsers}</span>
    </p>
    <div className="stats stats-horizontal">
      {adminStats.userStats.map((stat) => (
        <div key={stat._id} className="stat">
          <div className="stat-title">{stat._id}</div>
          <div className="stat-value text-indigo-600">{stat.count}</div>
        </div>
      ))}
    </div>
  </div>

  {/* User Roles */}
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h3 className="text-2xl font-semibold text-indigo-500 mb-4">
      User Roles
    </h3>
      <p className="text-gray-600 mb-2">
    Total Role Users:{' '}
    <span className="font-bold text-indigo-600">{totalRoleUsers}</span>
  </p>
    <div className="stats stats-horizontal">
      {adminStats.roleStats.map((stat) => (
        <div key={stat._id} className="stat">
          <div className="stat-title">{stat._id}</div>
          <div className="stat-value text-indigo-600">{stat.count}</div>
        </div>
      ))}
    </div>
  </div>

  {/* Tuition Post Stats */}
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h3 className="text-2xl font-semibold text-indigo-500 mb-4">
      Tuition Post Stats
    </h3>
      <p className="text-gray-600 mb-2">
    Total Tuition Posts:{' '}
    <span className="font-bold text-indigo-600">{adminStats.totalTuitions}</span>
  </p>
    <div className="stats stats-horizontal">
      {adminStats.tuitionStats.map((stat) => (
        <div key={stat._id} className="stat">
          <div className="stat-title">{stat._id}</div>
          <div className="stat-value text-indigo-600">{stat.count}</div>
        </div>
      ))}
    </div>
  </div>
</div>


      {/* Pie Chart */}
<div className="bg-white shadow-lg rounded-xl p-6  mx-auto">
  <h3 className="text-xl font-semibold text-indigo-500 mb-4 text-center"> Platform Distribution Overview
  </h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={combinedData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>

  );
};

export default AdminDashboardHome;
