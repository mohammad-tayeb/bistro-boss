import { FaBook, FaCalendar, FaCalendarCheck, FaHome, FaMoneyBill, FaPhone, FaPlus, FaRegCalendar, FaShoppingCart, FaStar, FaUser } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    //*****************************************/
    const [isAdmin] = useAdmin()
    //*****************************************/
    return (
        <div className="flex">
            {/* side bar */}
            <div className="w-56 min-h-screen bg-orange-400">
                <div className="flex flex-col items-center text-black -mb-5 mt-3">
                    <Link to="/" className="mb-2 text-xl font-bold">Bistro Boss</Link>
                    <Link to="/" className="text-sm font-semibold -mt-4 spaced-text ms-1 mb-1">
                        Restuarent
                    </Link>
                </div>
                <ul className="menu pt-10 ms-3 space-y-1 md:me-4 text-white">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome"><FaHome /> Admin Home </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItem"><FaPlus /> Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItem"><FaBook /> Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageBooking"><FaRegCalendar /> Manage Bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUser"><FaUser /> All Users</NavLink>
                                </li>
                            </> :
                            <>
                                <li>
                                    <NavLink to="/dashboard/home"><FaHome /> User Home </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation"><FaCalendar /> Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory"><FaMoneyBill />Payment History</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart"><FaShoppingCart /> My Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review"><FaStar /> Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booking"><FaCalendarCheck /> Bookings</NavLink>
                                </li>
                            </>
                    }
                    {/* universal links  */}
                    <div className="divider divider-neutral"></div>
                    <li>
                        <NavLink to="/"><FaHome /> Home </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu"><FaBowlFood /> Menu </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu"><FaPhone /> Contact Us </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;