import React from 'react'
import ProductionAssociated from '../../../components/Retailer/ProductionUnits/AssociatedProduction'
import ProductionAvailable from '../../../components/Retailer/ProductionUnits/AvailableProduction'
import Header from '../../../components/header/Header'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'

function ProductionList() {
    return (
        <div>
            <Header />
            
            <div className='bg-red-50/40 min-h-screen flex pt-20 space-x-7'>
                <div className='w-1/5'>
                <RetailerMenu />
                </div>
                <div className='w-4/6'>
                <ProductionAssociated />
                <ProductionAvailable />
                </div>
               
            </div>

        </div>
    )
}

export default ProductionList