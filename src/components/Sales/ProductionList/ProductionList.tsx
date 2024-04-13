import React, { useEffect, useState } from 'react';
import api from '../../../axios/api';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import toast from 'react-hot-toast';


function ProductionList() {
  const [availableProduction, setAvailableProduction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAvailableUsers();
  }, [currentPage]);

  const fetchAvailableUsers = async (page = 1) => {
    try {
      setLoading(true)
      const response = await api.get(`/sales/available-prod?page=${page}`);
      const result = response.data;
      if (result.success == true) {
        setAvailableProduction(result.availableProduction)
        setLoading(false)
      }

    } catch (error) {
      console.log('error fetching available productions', error)
      setLoading(false)
      toast.error('Error while fetching data, please refresh page')
    }
  }
  const handleViewClick = (id: number) => {
    navigate(`/sales/prod/ind-profile?id=${id}`)
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-5  w-9/12 space-y-4'>
      <div className='text-center'>
        <h1 className='heading1' style={{ fontSize: '1.5rem' }}>Available Production Units</h1>

      </div>
      {loading ? (
        <div className='h-screen  items-center justify-center flex'>
          <ClipLoader size={40} />
        </div>
      ) : (
        <>
          <div className='profile text-center border rounded-md p-10 flex flex-col sm:flex-row justify-evenly space-y-4 sm:space-y-0 md:space-y-0'>
            {availableProduction.map((unit: {
              _id: number,
              name: string,
              productionName: string
            }, index) => (
              <div key={index} className='flex flex-col items-center justify-center p-3'>
                <img src='../../../../public/images/Product_pro.png' alt={unit.name} className='w-24 rounded-md text-center border-gray-400 shadow-gray-400 shadow-md' />
                <div>
                  <h2>{unit.productionName}</h2>
                </div>
                <div className='p-1'>
                  <button className='bg-pink-500/85 hover:bg-pink-700 hover:text-white p-2  rounded-md shadow-md' onClick={() => handleViewClick(unit._id)}>View</button>
                </div>
              </div>
            ))}
          </div>
          <div className='text-center justify-center flex space-x-5 pt-5'>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className='border rounded-full p-2 shadow-sm'
            >Prev</button>
            <p className='pt-2'>
              {currentPage}
            </p>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='border rounded-full p-2 shadow-sm'
            >Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductionList;



