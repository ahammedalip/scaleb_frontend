import React from 'react'
import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import IndProfileProd from '../../components/Sales/ProducitonProfile/ProductionProfile'

function IndividualProdProfile() {
  return (
    <div>
        <Header/>
        <div className='bg-red-50/40 pt-20 min-h-screen flex space-x-4'>
            <SalesMenu/>
            <IndProfileProd/>

        </div>
    </div>
  )
}

export default IndividualProdProfile