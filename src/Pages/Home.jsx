import React from 'react';
import BookshelfBanner from './BookshelfBanner';
import BookFeatures from './BookFeatures';
import Testimonial from './Testimonial';
import HeroSection from './HeroSection';


const Home = () => {
    return (
        <div>
            <BookshelfBanner></BookshelfBanner>
            <BookFeatures></BookFeatures>
            <HeroSection> </HeroSection>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;