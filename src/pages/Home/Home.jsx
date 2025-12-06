import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import Testimonial from './testimonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <HowItWorks></HowItWorks>
            <Testimonial></Testimonial>
            
        </div>
    );
};

export default Home;