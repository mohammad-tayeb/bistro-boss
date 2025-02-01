import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-warning"></span></div>
    }
    if (user && isAdmin) {
        return children
    }

    return <Navigate state={location.pathname} to="/"></Navigate>
};

export default AdminRoute;