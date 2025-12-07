import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/Shared/NavBar/NavBar';
import Footer from '../pages/Shared/Footer/Footer';


const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayout;