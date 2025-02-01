import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = UseAuth()  //get the user from AuthProvider
    const axiosSecure = useAxiosSecure()  //call axios secure
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],  //user?.email → The logged-in user's email and 'isAdmin' → A descriptive string to identify that this query
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)//user email wise backend theke data nibe
            console.log(res.data)
            return res.data?.admin
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;