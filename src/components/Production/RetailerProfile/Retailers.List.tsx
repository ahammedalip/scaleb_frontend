import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import img from '../../../../public/images/Product_pro.png'


export default function RetailersList() {
  const [loading, setLoading] = useState<boolean>(false)
  const [retailers, setRetailers] = useState([])
  const [title, setTitle] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [sortValue, setSortValue] = useState(1)
  const [type, setType] = useState('associated')

  const navigate = useNavigate()

  useEffect(() => {
    fetchRetailer()
  }, [currentPage])



  useEffect(() => {
    if (type == 'available') {
      handleFetchAvailableReq()
    } else {
      fetchRetailer()
    }
  }, [type, sortValue])

  const fetchRetailer = async () => {
    console.log('datas associated:>', searchValue, type, sortValue)
    try {
      setLoading(true)
      const response = await api.get(`/production/conn-ret?search=${searchValue}&sort=${sortValue}`)
      if (response.data.success) {
        console.log('data from back', response.data)
        setRetailers(response.data.connected)
        setTitle('Associated Retailers')
        // setSortValue(1)
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

  const handleFetchAvailableReq = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/production/avail-ret?search=${searchValue}&sort=${sortValue}`)
      if (response.data.success) {
        console.log('data from back', response.data)
        setRetailers(response.data.availableRetailer)
        setTitle('Available Retailers')
        setTotalPages(1)

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

  const handleFetchRetailers = async () => {
    setType('associated')
  }

  const handleFetchAvailable = async () => {
    setType('available')

  }

  const handleViewProfile = async (retailerId: string) => {
    navigate(`/production/retailer/ind-profile?id=${retailerId}`)
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = async () => {
    if (type == 'available') {
      handleFetchAvailableReq()
    } else {
      fetchRetailer()
    }
  }

  const handleSort = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('comign here')
    const sortDirection = e.target.value === '1' ? 1 : -1;
    console.log('sort value is ', sortDirection);
    setSortValue(sortDirection);
  }

  const handleQuery = async () => {
    setType('associated')
    setSearchValue('')
    setSortValue(1)
  }

  return (
    <div className='flex flex-col w-9/12 items-center space-y-6'>

      <div className='space-x-5 items-center bg-gray-200 border w-full justify-center flex flex-col space-y-4 p-5 rounded-md shadow-md md:flex-row'>

        <div className=' items-center  justify-center flex flex-row border-2 border-gray-400/50 rounded-lg'>
          <input type="text"
            placeholder='Enter name'
            className=' border-gray-300 bg-white h-10 px-5 pr-16  rounded-tl-lg rounded-bl-lg text-sm focus:outline-none'
            onChange={handleChange} />
          <button className='px-2 ' onClick={handleSearch}>
            <CiSearch fontSize={'25px'} />
          </button>
        </div>

        <div className='flex flex-col text-center'>
          <h1 className='text-lg'>Sort</h1>
          <select className='bg-gray-200 border-2 border-gray-400/50 rounded-md p-2'  onChange={handleSort}>
            <option  value="1">Low to High</option>
            <option  value="-1">High to Low</option>
          </select>
        </div>


        {/* <div className='flex flex-col'>
          <h1>Sort</h1>
          <label htmlFor='low-high'>
            <input type="radio" id='low-high' name='sort'
              onChange={handleSort} />Low to High
          </label>

          <label htmlFor='high-low'>
            <input type="radio"
              id='high-low'
              name='sort'
              onChange={handleSort} />High to Low
          </label>
        </div> */}

        <div className='text-center'>
          <div className='space-x-2 sm:space-x-0   sm:space-y-2'>
            <button className='bg-green-500 p-2 px-2 shadow-md rounded-lg  hover:bg-green-700 hover:text-white  duration-200 ease-in-out'
              onClick={handleFetchRetailers}
            >Associated</button>
            <button className='bg-blue-400 p-2 px-4 shadow-md rounded-lg hover:bg-blue-700 hover:text-white duration-200 ease-in-out'
              onClick={handleFetchAvailable}
            >Available</button>
          </div>
        </div>

        <div >
          <button onClick={handleQuery} className='bg-black text-white rounded-md p-1'>Clear Query</button>
        </div>
      </div>

      <div className='bg-white p-3 rounded-lg shadow-lg flex flex-col h-full  pt-4 overflow-y-auto pb-5 w-full'>
        {loading ? (
          <div className='p-5  h-40 flex flex-col items-center justify-center'>
            <ClipLoader color="rgb(10, 10, 10)" size={60} />
          </div>
        ) : (
          <>

            <div className='text-center'>
              <h1 className='pt-2' style={{ fontSize: '1.5rem' }}>{title}</h1>

            </div>
            <div className='profile text-center p-5 flex flex-col sm:flex-row flex-wrap justify-center'>
              {retailers.length === 0 ? (
                <div className='p-2 flex flex-col items-center justify-center'>
                  <h1 className='font-medium text-red-500'>You are not associated with any retailers</h1>
                </div>
              ) : (
                retailers.map((unit: {
                  _id: string;
                  retailerName: string;
                }, index) => (
                  <div key={index} className='flex flex-col items-center justify-center p-3'>
                    <img src={img} alt='' className='w-24 rounded-md text-center border-gray-400 shadow-gray-400 shadow-md' />
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

            <div className='text-center justify-center flex space-x-5 pt-5'>
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='border rounded-full p-2 shadow-sm'>Prev</button>
              <p className='pt-2'>{currentPage}</p>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className='border rounded-full p-2 shadow-sm'>Next</button>
            </div>
          </>
        )}
      </div>
    </div >

  )
}
