import React from 'react';
import Hero from './Hero/Hero';
import TuitionPosts from './TuitionPosts/TuitionPosts';
import Tutors from './Tutors/Tutors';
import HowItWorks from './HowItWorks/HowItWorks';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div className=''>
            <Hero/>
            <TuitionPosts/>
            <Tutors/>
            <HowItWorks/>
            <WhyChooseUs/>
        </div>
    );
};

export default Home;
