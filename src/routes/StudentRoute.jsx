import React from 'react';
import Forbidden from '../components/Forbidden/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../Components/Loading/Loading';

const StudentRoute = ({children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || !user || roleLoading) {
        return <Loading/>
    }

    if (role !== 'Student') {
        return <Forbidden/>
    }

    return children;
};

export default StudentRoute;

