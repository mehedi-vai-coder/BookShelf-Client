import React from 'react';
import BookshelfBanner from './BookshelfBanner';
import BookFeatures from './BookFeatures';
import Testimonial from './Testimonial';
import HeroSection from './HeroSection';
import PopularBooks from './PopularBooks';
import FeaturedCategories from './FeaturedCategories';
import Slider from './Slider'

const Home = () => {
    return (
        <div>
            <BookshelfBanner></BookshelfBanner>
             <Slider></Slider>
            <PopularBooks></PopularBooks>
            <FeaturedCategories></FeaturedCategories>
            <BookFeatures></BookFeatures>
            <HeroSection> </HeroSection>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;