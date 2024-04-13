import { jwtDecode } from 'jwt-decode'
import { Navigate, Outlet } from 'react-router-dom';

interface JwtPayload {
  id: string;
  role: string; // Add the role property
}


function ProductionPrivateRoutes() {
    const token = localStorage.getItem('production_token')
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token); // Decode the token with JwtPayload type
      if (decodedToken?.role === "productionAdmin") {
        return <Outlet />;
      }
    }
  return <Navigate to='/production/login' />
}

export default ProductionPrivateRoutes