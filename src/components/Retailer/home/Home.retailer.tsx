import  { useEffect, useState } from 'react'
import api from '../../../axios/api'
import { jwtDecode } from 'jwt-decode'
import ClipLoader from 'react-spinners/ClipLoader'
import toast from 'react-hot-toast'

interface JwtPayload {
  id: string
}

function HomeRetailer() {
  const [orderCount, setOrderCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTotalOrders()
  }, [])

  const fetchTotalOrders = async () => {
    const token = localStorage.getItem('retailer_token')
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token)
      if (decodedToken) {
        const id = decodedToken.id
        setLoading(true)

        try {
          const response = await api.get(`/retailer/getOrder?id=${id}`)
          if (response.data.success) {
            setOrderCount(response.data.countOrder)
            setLoading(false)
          }
        } catch (error) {
          console.log('error while fetching order count', error)
          toast.error('please refresh again')
        }
      }
    }
  }
  return (
    <div className='bg-white rounded-md shadow-md h-full'
      style={{
        backgroundImage: "url('../../../../public/images/3957.jpg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>

      <div className='justify-center md:flex md:justify-between px-10 pt-9'>
        <div className='w-full sm:w-auto flex flex-col justify-center items-center md:w-1/3 bg-black text-white p-7 text-center bg-opacity-50 rounded-md shadow-md m-2'>
          <h1 className='text-2xl'>Total Orders:</h1>
          {loading ? (
            <ClipLoader />
          ) : (
            <h1 className='text-5xl font-bold'>{orderCount}</h1>
          )}

        </div>
      </div>
    </div>
  )
}

export default HomeRetailer