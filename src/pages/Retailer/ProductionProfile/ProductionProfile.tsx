import React from 'react'
import Header from '../../../components/header/Header'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'
import IndProfileProd from '../../../components/Retailer/IndividualProfileProd/IndividualProfile'

function ProductionProfile() {
  return (
   <>
   <Header/>
   <div className='bg-red-50/40 min-h-screen pt-20 flex space-x-5'>
                <div className='w-1/5 space-y-5' >
                <RetailerMenu  />
                </div>

                <div className='w-8/12 min-h-screen pb-2 px-2 overflow-y-auto' >
                    <IndProfileProd/>
                </div>
            </div>
   </>
  )
}

export default ProductionProfile