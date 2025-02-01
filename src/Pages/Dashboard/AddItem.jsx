import Swal from "sweetalert2";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

//image hosting key and api
const image_hosting_Key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_Key}`

const AddItem = () => {
    const axiosPublic = useAxiosPublic() //to store image in imageBB
    const axiosSecure = useAxiosSecure() //to send data in my database
    const handleAddItem = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const priceS = form.price.value;
        const price = parseFloat(priceS) //convert the price to number
        const details = form.details.value;
        const imgFile = form.img.files[0];

        // Prepare image for upload
        const formData = new FormData();
        formData.append("image", imgFile);
        try {
            // Upload image to imgbb
            const imgRes = await axiosPublic.post(image_hosting_api, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log(imgRes.data)
            if (imgRes.data.success) {
                const imageUrl = imgRes.data.data.url; // Get image URL

                // Create item object
                const itemInfo = { name, category, price, details, imageUrl };

                // Send itemInfo to your database/backend
                const res = await axiosSecure.post("/menu", itemInfo);

                if (res.data.insertedId) {
                    form.reset();
                    Swal.fire({
                        title: "Item Added Successfully",
                        icon: "success",
                        draggable: true
                    });
                }
            } else {
                console.error("Image upload failed", imgRes.data);
            }
        } catch (error) {
            console.error("Error uploading image or item", error);
        }
    };

    return (
        <div className="mb-20 -mt-10">
            <SectionTitle heading={'---What is new?---'} subHeading={'ADD AN ITEM'}></SectionTitle>
            <div className="max-w-xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md mt-5">
                <h2 className=" font-bold mb-4 text-2xl text-center text-black ">Add a New Recipe</h2>
                <form onSubmit={handleAddItem} className="space-y-4">

                    {/* Recipe Name */}
                    <div>
                        <label className="block text-gray-700 font-medium">Recipe name*</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Recipe name"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-yellow-500"
                            required
                        />
                    </div>

                    {/* Category & Price (Flexbox) */}
                    <div className="flex gap-4">
                        {/* Category Dropdown */}
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Category*</label>
                            <select
                                name="category"
                                className="w-full mt-1 p-2 border rounded-md bg-white focus:ring focus:ring-yellow-500"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="dessert">Dessert</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="salad">Salad</option>
                            </select>
                        </div>

                        {/* Price Input */}
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Price*</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-yellow-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div>
                        <label className="block text-gray-700 font-medium">Recipe Details*</label>
                        <textarea
                            name="details"
                            placeholder="Recipe Details"
                            rows="3"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-yellow-500"
                            required
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-gray-700 font-medium">Upload Image*</label>
                        <input
                            name="img"
                            type="file"
                            className="w-full mt-1 p-2 border rounded-md bg-white"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-1/3 bg-yellow-600 text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-yellow-700 transition"
                    >
                        Add Item 🍽️
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddItem;