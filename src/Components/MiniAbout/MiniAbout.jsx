import image from '../../assets/home/chef-service.jpg'
const MiniAbout = () => {
    return (
        <div className="relative mb-20">
            <img src={image} alt="" className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="w-11/12 sm:w-3/4 md:w-2/3 h-auto bg-white p-4 sm:p-6 md:p-8 shadow-lg z-10 rounded-sm">
                    {/* Add your content here */}
                    <p className="text-lg sm:text-xl md:text-3xl uppercase text-black mb-3 font-semibold">Bistro Boss</p>
                    <p className="text-sm sm:text-base md:text-lg text-black">
                        Welcome to our restaurant, where culinary excellence meets a warm and inviting atmosphere. We take pride in serving dishes crafted with the freshest ingredients and infused with love and creativity. Whether you're here for a family dinner, a celebration, or a quick bite, our menu is designed to delight every palate. Join us for an unforgettable dining experience that combines exceptional flavors with top-notch service.
                    </p>
                </div>
            </div>
        </div>

    );
};

export default MiniAbout;