import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCarts from "../../../Hooks/useCarts";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCarts()
    const [isAdmin] = useAdmin()
    const navLinks = (
        <>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "font-bold text-white bg-yellow-500" : "text-white"
                    }
                    to="/"
                >
                    HOME
                </NavLink>
            </li>
            <li>
                {
                    user && isAdmin && <NavLink
                        className={({ isActive }) =>
                            isActive ? "font-bold text-white bg-yellow-500" : "text-white"
                        }
                        to="/dashboard/adminHome"
                    >
                        ADMIN DASHBOARD
                    </NavLink>
                }
                {
                    user && !isAdmin && <NavLink
                        className={({ isActive }) =>
                            isActive ? "font-bold text-white bg-yellow-500" : "text-white"
                        }
                        to="/dashboard/userHome"
                    >
                        USER DASHBOARD
                    </NavLink>
                }
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "font-bold text-white bg-yellow-500" : "text-white"
                    }
                    to="/shop"
                >
                    OUR SHOP
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "font-bold text-white bg-yellow-500" : "text-white"
                    }
                    to="/menu"
                >
                    OUR MENU
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "font-bold text-white bg-yellow-500" : "text-white"
                    }
                    to="/contact-us"
                >
                    CONTACT US
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="fixed z-20 navbar bg-base-100 text-white bg-opacity-60 max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {navLinks}
                    </ul>
                </div>
                <div className="flex flex-col items-center">
                    <a className="btn btn-ghost text-xl font-bold">Bistro Boss</a>
                    <p className="text-sm font-semibold -mt-4 spaced-text ms-1 mb-1">
                        Restuarent
                    </p>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>
            <div className="navbar-end">
                {user && (
                    <div className="flex flex-row items-center justify-center">
                        <button className="btn h-8 w-32 bg-opacity-60 border-0 me-5 text-white">
                            <FaShoppingCart className="me-3" />
                            <div className="badge badge-primary"><Link to="/dashboard/cart">+{cart.length}</Link></div>
                        </button>
                        <p className="text-xs me-2 text-yellow-500 font-bold">{user.displayName}</p>
                        <div className="avatar">
                            <div className="w-7 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </div>
                    </div>
                )}
                {user ? (
                    <div className="btn text-white btn-ghost font-bold">
                        <Link onClick={logOut}>Log Out</Link>
                    </div>
                ) : (
                    <Link className="btn text-white btn-ghost font-bold" to="/login">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
