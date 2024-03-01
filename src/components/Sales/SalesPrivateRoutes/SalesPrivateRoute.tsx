import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

function SalesPrivateRoute() {
    const navigate = useNavigate()

    const token = localStorage.getItem('retailerSales_token')
    if(token){
        const decodedToken : any =token? jwtDecode(token): null;
        // console.log('decoded from retail sales private route ',decodedToken);
        if(decodedToken?.role == 'retailerSales'){
          return <Outlet/>
        }
      }else{
        navigate('/retail/login')
      }
  
}

export default SalesPrivateRoute