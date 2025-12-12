import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import Testimonial from './testimonial';
import ProductsSection from './ProductsSection';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductsSection></ProductsSection>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
            <Testimonial></Testimonial>
            
        </div>
    );
};

export default Home;


