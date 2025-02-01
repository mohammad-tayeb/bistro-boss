import { useEffect, useState, useRef } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
//rating
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
//react icon
import { FaQuoteLeft } from "react-icons/fa";


const Testimonial = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <div className="md:mx-28">
            <SectionTitle
                heading={'---What Our Clients Say---'}
                subHeading={'TESTIMONIALS'}
            ></SectionTitle>
            {/* reviews */}
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper mt-8 mb-20">
                {
                    reviews.map(review =>
                        <SwiperSlide key={review._id}>
                            <div className="md:px-24 px-12 flex flex-col items-center text-center">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <FaQuoteLeft className="mt-5 text-6xl text-gray-900"/>
                                <p className="text-black mt-4">{review.details}</p>
                                <p className="text-yellow-500 text-2xl uppercase font-semibold mt-2">{review.name}</p>
                            </div>
                        </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;