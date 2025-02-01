import { useInView } from 'react-intersection-observer';
import featuredImage from '../../../assets/home/featured.jpg';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useState } from 'react';

const Featured = () => {
    //animation
    const { ref, inView } = useInView({
        triggerOnce: false, // Allows the animation to trigger multiple times
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    const [isAnimated, setIsAnimated] = useState(false);

    if (inView && !isAnimated) {
        setIsAnimated(true); // Trigger animation when in view
    } else if (!inView && isAnimated) {
        setIsAnimated(false); // Reset animation when out of view
    }


    return (
        <div className="relative mb-20">
            {/* Background Image with opacity */}
            <img src={featuredImage} alt="" className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center text-center bg-black opacity-50 z-0"></div>

            {/* Content Div - Above the Background */}
            <div ref={ref} className={`absolute inset-0 flex flex-col items-center justify-center text-center z-10 ${isAnimated ? "animate-fade-up" : ""}`}>
                <div className='md:w-full w-1/2'>
                    <SectionTitle
                        heading={'---Check it out---'}
                        subHeading={'FROM OUR MENU'}
                        textWhite={true}
                        textXSmall={true}>
                    </SectionTitle>
                </div>

                <div className="z-10 flex flex-col md:flex-row items-center justify-center mx-20">
                    <img src={featuredImage} alt="" className="md:w-2/3 md:h-2/3 w-1/3 h-1/3 md:me-5 mb-2 md:mb-0" />
                    <div className="text-white md:text-start text-center">
                        <h1 className='md:text-2xl text-xs'>MARCH 20, 2023</h1>
                        <h1 className='md:text-2xl font-bold text-xs'>WHERE CAN I GET SOME?</h1>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button
                            className={`md:p-1 p-2 text-center border-b-4 rounded-lg block mt-5 md:mt-5 uppercase font-bold md:text-1xl text-xs md:mx-0 mx-auto text-black md:text-white hover:border-orange-400 ${isAnimated ? "animate-fade-up" : ""
                                }`}
                        >
                            Read more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
