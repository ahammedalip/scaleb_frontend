import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RetailersList() {
  const [loading, setLoading] = useState<boolean>(false)
  const [productionId, setProductionId] = useState<string>('')
  const [retailers, setRetailers] = useState([])
  const [title, setTitle] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [sortValue, setSortValue] = useState(1)
  useEffect(() => {

    fetchRetailer()

  }, [currentPage])

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

  const handleFetchAvailable = async (page: number = 1) => {
    try {
      setLoading(true)
      const response = await api.get(`/production/avail-ret?id=${productionId}&page=${page}`)
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

  const handleViewProfile = async (retailerId: string) => {
    navigate(`/production/retailer/ind-profile?id=${retailerId}`)
  }

  const handleChange = async (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = async () => {
    try {
      const value = searchValue.trim()
      if (value == '') {
        return
      }
      setLoading(true)

      const response = await api.get(`/production/search-user?value=${value}`)
      if (response.data.success) {
        if (response.data.retailers.length > 0) {
          setRetailers(response.data.retailers)
          setLoading(false)
        } else {
          setLoading(false)
          toast.error('No retailer on that name exists.')
        }
      }
    } catch (error) {
      console.log('error while searching user')
      setLoading(false)
      toast.error('Please try again.')
    }
  }

  const handleSort = async (e) => {
    setSortValue(e.target.value);
    console.log('sort value ', sortValue)
    try {
      setLoading(true)
      const response = await api.get(`/production/retailer-sort?value=${sortValue}`)
      if (response.data.success) {
        setLoading(false)
        setRetailers(response.data.sortedRetailers)
      }
    } catch (error) {
      console.log('error while sort', error)
      setLoading(false)
      toast.error('Error sorting, Please try later')
    }
  }

  return (
    <div className='flex flex-col w-9/12 items-center space-y-6'>

      <div className='space-x-5 items-center bg-white w-full justify-center flex p-5 rounded-md shadow-md'>


        <div className=' items-center justify-center flex flex-row border-2 rounded-lg'>
          <input type="text"
            placeholder='Enter name'
            className=' border-gray-300 bg-gray-100 h-10 px-5 pr-16 rounded-tl-lg rounded-bl-lg text-sm focus:outline-none'
            onChange={handleChange} />
          <button className='px-2' onClick={handleSearch}>
            <CiSearch fontSize={'25px'} />
          </button>
        </div>


        <div className=''>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Sort(Rating)</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              row
              value={sortValue}
              onChange={handleSort}
            >
              <FormControlLabel
                value='1'
                control={<Radio />} label="Low to High" />
              <FormControlLabel
                value='-1'
                control={<Radio />} label="High to low" />
            </RadioGroup>
          </FormControl>
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
              <div className='space-x-5'>
                <button className='bg-green-500 p-2 shadow-md rounded-lg  hover:bg-green-700 hover:text-white  duration-200 ease-in-out'
                  onClick={handleFetchRetailers}
                >Associated Retailers</button>
                <button className='bg-blue-400 p-2 shadow-md rounded-lg hover:bg-blue-700 hover:text-white duration-200 ease-in-out'
                  onClick={() => handleFetchAvailable(currentPage)}
                >Available Retailers</button>
              </div>

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
