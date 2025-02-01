import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useCarts = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth()  //changes
    const { refetch, data: cart = [] } = useQuery({ //changes
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`) //changes
            return res.data
        }
    })
    return [cart, refetch]  //changes
};

export default useCarts;