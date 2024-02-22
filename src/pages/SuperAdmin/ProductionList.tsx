import React from 'react'
import Header from '../../components/header/Header'
import Menu from '../../components/SuperAdmin/menu/Menu'
import Productionlist from '../../components/SuperAdmin/ProductionList/ProductionList'

function ProductionList() {
  return (
    <div className=''>
    <Header/>
    <div className='bg-red-50/40 min-h-screen pt-24 flex'>
      <div className='w-1/5'>
        <Menu/>
      </div>
      <div className='w-9/12'>

        <Productionlist/>
      </div>
    </div>

  </div>
  )
}

export default ProductionList