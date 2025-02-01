import foodIcon from '../../../assets/home/foodicon.jpg' 
const MenuItem = ({ item }) => {
    const { name, recipe, price, image } = item
    return (
        <div className="flex items-center border-b border-gray-200 py-4">
            {/* Left Icon/Shape */}
            <img src={foodIcon} alt="Icon" className="w-12 h-12 rounded-md" />

            {/* Text Content */}
            <div className="flex-1 px-4">
                {/* Title and Price */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-800">
                       {name}
                    </h3>
                    <span className="text-yellow-600 font-bold text-md">{price}</span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mt-1">
                    {recipe}
                </p>
            </div>
        </div>
    );
};

export default MenuItem;