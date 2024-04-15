import { useEffect, useState } from 'react'
import api from '../../../axios/api'
import ClipLoader from 'react-spinners/ClipLoader'
import toast from 'react-hot-toast'
import img1 from '../../../../public/images/mid-century-modern-living-room-interior-design-with-monstera-tree (1).jpg'

function Productionhome() {
  const [orderCount, setOrderCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const response = await api.get('/production/order-count')
    if (response.data.success) {
      setOrderCount(response.data.countOrder)
    }
    try {
      setLoading(true)
      const response = await api.get('/production/order-count')
      if (response.data.success) {
        setOrderCount(response.data.countOrder)
        setLoading(false)
      }
    } catch (error) {
      console.log('error while fetching orderCount', error)
      setLoading(false)
      toast.error('Please refresh again')
    }
  }

  return (
    <div className='bg-white rounded-md h-[90%]  -mt-[135%] sm:-mt-0  shadow-md opacity-95'
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='p-10'>
        <div className=' bg-slate-300/30 text-white opacity-100 w-fit p-5 rounded-lg flex flex-col items-center justify-center'>
          <h1 className='text-2xl'>Total Orders:</h1>
          {loading ? (
            <ClipLoader color='white'/>
          ) : (
            <h1 className='text-5xl font-bold'>{orderCount}</h1>
          )}
        </div>
      </div>

    </div>
  )
}

export default Productionhome