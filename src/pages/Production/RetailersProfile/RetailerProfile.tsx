import React from 'react'
import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import RetailerProf from '../../../components/Production/RetailerProfile/Retailer.Profile'

export default function RetailerProfile() {
    return (
        <div>
            <Header/>
            <div className='bg-red-50/40 min-h-screen pt-20 flex space-x-5'>
                <div className='w-1/5'>
                <ProductionMenu/>
                </div>
                    
                <RetailerProf/>
            </div>
    </div>
    )
}
