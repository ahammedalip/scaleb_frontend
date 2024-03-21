import React from 'react'
import Header from '../../../components/header/Header'
import ProductionMenu from '../../../components/Production/Menu/ProductionMenu'
import RequestProfile from '../../../components/Production/Requests/Request.profile'

export default function RetailerReqProfile() {
    return (
        <div>
            <Header />
            <div className='bg-red-50/40 min-h-screen pt-20 flex space-x-5'>
                <ProductionMenu />
                <RequestProfile />
            </div>
        </div>
    )
}
