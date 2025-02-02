import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

//image hosting key and api
const image_hosting_Key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_Key}`


const UpdateItem = () => {
    const item = useLoaderData();
    const axiosPublic = useAxiosPublic(); // For image upload
    const axiosSecure = useAxiosSecure(); // For database update
    const navigate = useNavigate()

    const handleUpdateItem = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const priceS = form.price.value;
        const price = parseFloat(priceS); // Convert price to number
        const details = form.details.value;
        const imgFile = form.img.files[0];

        try {
            let imageUrl = item.imageUrl; // Keep old image if not updated

            if (imgFile) {
                // Prepare image for upload
                const formData = new FormData();
                formData.append("image", imgFile);

                // Upload image to imgbb
                const imgRes = await axiosPublic.post(image_hosting_api, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (imgRes.data.success) {
                    imageUrl = imgRes.data.data.url; // Get new image URL
                } else {
                    console.error("Image upload failed", imgRes.data);
                    return;
                }
            }

            // Create updated item object
            const itemInfo = { name, category, price, details, imageUrl };

            // Update item in database
            const res = await axiosSecure.patch(`/menu/${item._id}`, itemInfo);
            console.log(res.data)

            if (res.data.modifiedCount > 0) {
                form.reset();
                Swal.fire({
                    title: "Item Updated Successfully",
                    icon: "success",
                    draggable: true
                });
                navigate('/dashboard/manageItem')
            } else {
                Swal.fire({
                    title: "No Changes Made",
                    icon: "info",
                    draggable: true
                });
            }
        } catch (error) {
            console.error("Error updating item", error);
            Swal.fire({
                title: "Error Updating Item",
                icon: "error",
                text: error.message,
                draggable: true
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">UPDATE ITEM</h2>
                <form onSubmit={handleUpdateItem}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Recipe name*</label>
                        <input
                            name="name"
                            defaultValue={item.name}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="Recipe name"
                        />
                    </div>

                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-2">Category*</label>
                            <select
                                name="category"
                                defaultValue={item.category}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <option disabled>Category</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Soup">Soup</option>
                                <option value="Salad">Salad</option>
                                <option value="Pizza">Pizza</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-2">Price*</label>
                            <input
                                name="price"
                                defaultValue={item.price}
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                                placeholder="Price"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Recipe Details*</label>
                        <textarea
                            name="details"
                            defaultValue={item.details}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="Recipe Details"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Upload Image*</label>
                        <input
                            name="img"
                            type="file"
                            accept="image/*"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-700 text-white py-2 rounded hover:bg-yellow-800">
                        Update Recipe Details
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
