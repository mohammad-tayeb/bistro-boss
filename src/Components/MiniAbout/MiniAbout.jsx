import { useState } from "react";
import { useInView } from "react-intersection-observer";
import image from "../../assets/home/chef-service.jpg";

const MiniAbout = () => {
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
        <div ref={ref} className="relative mb-20">
            <img src={image} alt="" className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className={`w-10/12 sm:w-3/4 md:w-2/3 h-auto bg-white p-3 sm:p-5 md:p-8 shadow-lg z-10 rounded-sm ${
                        isAnimated ? "animate-fade-up" : ""}`}>
                    {/* Add your content here */}
                    <p className="text-base sm:text-xl md:text-3xl uppercase text-black mb-2 font-semibold">
                        Bistro Boss
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-black">
                        Welcome to our restaurant, where culinary excellence meets a warm and inviting atmosphere. We take pride in serving dishes crafted with the freshest ingredients and infused with love and creativity. Whether you're here for a family dinner, a celebration, or a quick bite, our menu is designed to delight every palate. Join us for an unforgettable dining experience that combines exceptional flavors with top-notch service.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MiniAbout;
