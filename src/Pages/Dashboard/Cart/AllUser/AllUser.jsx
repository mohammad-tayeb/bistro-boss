import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAuth from "../../../../Hooks/UseAuth";

const AllUser = () => {
    //axios secure
    const axiosSecure = useAxiosSecure()
    //tanstack query
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    //tanstack query

    //make admin functionality
    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Admin Assigned!",
                    text: "",
                    icon: "success"
                });
                axiosSecure.patch(`/users/admin/${id}`)
                    .then(res => {
                        console.log(res.data)
                        refetch()
                    })
            }
        });
    }
    //make admin functionality

    //delete function
    const handleDeleteUser = id => {
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
                axiosSecure.delete(`/users/${id}`)
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
            <h2 className="mt-10 ms-32 md:text-2xl font-bold text-black">Total User: {users.length}</h2>
            {/* Data Table */}
            <div className="overflow-x-auto md:mx-32 mt-3 text-black mx-2 mb-10">
                {users.length === 0 ? (
                    <div className="text-center py-5 font-semibold text-gray-500">
                        No User Found!
                    </div>
                ) : (
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr className="text-black bg-yellow-500">
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ? <>
                                                <p className="text-yellow-600 font-bold text-center">Admin</p>
                                            </> : <>
                                                <button
                                                    className="text-xs font-mono btn btn-ghost bg-yellow-600"
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                >
                                                    Make Admin
                                                </button>
                                            </>
                                        }

                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-ghost"
                                            onClick={() => handleDeleteUser(user._id)}
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

export default AllUser;