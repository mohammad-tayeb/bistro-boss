import { useState } from "react";
import { useInView } from "react-intersection-observer";

const ContactUs = () => {
      // animation state managing
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
        <div className="bg-gray-800 w-full h-72 flex justify-center items-center mb-24">
            <p ref={ref} className={`uppercase text-3xl md:text-5xl font-bold text-white ${isAnimated ? "animate-fade-up" : ""}`}>Call Us: +88 0192345678910</p>            
        </div>
    );
};

export default ContactUs;