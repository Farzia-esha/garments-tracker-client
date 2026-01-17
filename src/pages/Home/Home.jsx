import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import Testimonial from './testimonial';
import ProductsSection from './ProductsSection';
import WhyChooseUs from './WhyChooseUs';
import StatsSection from '../../Components/Shared/StatsSection';
import CTASection from './Extra/CTASection';
import FAQSection from './Extra/FAQSection';
import NewsletterSection from './Extra/NewsletterSection';
import CategoriesSection from './Extra/CategoriesSection';
import BlogSection from './Extra/BlogSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductsSection></ProductsSection>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
            <StatsSection></StatsSection>
            <Testimonial></Testimonial>
            <CategoriesSection/>
            <BlogSection />
            <FAQSection />
            {/* <NewsletterSection/> */}
            <CTASection />
            
            
        </div>
    );
};

export default Home;


