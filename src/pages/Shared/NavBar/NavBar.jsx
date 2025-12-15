import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../Components/Loading/Loading';

const NavBar = () => {
    const { user, loading, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
        .then()
        .catch(error => {
            console.log(error)
        })
    }
    const activeClass = ({ isActive }) => isActive
        ? "bg-indigo-100 text-indigo-600 px-3 py-1 rounded-md font-semibold"
        : "text-gray-700 hover:text-indigo-500 px-3 py-1 rounded-md";

    const links = <>
        <li><NavLink className={activeClass} to="/">Home</NavLink></li>
        <li><NavLink className={activeClass} to="/all-tuitions">Tuitions</NavLink></li>
        <li><NavLink className={activeClass} to="/all-tutors">Tutors</NavLink></li>
        <li><NavLink className={activeClass} to="/about">About</NavLink></li>
        <li><NavLink className={activeClass} to="/contact">Contact</NavLink></li>

        {
            user && <>
                <li><NavLink className={activeClass} to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>

    return (
        <div className="px-6 md:px-10  navbar bg-indigo-50 text-gray-800 sticky z-50 top-0 shadow">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul  tabIndex="-1" className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"> {links} </ul>
                </div>
                <span ><Logo/> </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1"> {links} </ul>
            </div>
            <div className="navbar-end">

            {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full"> 
                                <img src=
                                {user?.photoURL ||  user?.providerData?.[0]?.photoURL || "https://i.ibb.co.com/RTyj1cSs/1559144-200.png"} 
                                // {user && user.photoURL ||  user.providerData?.[0]?.photoURL ? user.photoURL ||  user.providerData?.[0]?.photoURL : "https://i.ibb.co.com/RTyj1cSs/1559144-200.png"}
                                alt="" /> </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>{user?.displayName || user?.providerData?.[0]?.displayName || "User"}</a></li>
                            <li><a>{user?.email || user?.providerData?.[0]?.email}</a></li>
                            <li><Link onClick={handleLogOut} className="text-red-600 hover:bg-red-50">Logout</Link></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="btn btn-outline btn-sm text-indigo-500 border-indigo-500 hover:bg-indigo-50">Login</Link>
                        <Link to="/register" className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Register</Link>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default NavBar;