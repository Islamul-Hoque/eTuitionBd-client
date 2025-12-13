import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../Components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import TutorDashboardHome from './TutorDashboardHome';
import StudentDashboardHome from './StudentDashboardHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading/>
    }
    if (role === 'Admin') {
        return <AdminDashboardHome/>
    }
    else if (role === 'Tutor') {
        return <TutorDashboardHome/>
    }
    else {
        return <StudentDashboardHome/>
    }
};

export default DashboardHome;