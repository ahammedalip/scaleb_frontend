import React, { useEffect, useState } from 'react';

import api from '../../../axios/api';
import { useNavigate } from 'react-router-dom';

function ProductionConnected() {
  const [ProductionList, setProductionList] = useState([]);
  
  const navigate = useNavigate()

  useEffect(() => {
    fetchAvailableUsers();
  }, []);

  const fetchAvailableUsers = async () => {
    try {
      const response = await api.get('/retailer/connected');
      const result = response.data;
      console.log('result her', result.availableProduction);
      setProductionList(result.availableProduction)
      // You might want to set the result to your state here
    } catch (error) {
      console.log('error fetching available productions', error)
    }
  }
  const handleViewClick =(id:number)=>{
    navigate(`/retail/prod/ind-profile?id=${id}&view=conn`)
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-5'>
      <div className='text-center'>
        <h1 className='heading1 font-bold ' style={{fontSize:'20px',textShadow:'1px 3px 4px grey'}}>Connected Production Units</h1>
      </div>

      <div className='profile text-center p-5 flex'>
        {ProductionList.map((unit:{
          _id:number,
          name: string,
          productionName:string
        }, index) => (
          <div key={index} className='flex flex-col items-center justify-center p-3'>
            <img src='../../../../public/images/Product_pro.png' alt={unit.name} className='w-24 rounded-md text-center border-gray-400 shadow-gray-400 shadow-md' />
            <div>
              <h2>{unit.productionName}</h2>
            </div>
            <div className='p-1'>
              <button className='bg-pink-500/85 hover:bg-pink-700 hover:text-white p-2  rounded-md shadow-md' onClick={()=>handleViewClick(unit._id)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductionConnected;



