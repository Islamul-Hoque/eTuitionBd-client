import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../components/Forbidden/Forbidden';

const TutorRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || !user || roleLoading) {
        return <Loading/>
    }

    if (role !== 'Tutor') {
        return <Forbidden/>
    }

    return children;
};

export default TutorRoute;