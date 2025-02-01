import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import bg from '../../assets/home/banner.jpg'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignIn = () => {
    const axiosPublic = useAxiosPublic() //hook
    const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
    const location = useLocation(); // Move this hook to the top level
    const navigate = useNavigate(); // Move this hook to the top level

    //signin function
    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoURL = form.photoURL.value;

        // // Password validation
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        // if (!passwordRegex.test(password)) {
        //     alert(
        //         'Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
        //     );
        //     return;
        // }
        // // Password validation

        //crate user using firebase
        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                const currentUser = result.user;
                setUser(currentUser);
                //update user to firebase
                updateUserProfile({ name, photo: photoURL })
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email
                        }
                        //sending data to mongoDB
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log(res)
                                if (res.data.insertedId) {
                                    //sweetalert
                                    Swal.fire({
                                        title: "Successfully Signed Up!",
                                        icon: "success",
                                        draggable: true
                                    });
                                    //sweetalert
                                    navigate(location.state ? location.state : "/"); // Navigate to the target route
                                }
                            })
                             //sending data to mongoDB
                    })
                    .catch((error) => { console.log(error); });
                    //update user to firebase
            })
            .catch((error) => {
                console.error('Sign-up failed:', error.message);
                alert(error.message); // Display error to the user
            });
        //crate user using firebase
    };
    //signin function

    return (
        <div className="hero bg-gray-100 min-h-screen">
            {/* page tittle changing using helmet */}
            <Helmet>
                <title>Sign Up | Bistro Boss</title>
            </Helmet>
            {/* page tittle changing using helmet */}
            <div className="hero-content flex-col w-full" style={{ backgroundImage: `url(${bg})` }}>
                <h1 className="font-bold text-3xl text-white">Welcome To Bistro Boss!<br /></h1>
                <h1 className='text-yellow-500 font-bold text-2xl -mt-4'>Sign Up</h1>
                <div className="card max-w-lg shrink-0 shadow-2xl w-full bg-slate-200">
                    <form className="card-body" onSubmit={handleSignIn}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Photo URL</span>
                            </label>
                            <input name="photoURL" type="url" placeholder="photo url" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-black">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline bg-yellow-600 text-white hover:text-white hover:bg-yellow-500">Sign In</button>
                        </div>
                        <p className="text-center mb-5">Already have an account? <span className="text-yellow-600 font-semibold"><Link to="/login">Login</Link></span></p>
                        <SocialLogin></SocialLogin>
                    </form>
                   
                </div>
            </div>
        </div>
    );
};

export default SignIn;
