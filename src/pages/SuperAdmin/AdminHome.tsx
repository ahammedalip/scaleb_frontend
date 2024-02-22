import React from 'react'
import Admnhome from '../../components/SuperAdmin/AdminHome/Admn.home'
import Header from '../../components/header/Header'

function AdminHome() {
  return (
    <div className='bg-red-50/40 min-h-screen'>
      <Header/>
        <Admnhome/>
        
    </div>
  )
}

export default AdminHome