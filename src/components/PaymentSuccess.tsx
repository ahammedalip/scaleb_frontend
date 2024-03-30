import { useEffect, useState } from 'react';
import Header from './header/Header';
import api from '../axios/api';
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  id: string
}

function PaymentSuccess() {
  const [id, setId] = useState('')
  const [token, setToken]= useState('')

  useEffect(() => {
    updateProfile()
  }, [id])
  const updateProfile = async () => {

    const params = new URLSearchParams(location.search)
    const duration = params.get('time')
    // console.log('duration', duration)
    const retailerToken = localStorage.getItem('retailer_token')
    const productionToken = localStorage.getItem('production_token')

    if (retailerToken) {
      // console.log('retialer')
      setToken('retailer')
      const decodedToken = jwtDecode<JwtPayload>(retailerToken)
      const id = decodedToken.id
      setId(id)
      const response = await api.patch(`/retailer/subscription?time=${duration}&id=${id}`)

    } else if (productionToken) {
      // console.log('production')
      setToken('production')
      const decodedToken = jwtDecode<JwtPayload>(productionToken)
      const id = decodedToken.id
      setId(id)
      const response = await api.patch(`/production/subscription?time=${duration}&id=${id}`)

    }
  }
  return (
    <div>
      <Header />
      <div className="flex justify-center pt-36 h-screen bg-red-50/40">


        <div className='border pt-7 text-center h-96 rounded-md bg-white shadow-md'>
          
          <img src="../../public/images/3d-hand.jpg" alt="" className='h-60' />
          <h1 className='text-green-600 font-bold'>Payment success</h1>
        </div>
       
      </div>
    </div>
  );
}

export default PaymentSuccess;
