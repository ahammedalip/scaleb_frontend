import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import img from '../../../../public/images/Product_pro.png'
import toast from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'

// import './ProfileProd.css'


const ProfileRet: React.FC = () => {

  const [profileName, setProfileName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    fetchUserData()

  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await api.get('/retailer/profile')

      const userDetails = response.data;
      console.log(userDetails.userDetails);
      setProfileName(userDetails.userDetails.retailerName)
      setDescription(userDetails.userDetails.description)
      setLoading(false)
    } catch (error) {
      console.log('error at fetching user profile details', error);
      setLoading(false)
      toast.error('please refresh again')
    }
  }



  return (
    <div className='bg-slate-100 rounded-lg shadow-lg flex flex-col items-center justify-center mainClass overflow-y-auto pb-3'>
      <div className='text-center pt-7'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <ClipLoader />
          </div>
        ) : (

          <img src={img} alt="" className='w-36 rounded-xl shadow-slate-800 shadow-md' />
        )}
      </div>
      <h1 className='text-center font-bold  p-5 productionName' style={{ fontSize: '32px' }}>{profileName} </h1>
      <div className='p-8'>
        <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center description min-w-80'>
          <div>
            <h1 className='pb-4 font-bold'>About</h1>
          </div>
          {loading ? (
            <div className='flex justify-center items-center'>
              <ClipLoader />
            </div>
          ) : (
            <h2 className='description min-h-16 '>
              {description}
            </h2>
          )}

        </div>
      </div>

    </div>
  )
}

export default ProfileRet
