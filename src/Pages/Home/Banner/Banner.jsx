import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../../assets/home/01.jpg'
import banner2 from '../../../assets/home/02.jpg'
import banner3 from '../../../assets/home/03.jpg'
import banner4 from '../../../assets/home/04.jpg'
import banner5 from '../../../assets/home/05.jpg'
import banner6 from '../../../assets/home/06.jpg'

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src={banner1} />
            </div>
            <div>
                <img src={banner2} />
            </div>
            <div>
                <img src={banner3} />
            </div>
            <div>
                <img src={banner4} />
            </div>
            <div>
                <img src={banner5} />
            </div>
            <div>
                <img src={banner6} />
            </div>
        </Carousel>
    );
};

export default Banner;