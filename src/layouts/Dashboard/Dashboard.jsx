import React from 'react';
import { FaBookOpen, FaChartBar, FaClipboardList, FaGraduationCap, FaMoneyBillWave, FaPlusCircle, FaRegCreditCard, FaSignOutAlt, FaTasks, FaUserEdit, FaUsers } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../../hooks/useRole';
import logo from '../../assets/eTuitionBD.png';
import { FaHome, FaTachometerAlt } from "react-icons/fa";
import { MdDashboard } from 'react-icons/md';

const DashboardLayout = () => {
  const { role } = useRole();


  const activeClass = ({ isActive }) => isActive
    ? "bg-indigo-100 text-indigo-600 px-3 py-1 rounded-md font-semibold"
    : "text-gray-700 hover:text-indigo-500 px-3 py-1 rounded-md";

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-indigo-50 text-gray-800 shadow sticky top-0 z-10 flex justify-between">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <Link to='/' className="font-bold md:text-2xl text-indigo-500">eTuitionBD Dashboard</Link>
        </nav>

        <div className=""> <Outlet /> </div>
      </div>

      <div className="drawer-side  shadow">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col bg-indigo-50 text-gray-800 shadow w-52">
          <ul className="menu p-4 w-full grow">
            <li> <Link to="/" className="flex justify-center mb-4"> <img className="" src={logo} alt="Logo" /> </Link>  </li>

            <li> <NavLink className={activeClass} end to="/dashboard">  <MdDashboard /> <span>Dashboard</span> </NavLink> </li>
            <div className="border-t border-gray-300 my-2"></div>

            {role === 'Student' && (
              <>
                <li><NavLink className={activeClass} end to="/dashboard/my-tuitions"><FaBookOpen /> My Tuitions Post</NavLink></li>
                <li><NavLink className={activeClass} end to="/dashboard/add-tuition"><FaPlusCircle /> Add Tuition</NavLink></li>
                <li><NavLink className={activeClass} end to="/dashboard/applied-tutors"><FaUsers /> Applied Tutors</NavLink></li>
                <li><NavLink className={activeClass} end to="/dashboard/payments"><FaRegCreditCard /> Payment History</NavLink></li>
              </>
            )}

            {role === 'Tutor' && (
              <>
                <li><NavLink className={activeClass} end to="/dashboard/my-applications"><FaClipboardList /> My Applications</NavLink></li>
                <li><NavLink className={activeClass} end to="/dashboard/ongoing-tuitions"><FaTasks /> Ongoing Tuitions</NavLink></li>
                <li><NavLink className={activeClass} end to="/dashboard/revenue-history"><FaMoneyBillWave /> Revenue History</NavLink></li>
              </>
            )}

            {role === 'Admin' && (
              <>
                <li><NavLink className={activeClass} end to="/dashboard/users-management"><FaUsers /> User Management</NavLink></li>
                <li><NavLink className={activeClass} end to="/dashboard/tuition-management"><FaGraduationCap /> Tuition Management</NavLink></li>
                <li><NavLink className={activeClass} end to="/dashboard/reports"><FaChartBar /> Reports & Analytics</NavLink></li>
              </>
            )}

            <div className="border-t border-gray-300 my-2"></div>

            <li> <NavLink className={activeClass} end to="/dashboard/edit-profile"><FaUserEdit /> Edit Profile</NavLink> </li>
            <li> <NavLink className={activeClass} end to="/"> <FaHome /> <span>Back to Home</span> </NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;