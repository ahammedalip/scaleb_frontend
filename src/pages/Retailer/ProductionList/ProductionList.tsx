import React from 'react'
import ProductionAssociated from '../../../components/Retailer/ProductionUnits/AssociatedProduction'
import ProductionAvailable from '../../../components/Retailer/ProductionUnits/AvailableProduction'
import Header from '../../../components/header/Header'
import RetailerMenu from '../../../components/Retailer/menu/RetailerMenu'

function ProductionList() {
    return (
        <div>
            <Header />
            
            <div className='bg-red-50/40 min-h-screen flex pt-24'>
                <RetailerMenu />
                <ProductionAssociated />
                <ProductionAvailable />
            </div>

        </div>
    )
}

export default ProductionList