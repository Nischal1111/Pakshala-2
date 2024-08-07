import React from 'react';
import "../Css/lookaround.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

import Img1 from "../assets/Img.jpeg";
import Img2 from "../assets/Img1.jpeg";
import Img3 from "../assets/Img3.jpeg";
import Img4 from "../assets/Img4.jpeg";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

const LookAround = () => {
    const slides = [
        {
            img: Img1,
            title: "Pakshala"
        },
        {
            img: Img2,
            title: "Bar"
        },
        {
            img: Img3,
            title: "Rooftop"
        },
        {
            img: Img4,
            title: "Room"
        }
    ];

    return (
        <div className="container">
            <h1 className="heading">Look Around</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={1}
                coverflowEffect={{
                    rotate: 10,
                    stretch: 50,
                    depth: 100,
                    modifier: 5.5,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Navigation, Autoplay]}
                className="swiper_container"
                speed={1000}
                breakpoints={{
                    // Tablet (768px) and mobile (480px) breakpoints
                    768: {
                        slidesPerView: 1,
                        coverflowEffect: {
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }
                    },
                    480: {
                        slidesPerView: 1,
                        coverflowEffect: {
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2,
                        }
                    }
                }}
            >
                {slides.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img className="swiper-lazy" src={item.img} alt={item.title} loading="lazy" />
                        <p className='slider-title'>{item.title}</p>
                    </SwiperSlide>
                ))}

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <FaArrowAltCircleLeft />
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <FaArrowAltCircleRight />
                    </div>
                </div>
            </Swiper>
        </div>
    );
};

export default LookAround;
