import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import { jwtDecode } from 'jwt-decode'


function Productionlist() {

  const [adminId, setAdminId] = useState<number>()
  const [productionList, setProductionList] = useState([]);


  useEffect(()=>{
    getToken()
    getProductionList()
  },[adminId])

  const getToken = async()=>{
    const token = localStorage.getItem('access_token');
    const decodedToken = token? jwtDecode(token): null
    console.log('here decoded token', decodedToken);

    setAdminId(decodedToken.id)


    console.log(adminId);
  }

  const getProductionList = async()=>{

    try {
      const response = await api.get(`/admin/production_list?id=${adminId}` )
      const productionList = response.data

      console.log('production list',productionList.userlist);
      setProductionList(productionList.userlist)
    } catch (error) {
      console.log('error at production list fetch',error);
    }
    
  }

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
            {productionList.map((retail:
            { id: string,
              productionName:string,
              email: string,
              isBlocked: boolean
            },
             index:number
             ) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {retail?.productionName ?? ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {retail.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {retail.isBlocked ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
  </table>
</div>
</div>
  )
}

export default Productionlist