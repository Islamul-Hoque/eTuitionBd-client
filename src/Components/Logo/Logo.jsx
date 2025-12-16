import React from 'react';
import logo from '../../assets/eTuitionBD.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link className='flex gap-1 items-center'>
            <img src={logo} className='w-[1.8rem] md:w-[2.9rem]' alt="eTuitionBD logo" />
            <h3 className='text-indigo-600  md:text-[1.8rem] font-bold'>eTuitionBD</h3>
        </Link>
    );
};

export default Logo;