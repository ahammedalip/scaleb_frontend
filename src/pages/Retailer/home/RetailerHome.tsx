import React from 'react'
import {jwtDecode} from 'jwt-decode'
import HomeRetailer from '../../../components/Retailer/home/Home.retailer'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
function RetailerHome() {

  // const token = localStorage.getItem('access_token1');
  // const decodedToken = token ? jwtDecode(token) : null;

  // // Extract the required fields from the decoded token
  // const validUser = decodedToken?.validUser
  // console.log('valid user', validUser);

  return (
    <div className='bg-red-50/40 min-h-screen pt-20'>
      <RetailerMenu/>
        <HomeRetailer/>
    </div>
  )
}

export default RetailerHome