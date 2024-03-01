import React from 'react'
import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import ProductionList from '../../components/Sales/ProductionList/ProductionList'

function SalesProd() {
  return (
    <div>
        <Header/>
        <div className='bg-red-50/40 flex space-x-4 pt-20 min-h-screen'>
            <SalesMenu/>
            <ProductionList/>

        </div>
    </div>
  )
}

export default SalesProd