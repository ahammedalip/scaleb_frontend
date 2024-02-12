import React from 'react'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import SalesList from '../../../components/Retailer/salesExec/Sales.Exec'

function SalesExec() {
  return (
    <div className='bg-red-50/40 min-h-screen flex pt-24'>
      <RetailerMenu/>
      <SalesList/>
    
    </div>
  )
}

export default SalesExec