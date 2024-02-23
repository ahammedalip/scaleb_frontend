import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function ProductionPrivateRoutes() {
    const navigate = useNavigate()
    console.log('coming here');
    const token = localStorage.getItem('production_token')
    if(token){
        const decodedToken = token? jwtDecode(token): null; 
        console.log('decoded token from production private route', decodedToken);
       if(decodedToken?.role == "productionAdmin"){
        return <Outlet/>
       }
    }
  return <Navigate to='/production/login' />
}

export default ProductionPrivateRoutes