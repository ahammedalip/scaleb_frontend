import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';


export default function RetailersList() {
  const [loading, setLoading] = useState<boolean>(false)
  const [productionId, setProductionId] = useState<string>('')
  const [retailers, setRetailers] = useState([])
  const [title, setTitle] = useState('')


  useEffect(() => {

    fetchRetailer()

  }, [])

  const navigate = useNavigate()

  const fetchRetailer = async () => {
    const token = localStorage.getItem('production_token');
    if (token) {
      const decoded = decodeJWT(token)
      // console.log(decoded)
      const id = decoded.id
      setProductionId(decoded.id)

      try {
        setLoading(true)
        const response = await api.get(`/production/conn-ret?id=${id}`)

        if (response.data.success) {
          console.log('data from back', response.data)
          setRetailers(response.data.connected)
          setTitle('Associated Retailers')
          setLoading(false)
        } else if (!response.data.success) {
          setLoading(false)
          toast.error('Error while fetching Retailers')
        }
      } catch (error) {
        console.log('error while fetching retailers')
        toast.error('Please try again')
      }
    }
  }

  function decodeJWT(token: string) {

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    // Decode the Base64 string to a JSON object
    const payload = JSON.parse(window.atob(base64));

    return payload;
  }
  const handleFetchRetailers = async () => {
    fetchRetailer()
  }

  const handleFetchAvailable = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/production/avail-ret?id=${productionId}`)
      if (response.data.success) {
        console.log('data from back', response.data)
        setRetailers(response.data.availableRetailer)
        setTitle('Available Retailers')
        setLoading(false)
      } else if (!response.data.success) {
        setLoading(false)
        toast.error('Error while fetching Retailers')
      }
    } catch (error) {
      console.log('error while fetching retailers')
      toast.error('Please try again')
    }

  }

  const handleViewProfile = async (retailerId: string) => {
    navigate(`/production/retailer/ind-profile?id=${retailerId}`)
  }
  return (
    <div className='flex flex-col w-9/12 items-center space-y-6'>
      <div className='space-x-5 items-center'>
        <button className='bg-green-500 p-2 shadow-md rounded-lg  hover:bg-green-700 hover:text-white  duration-200 ease-in-out'
          onClick={handleFetchRetailers}
        >Associated Retailers</button>
        <button className='bg-blue-400 p-2 shadow-md rounded-lg hover:bg-blue-700 hover:text-white duration-200 ease-in-out'
          onClick={handleFetchAvailable}
        >Available Retailers</button>
      </div>
      <div className='bg-white p-3 rounded-lg shadow-lg flex flex-col h-full  pt-4 overflow-y-auto pb-5 w-full'>
        {loading ? (
          <div className='p-5  h-40 flex flex-col items-center justify-center'>
            <ClipLoader color="rgb(10, 10, 10)" size={60} />
          </div>
        ) : (
          <>
            <div className='text-center'>

              <h1 className='' style={{ fontSize: '1.5rem' }}>{title}</h1>
            </div>

            <div className='profile text-center p-5 flex'>
              {retailers.length === 0 ? (
                <div className='p-2 flex flex-col items-center justify-center'>
                  <h1 className='font-medium text-red-500'>You are not associated with any retailers</h1>
                </div>
              ) : (
                retailers.map((unit, index) => (
                  <div key={index} className='flex flex-col items-center justify-center p-3'>
                    <img src='../../../../public/images/Product_pro.png' alt='' className='w-24 rounded-md text-center border-gray-400 shadow-gray-400 shadow-md' />
                    <div>
                      <h2>{unit.retailerName}</h2>
                    </div>
                    <div className='p-1'>
                      <button className='bg-pink-500/85 hover:bg-pink-700 hover:text-white p-2 rounded-md shadow-md duration-200 ease-in-out' onClick={() => handleViewProfile(unit._id)}>View</button>
                    </div>
                  </div>
                ))
              )}
            </div>


          </>
        )}
      </div>
    </div>

  )
}
