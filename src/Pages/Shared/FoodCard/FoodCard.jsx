import { useLocation, useNavigate } from 'react-router-dom';
import recFoodImage from '../../../assets/menu/pizza-bg.jpg'
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCarts from '../../../Hooks/useCarts';
// import axios from 'axios';

const FoodCard = ({ item }) => {
    const { name, image, price, _id } = item
    // const location = useLocation()
    // const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth()
    const [cart, refetch] = useCarts()  //changes
    const handleAddToCart = () => {
        if (user && user.email) {
            // send data to cart
            console.log(user.email)
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        alert(`${name} added to Cart`)
                        // refetch the cart
                        refetch()  //changes
                    }
                })
        }
        else {
            alert('login please!!')
        }
    }
    return (
        <div className="card bg-gray-100 w-96 shadow-xl mb-10 md:mb-0">
            <figure>
                <img
                    src={recFoodImage}
                    alt="Shoes"
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center text-black">
                <h2 className="card-title">{name}</h2>
                <p className="text-yellow-500 font-bold text-2xl">${price}</p>
                <div className="card-actions">
                    <button onClick={handleAddToCart} className=" mt-2 btn border-yellow-500 hover:bg-yellow-400 hover:text-white btn-ghost bg-yellow-500 uppercase font-bold">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;