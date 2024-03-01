import React from 'react'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import Saleshome from '../../components/Sales/Home/Sales.Home'
import Header from '../../components/header/Header'

function SalesHome() {
  return (
    <div className=''>
      <Header />
      <div className='bg-red-50/40 min-h-screen pt-20 flex space-x-4'>
        <div>

          <SalesMenu />
        </div>

        <Saleshome />
      </div>

    </div>
  )
}

export default SalesHome