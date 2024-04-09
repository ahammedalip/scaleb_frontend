import React from 'react'
import Revenuelist from '../../components/SuperAdmin/Revenue/Revenue.list'
import Header from '../../components/header/Header'
import Menu from '../../components/SuperAdmin/menu/Menu'

export default function RevenueList() {
    return (
        <div>
            <Header />
            <div className='bg-red-50/40 pt-20 h-screen flex space-x-5'>
                <Menu/>
                <Revenuelist />

            </div>

        </div>
    )
}
