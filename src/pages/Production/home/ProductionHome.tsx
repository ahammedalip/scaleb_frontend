import React from 'react'
import Header from '../../../components/header/Header'
import Productionhome from '../../../components/Production/Home/Production.Home'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'

function ProductionHome() {
  return (
    <div className=''>
      <Header />
      <div className='flex bg-red-50/40 min-h-screen pt-20 space-x-5'>
        <div className='w-1/5'>

          <ProductionMenu />
        </div>
        <Productionhome />
      </div>
    </div>
  )
}

export default ProductionHome