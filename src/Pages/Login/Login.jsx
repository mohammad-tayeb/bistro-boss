
import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import bg from '../../assets/home/banner.jpg'
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
const Login = () => {
    const { loginUser, setUser } = useContext(AuthContext)
    const captchaRef = useRef(null)
    const [disabled, setDisabled] = useState(true) ////////////
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        loginUser(email, password)
            .then(result => {
                console.log(result.user)
                const currentUser = result.user
                setUser(currentUser)
                Swal.fire({
                    title: "Successfullly Logged In!",
                    icon: "success",
                    draggable: true
                });
            })
            .catch((error) => {
                console.error("Login failed:", error.message);
                Swal.fire({
                    title: "Incorrect User Name or Passeword",
                    icon: "error",
                    draggable: true
                });
            });
            navigate(location.state ? location.state : "/")

    }

    const handleValidateCaptcha = (e) => {
        e.preventDefault()
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
        else {
            alert('captcha did not matched')
            setDisabled(true)
        }
    }
    return (
        <div className="hero bg-gray-100 min-h-screen ">
            {/* page tittle changing using helmet */}
            <Helmet>
                <title>Login | Bistro Boss</title>
            </Helmet>
            {/* page tittle changing using helmet */}
            <div className="hero-content flex-col w-full" style={{
                backgroundImage: `url(${bg})`,
            }}>
                <h1 className="font-bold text-3xl text-white">Welcome To Bistro Boss!<br /></h1>
                <h1 className='text-yellow-500 font-bold text-2xl -mt-4'>Login</h1>
                <div className="card max-w-lg shrink-0 shadow-2xl w-full bg-slate-200 ">
                    <form onSubmit={handleLogin} className="card-body">
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-black">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input required ref={captchaRef} name="captcha" type="text" placeholder="Varification Text" className="input input-bordered" />
                            <button onClick={handleValidateCaptcha} className="btn btn-xs w-16 mt-2 text-white hover:bg-green-600 border-0">Validate</button>
                        </div>
                        <div className="form-control mt-6">
                            <button disabled={disabled} className="btn btn-outline bg-yellow-600 text-white hover:text-white hover:bg-yellow-500">Login</button>
                        </div>
                        <p className='text-center'>Do not have an account? <span className='font-semibold text-yellow-500'><Link to="/signin">Sign Up</Link></span></p>
                        <div className="divider">OR</div>
                        <SocialLogin></SocialLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;