import React from 'react'
import Header from '../../components/header/Header'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import CreateOrder from '../../components/Sales/Orders/CreateOrder'
import ExistingOrders from '../../components/Sales/Orders/Orders'

function Orders() {
    return (
        <div>
            <Header />
            <div className='bg-red-50/40 flex pt-20 min-h-screen space-x-4'>
                <div className='w-1/5'>
                <SalesMenu/>
                </div>
                    
                <div className='space-y-4 w-9/12'>
                
                    <ExistingOrders/>
                </div>

            </div>

        </div>
    )
}

export default Orders