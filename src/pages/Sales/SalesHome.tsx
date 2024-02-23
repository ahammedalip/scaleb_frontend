import React from 'react'
import SalesMenu from '../../components/Sales/Menu/SalesMenu'
import Saleshome from '../../components/Sales/Home/Sales.Home'
import Header from '../../components/header/Header'

function SalesHome() {
  return (
    <div>
        <Header/>
        
        <SalesMenu/>
        <Saleshome/>

    </div>
  )
}

export default SalesHome