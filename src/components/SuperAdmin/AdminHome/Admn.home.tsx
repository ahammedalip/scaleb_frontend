import react, { useState, useEffect } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'


function Admnhome() {
  const [loading, setLoading] = useState(false)
  const [revenue, setRevenue] = useState(0)
  const [retailersCount, setRetailersCount] = useState(0)
  const [productionCount, setProductionCount] = useState(0)

  useEffect(() => {
    fetchDatas()
  }, [])

  const fetchDatas = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/mini-report')

      if (response.data.success) {
        setRevenue(response.data.totalAmount)
        setRetailersCount(response.data.countRetailer)
        setProductionCount(response.data.countProduction)
        setLoading(false)
      }
    } catch (error) {
      console.log('error while fetching data', error)
      setLoading(false)
      toast.error('Please refresh again')
    }

  }
  return (

    <div className="p-5 rounded-md shadow-md h-[95%]"
      style={{
        backgroundImage: "url('../../../../public/images/justwall.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='justify-center md:flex md:justify-between px-10 pt-9'>
        <div className='w-full sm:w-auto flex flex-col justify-center items-center md:w-1/4 bg-black text-white p-7 text-center bg-opacity-50 rounded-md shadow-md m-2'>
          <h1 className='text-2xl'>Total Revenue:</h1>
          {loading ? (
            <div className='pt-4'><ClipLoader size={40} color='white' /></div>
          ) : (

            <h1 className='text-5xl font-bold'>$ {revenue}</h1>
          )}
        </div>
        <div className='w-full sm:w-auto flex flex-col justify-center items-center md:w-1/4 bg-black text-white p-7 text-center bg-opacity-50 rounded-md shadow-md m-2'>
          <h1 className='text-2xl'>Retailers</h1>
          {loading ? (
            <div className='pt-3'><ClipLoader size={40} color='white' /></div>
          ) : (

            <h1 className='text-5xl font-bold'>$ {retailersCount}</h1>
          )}
        </div>
        <div className='w-full sm:w-auto flex flex-col justify-center items-center md:w-1/4 bg-black text-white p-7 text-center bg-opacity-50 rounded-md shadow-md m-2'>
          <h1 className='text-2xl'>Production</h1>
          {loading ? (
            <div className='pt-4'><ClipLoader size={30} color='white'/></div>
          ) : (

            <h1 className='text-5xl font-bold'>$ {productionCount}</h1>
          )}
        </div>
      </div>
    </div>


  )
}

export default Admnhome