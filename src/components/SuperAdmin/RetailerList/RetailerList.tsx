import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import { jwtDecode } from 'jwt-decode'

interface RetailerItem {
  _id: string;
  retailerName: string;
  email: string;
  isBlocked: boolean;
  
}

function Retailerlist() {

  const [adminId, setAdminId] = useState<number>()
  const [retailerList, setRetailerList] = useState<RetailerItem[]>([]);


  useEffect(()=>{
    getToken()
   
    getRetailersList()
  },[adminId])

  const getToken = async()=>{
    const token = localStorage.getItem('superAdmin_token');
    const decodedToken = token? jwtDecode(token): null
    console.log('here decoded token', decodedToken);

    setAdminId(decodedToken.id)
    console.log(adminId);
  }

  const getRetailersList = async()=>{

    try {
      const response = await api.get(`/admin/retailer_list?id=${adminId}` )
      const retailerList = response.data

      console.log('retail list',retailerList.userlist);
      setRetailerList(retailerList.userlist)
    } catch (error) {
      console.log('error at retail list fetch',error);
    }
    
  }

  const handleToggle = async (productionId:string, currentIsBlocked:boolean) => {
    console.log('production',productionId);
    setRetailerList(retailerList.map(item => {
      if (item._id === productionId) {
        return { ...item, isBlocked: !currentIsBlocked };
      }
      return item;
    }));
    try {
      const response = await api.put(`/admin/toggle_block_update?id=${productionId}&role=retailer`)
      if (response.status === 200) {
        // Assuming the API returns the updated production list
        const updatedRetailerlist = response.data.userlist;
        setRetailerList(updatedRetailerlist);
      } else {
        console.error('Failed to toggle block status');
      }
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
  }; 

  return (
   


<div className='bg-white ml-10 shadow-lg rounded-lg p-4'> {/* Add padding here */}
<div className="overflow-auto">
  <table className="min-w-full divide-y divide-gray-200">
    {/* ... rest of your table code ... */}
    <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Is Blocked
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {retailerList.map((retail:
             {
              _id: string,
              retailerName: string,
              email: string,
              isBlocked: boolean
            },
            index: number
             ) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {retail?.retailerName ?? ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {retail.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {retail.isBlocked ? 'Yes' : 'No'}
                </td>
                <td  className="px-6 py-4 whitespace-nowrap"> 
                <label className="inline-flex items-center cursor-pointer">
                <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={retail.isBlocked}
                      onChange={() => handleToggle(retail._id, retail.isBlocked)}
                    />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                  {/* <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Red</span> */}
                </label>
                </td>
              </tr>
            ))}
          </tbody>
        
  </table>
</div>
</div>
  )
}

export default Retailerlist