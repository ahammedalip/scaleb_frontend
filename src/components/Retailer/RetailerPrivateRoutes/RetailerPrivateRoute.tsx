import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function RetailerPrivateRoute() {
  const token1 = localStorage.getItem('retailer_token')
  const token2 = localStorage.getItem('retailerSales_token')
  if(token1){
    const decodedToken: any = token1 ? jwtDecode(token1) : null
    // console.log('decoded from retail admin private route',decodedToken);
    if (decodedToken?.role == 'retailerAdmin') {
    
     return <Outlet/>
    }
  }
  if(token2){
    const decodedToken : any =token2? jwtDecode(token2): null;
    // console.log('decoded from retail sales private route ',decodedToken);
    if(decodedToken?.role == 'retailerSales'){
      return <Outlet/>
    }
  }
  

  // console.log('decoded token from retailer private route', decodedToken);
  return <Navigate to='/retail/login'/>

}

export default RetailerPrivateRoute