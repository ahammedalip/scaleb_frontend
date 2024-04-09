import React,{useEffect, useState} from 'react'
import api from '../../../axios/api'

export default function RetailerReport() {
    useEffect(()=>{

    },[])

    const fetchReport = async()=>{
        const response = await api.get('/retailer/reports')
    }
  return (
    <div className='bg-white w-9/12 rounded-md shadow-md'>

    </div>
  )
}
