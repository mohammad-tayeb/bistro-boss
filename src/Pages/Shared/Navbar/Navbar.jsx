
const Navbar = () => {
    const navLinks = <>
        <li><a className="font-bold text-yellow-400">HOME</a></li>
        <li><a className="font-bold text-white">CONTACT US</a></li>
        <li><a className="font-bold text-white">DASHBOARD</a></li>
        <li><a className="font-bold text-white">OUR MENU</a></li>
        <li><a className="font-bold text-white">OUR SHOP</a></li>
    </>
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
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex flex-col items-center">
                    <a className="btn btn-ghost text-xl font-bold">Bistro Boss</a>
                    <p className="text-sm font-semibold -mt-4 spaced-text ms-1 mb-1">Restuarent</p>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn text-white btn-ghost font-bold">Login</a>
            </div>
        </div>
    );
};

export default Navbar;