import React from 'react';



import Forbidden from '../components/Forbidden/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../Components/Loading/Loading';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading/>
    }

    if (role !== 'Admin') {
        return <Forbidden/>
    }

    return children;
};

export default AdminRoute;