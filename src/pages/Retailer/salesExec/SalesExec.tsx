import React from 'react'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import SalesList from '../../../components/Retailer/salesExec/Sales.Exec'
import Header from '../../../components/header/Header'

function SalesExec() {
  return (

  <div>
    <Header/>
      <div className='bg-red-50/40 min-h-screen flex pt-24'>
      <RetailerMenu/>
      <SalesList/>
    
    </div>
  </div>
  )
}

export default SalesExec