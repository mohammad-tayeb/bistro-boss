import { useContext } from "react";
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    //google login functionality
    const handleGoogleLogin = () => {
        //google login function
        googleSignIn()
            .then(result => {
                //user information
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                }
                //user information
                //send data to DB through server using axios
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.data)
                })
                //send data to DB through server using axios
                if (result.user.email) {
                    //sweetalert
                    Swal.fire({
                        title: "Successfullly Logged In!",
                        icon: "success",
                        draggable: true
                    });
                    //sweetalert
                    navigate("/")
                }
            })
            .catch(error => {
                console.log(error)
            })
        //google login function
    }
    //google login functionality
    return (
        <div>
            <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full max-w-xs mx-auto py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow hover:shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
                <FcGoogle className="text-2xl mr-2" />
                <span className="text-sm font-medium">Login with Google</span>
            </button>
            <button
                // onClick={handleTwitterLogin}
                className="mt-3 flex items-center justify-center w-full max-w-xs mx-auto py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-200"
            >
                <FaTwitter className="text-2xl mr-2" />
                <span className="text-sm font-medium">Login with Twitter</span>
            </button>
        </div>
    );
};

export default SocialLogin;