import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import { useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// import './ProfileProd.css'



const IndProfileProd: React.FC = () => {

  const [profileName, setProfileName] = useState('')
  const [description, setDescription] = useState('')
  const [items, setItems] = useState([])
  const [id, setId] = useState<number>()
  const [connected, setConnected] = useState<boolean>(false)

  const location = useLocation();


  useEffect(() => {

    fetchUserData()

  }, [])

  const fetchUserData = async () => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const view = params.get('view')
    // console.log(id, view);
    if (view) {
      console.log('show only if view appears');
      setConnected(true)
    }
    try {
      const response = await api.get(`/retailer/prod/profile?id=${id}`)

      const userDetails = response.data;

      if (userDetails.success == true) {
        setProfileName(userDetails.userDetails.productionName)
        setDescription(userDetails.userDetails.description)
        setId(userDetails.userDetails._id)
        setItems(userDetails.userDetails.availableItems)
      }
    } catch (error) {
      console.log('error at fetching user profile details', error);
    }
  }

  const handleRequest = async (prodId: number) => {
    // console.log('from here', prodId);
    try {
      const response = await api.post('/retailer/conn-req', { prodId })
      console.log(response.data)
      if (response.data.success == true) {
        if (response.data.message == 'already requested') {
          toast.success('Already requested')
        } else {
          toast.success('Requested successfully')
        }
      }
    } catch (error) {
      console.error('Error making the request:', error);
    }


  }


  return (
    <div className='bg-white rounded-lg shadow-lg flex flex-col items-center justify-center mainClass overflow-y-auto pb-3'>
      <div className='text-center pt-7'>
        <img src="../../../../public/images/Product_pro.png" alt="" className='w-36 rounded-xl shadow-slate-800 shadow-md' />
      </div>
      <h1 className='text-center font-bold  p-5 productionName' style={{ fontSize: '32px' }}>{profileName} </h1>
      {!connected ? (
        <div>
          <button className='bg-blue-500 p-2 rounded-md shadow-md text-white hover:bg-blue-800' onClick={() => handleRequest(id)}>Send connection request</button>
        </div>
      ) : null}

      <div className='p-8'>
        <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center description min-w-80'>
          <div>
            <h1 className='pb-4 font-bold'>About</h1>
          </div>
          <h2 className='description min-h-16 '>
            {description}
          </h2>
        </div>
      </div>
      <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center'>
        <h1 className='p-3 font-semibold'>Available Items</h1>


        <div className='flex'>
          <div className='space-x-3 flex p-3'>
            {items.map((item: string, index: number) => {
              return (
                <div key={index} className='bg-slate-300 rounded-md array-of-items'>
                  <h1 className='p-2'>{item}</h1>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default IndProfileProd
