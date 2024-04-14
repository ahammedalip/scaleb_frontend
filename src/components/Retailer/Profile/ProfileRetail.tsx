import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import img from '../../../../public/images/Product_pro.png' 

// import './ProfileProd.css'


const ProfileRet: React.FC = () => {

  const [profileName, setProfileName] = useState('')
  const [description, setDescription] = useState('')


  useEffect(() => {

    fetchUserData()

  }, [])

  const fetchUserData = async () => {
    try {
      const response = await api.get('/retailer/profile')

      const userDetails = response.data;
      console.log(userDetails.userDetails);
      setProfileName(userDetails.userDetails.retailerName)
      setDescription(userDetails.userDetails.description)

    } catch (error) {
      console.log('error at fetching user profile details', error);
    }
  }



  return (
    <div className='bg-slate-100 rounded-lg shadow-lg flex flex-col items-center justify-center mainClass overflow-y-auto pb-3'>
      <div className='text-center pt-7'>
        <img src={img} alt="" className='w-36 rounded-xl shadow-slate-800 shadow-md' />
      </div>
      <h1 className='text-center font-bold  p-5 productionName' style={{ fontSize: '32px' }}>{profileName} </h1>
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

    </div>
  )
}

export default ProfileRet
