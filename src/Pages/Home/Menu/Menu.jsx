import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { useInView } from "react-intersection-observer";

const Menu = () => {
    const [menuItem, setMenuItem] = useState([])
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popular = data.filter(item => item.category === 'popular')
                setMenuItem(popular)
            })
    }, [])

    // animation state managing
    const { ref, inView } = useInView({
        triggerOnce: false, // Allows the animation to trigger multiple times
        threshold: 0.3, // Trigger when 10% of the element is visible
    });

    const [isAnimated, setIsAnimated] = useState(false);

    if (inView && !isAnimated) {
        setIsAnimated(true); // Trigger animation when in view
    } else if (!inView && isAnimated) {
        setIsAnimated(false); // Reset animation when out of view
    }


    return (
        <div ref={ref}>
            <SectionTitle
                heading={'---Check it out---'}
                subHeading={'FROM OUR MENU'}
            ></SectionTitle>

            <div className={`grid grid-cols-1 md:grid-cols-2 w-3/4 mx-auto mt-6 mb-12 gap-10 ${isAnimated ? "animate-fade-up" : ""}`}>
                {
                    menuItem.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <button className={`border-b-4 rounded-lg mx-auto block mb-20 uppercase font-bold text-black hover:border-orange-400 ${isAnimated ? "animate-fade-up" : ""}`}>view full menu</button>
        </div>
    );
};

export default Menu;