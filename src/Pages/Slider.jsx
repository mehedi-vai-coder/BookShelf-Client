import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from '../assets/slider2.jpg';
import bannerImg2 from '../assets/slider3.jpg';
import bannerImg3 from '../assets/slider4.jpg';
import bannerImg4 from '../assets/slider5.jpg';

const Slider = () => {
    return (
        
        <div className="mt-10 px-4">
            <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl">
                {/* exploring carousel  */}
                <Carousel
                    autoPlay
                    infiniteLoop
                    interval={4000}
                    transitionTime={1000}
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={true}
                    stopOnHover={true}
                    swipeable={true}
                    emulateTouch={true}
                    dynamicHeight={false}
                >
                    {[bannerImg1, bannerImg2, bannerImg3, bannerImg4].map((img, index) => (
                        <div key={index}>
                            <img
                                src={img}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Slider;
