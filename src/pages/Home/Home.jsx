import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import Testimonial from './testimonial';
import ProductsSection from './ProductsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductsSection></ProductsSection>
            <HowItWorks></HowItWorks>
            <Testimonial></Testimonial>
            
        </div>
    );
};

export default Home;