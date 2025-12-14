import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import Testimonial from './testimonial';
import ProductsSection from './ProductsSection';
import WhyChooseUs from './WhyChooseUs';
import StatsSection from '../../Components/Shared/StatsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductsSection></ProductsSection>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
            <StatsSection></StatsSection>
            <Testimonial></Testimonial>
            
        </div>
    );
};

export default Home;


