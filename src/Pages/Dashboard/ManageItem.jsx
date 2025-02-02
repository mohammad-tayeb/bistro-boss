import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { RiDeleteBin6Fill } from "react-icons/ri";
import foodIcon from '../../assets/home/foodicon.jpg'
import UseAuth from "../../Hooks/UseAuth";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ManageItem = () => {
    const { setLoading } = UseAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosPublic()
      //tanstack query
      const { data: menuItem = [], refetch, isPending: loading } = useQuery({
        queryKey: ['menuItem'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu')
            return res.data;
        }
    })
    //tanstack query

    //delete function
    const handleDeleteMenuItem = id => {
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
                axiosSecure.delete(`/menu/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    //delete function

    return (
        <>
            <SectionTitle heading={'---Hurry Up!---'} subHeading={'MANAGE ALL ITEMS'}></SectionTitle>
            <div className="md:mx-32 mx-5 mt-20 flex md:flex-row flex-col md:space-y-0 space-y-2 justify-between items-center">
                {/* <h2 className="md:text-2xl font-bold text-black">Total Price: ${totalPrice.toFixed(2)}</h2> */}
                {/* <button className="btn btn-sm bg-yellow-500 text-white border-0">Pay</button> */}
            </div>
            {/* Data Table */}
            <h1>{menuItem.length}</h1>
            <div className="overflow-x-auto md:mx-32 -mt-16 text-black mx-2  mb-10">
                {menuItem.length === 0 ? (
                    <div className="text-center py-5 font-semibold text-gray-500">
                        No User Found!
                    </div>
                ) : (
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr className="text-black bg-yellow-500">
                                <th>No</th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuItem.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td><img src={foodIcon} alt="" className="h-10 w-10" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-ghost btn-sm bg-yellow-600"
                                        // onClick={() => handleMakeAdmin(user._id)}
                                        >
                                           <Link to={`/dashboard/updateItem/${item._id}`}> <FaEdit className=""></FaEdit></Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-ghost"
                                        onClick={() => handleDeleteMenuItem(item._id)}
                                        >
                                            <RiDeleteBin6Fill className="text-2xl text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default ManageItem;