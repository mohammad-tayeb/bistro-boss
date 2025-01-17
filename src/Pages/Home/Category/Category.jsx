// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import s1 from '../../../assets/home/slide1.jpg'
import s2 from '../../../assets/home/slide2.jpg'
import s3 from '../../../assets/home/slide3.jpg'
import s4 from '../../../assets/home/slide4.jpg'
import s5 from '../../../assets/home/slide5.jpg'

// import required modules
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
const Category = () => {
    return (
        <section>
            <SectionTitle 
            heading={"---From 11:00am to 10:00pm---"}
            subHeading={"ORDER ONLINE"}
            >
            </SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper my-20"
            >
                <SwiperSlide>
                    <img src={s1} alt="" />
                    <h3 className='uppercase text-white -mt-28 font-semibold text-center text-2xl'>salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={s2} alt="" />
                    <h3 className='uppercase text-white -mt-28 font-semibold text-center text-2xl'>pizza</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={s3} alt="" />
                    <h3 className='uppercase text-white -mt-28 font-semibold text-center text-2xl'>salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={s4} alt="" />
                    <h3 className='uppercase text-white -mt-28 font-semibold text-center text-2xl'>salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={s5} alt="" />
                    <h3 className='uppercase text-white  font-semibold text-center text-2xl'>salads</h3>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;