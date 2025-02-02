import { RiDeleteBin6Fill } from "react-icons/ri";
import useCarts from "../../../Hooks/useCarts";
import foodicon from '../../../assets/home/foodicon.jpg';
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCarts();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        // Sweet Alert for confirmation
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <>
            <div className="md:mx-32 mx-5 mt-20 flex md:flex-row flex-col md:space-y-0 space-y-2 justify-between items-center">
                <h2 className="md:text-2xl font-bold text-black">Total Order: {cart.length}</h2>
                <h2 className="md:text-2xl font-bold text-black">Total Price: ${totalPrice.toFixed(2)}</h2>
               {
                cart.length != 0?  <Link to="/dashboard/payment" className="btn btn-sm bg-yellow-500 text-white border-0">Pay</Link> :  <Link to="/shop" className="btn btn-sm bg-yellow-500 text-white border-0">Add Items</Link>
               }
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto md:mx-32 mt-3 text-black mx-2">
                {cart.length === 0 ? (
                    <div className="text-center py-5 font-semibold text-gray-500">
                        No items in the cart.
                    </div>
                ) : (
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr className="text-black bg-yellow-500">
                                <th>No</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-10 w-10 me-2">
                                                    <img
                                                        src={foodicon}
                                                        alt="Food Icon"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <th>
                                        <button
                                            className="btn btn-ghost"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <RiDeleteBin6Fill className="text-2xl text-red-600" />
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Cart;
