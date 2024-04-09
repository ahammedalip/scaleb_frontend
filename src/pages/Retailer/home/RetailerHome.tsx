import React from 'react'
import { jwtDecode } from 'jwt-decode'
import HomeRetailer from '../../../components/Retailer/home/Home.retailer'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import Header from '../../../components/header/Header'
function RetailerHome() {



  return (
    <>
      <Header />
      <div className='bg-red-50/40 min-h-screen pt-20 flex space-x-5'>
        <div className='w-1/5'>
          <RetailerMenu />
        </div>
        <div className='w-9/12'>
          <HomeRetailer />

        </div>
      </div>
    </>
  )
}

export default RetailerHome