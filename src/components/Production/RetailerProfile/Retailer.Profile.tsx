import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader";

interface Profile {
  retailerName: string;
  description: string;
  _id:string

}

export default function RetailerProf() {
  const [productionId, setProductionId] = useState('')
  const [profileDetails, setProfileDetails] = useState<Profile>({} as Profile)
  const [loading, setLoading] = useState(false)
  const [displayReqButton, setDisplayReqButton] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [productionId])

  const fetchUserData = async () => {

    const params = new URLSearchParams(location.search)
    const id = params.get('id')

    const token = localStorage.getItem('production_token');
    if (token) {
      const decoded = decodeJWT(token)
      // console.log(decoded)
      const id = decoded.id
      setProductionId(decoded.id)
    }

    try {
      console.log('production id from try top', productionId)
      setLoading(true)
      const response = await api.get(`/production/ret-profile?id=${id}`)
      if (response.data.success) {
        const profileData = response.data.retailerProfile
        console.log('profile is ==========', profileData)
        setProfileDetails(profileData)
        console.log('profile is ==========', profileData.connectedProduction)

        // const isThere = profileData.connectedProduction.includes(productionId)
        // // console.log('is there',isThere, 'prductioaid', productionId)
        // if(!isThere){
        //   setDisplayReqButton(!displayReqButton)
        // }

        // Check if productionId is in the connectedProduction array
        const isProductionIdInConnectedProduction = profileData.connectedProduction.includes(productionId);
        // Set displayReqButton based on the presence of productionId in the array
        setDisplayReqButton(!isProductionIdInConnectedProduction);

        setLoading(false)
      }
    } catch (error) {
      console.log('error at fetching user profile details', error);
      setLoading(false)
      toast.error('please try again')
    }
  }

  const handleSendRequest = async () => {
    try {
      // setLoadingButton(true)
      const data = {
        productionId,
        retailId: profileDetails._id
      }
      const response = await api.patch('/production/conn-req',data)

      if(response.data.success){


        setLoadingButton(false)
        setDisplayReqButton(!displayReqButton)
        toast.success(response.data.message)
      }

    } catch (error) {

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


  return (
    <div className='bg-slate-100 rounded-lg shadow-lg flex flex-col items-center justify-center overflow-y-auto pb-3 w-9/12'>
      {loading ? (
        <div className='p-5  h-40 flex flex-col items-center justify-center'>
          <ClipLoader color="rgb(10, 10, 10)" size={60} />
        </div>
      ) : (
        <>
          <div className='text-center pt-7'>
            <img src="../../../../public/images/shop-icon.jpg" alt="" className='w-36 rounded-xl shadow-slate-800 shadow-md' />
          </div>
          <h1 className='text-center font-bold  p-5 productionName' style={{ fontSize: '32px' }}>{profileDetails.retailerName}</h1>
          {displayReqButton ? (
            <div>
              <button className='bg-blue-500 p-2 rounded-md text-white hover:bg-blue-700 ease-in-out duration-200'
                onClick={handleSendRequest}
                disabled={loadingButton}>{loadingButton ? 'Loading' : 'Send connection request'}</button>
            </div>
          ) : null}

          <div className='p-8'>
            <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center description min-w-80'>
              <div>
                <h1 className='pb-4 font-bold'>About</h1>
              </div>
              <h2 className='description min-h-16 '>
                {profileDetails.description}
              </h2>
            </div>
            {/* <h2>Sales Executives</h2>
            <div>

            </div> */}
          </div>
        </>
      )}
    </div>
  )
}
