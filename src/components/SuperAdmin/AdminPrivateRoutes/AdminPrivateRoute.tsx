
import { Navigate, Outlet } from 'react-router-dom';

function AdminPrivateRoute() {
    const token = localStorage.getItem('superAdmin_token');
    
    return token ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default AdminPrivateRoute;
