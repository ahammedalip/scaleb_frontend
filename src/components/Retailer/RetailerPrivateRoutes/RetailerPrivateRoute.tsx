import { jwtDecode } from 'jwt-decode'
import { Navigate, Outlet } from 'react-router-dom';

function RetailerPrivateRoute() {
  const token1 = localStorage.getItem('retailer_token')
  
  if(token1){
    const decodedToken: any = token1 ? jwtDecode(token1) : null
    // console.log('decoded from retail admin private route',decodedToken);
    if (decodedToken?.role == 'retailerAdmin') {
    
     return <Outlet/>
    }
  }
  


  // console.log('decoded token from retailer private route', decodedToken);
  return <Navigate to='/retail/login'/>

}

export default RetailerPrivateRoute