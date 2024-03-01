import React, { useEffect, useState } from 'react';
import UserModal from '../AddSalesExec';
import api from '../../../axios/api';
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from 'jwt-decode';


interface SalesExecList {
  _id: string;
  username: string;
  email: string;
  isBlocked: boolean;

}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

function SalesList() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>()
  const [salesExecList, setSalesExecList] = useState<SalesExecList[]>([])

  

  useEffect(() => {

    getToken();
    fetchSalesList();

  }, [adminId]);

  const fetchSalesList = async () => {
    try {
      const response = await api.get(`/retailer/sales_list?id=${adminId}`)
      const userDetails = response.data
      // console.log(userDetails.salesExeclist);
      setSalesExecList(userDetails.salesExeclist);
    } catch (error) {
      console.log('error at fetch list', error);

    }
  };

  const getToken = async () => {
    const token = localStorage.getItem('retailer_token');
    const decodedToken = token ? jwtDecode<CustomJwtPayload>(token) : null;
    // console.log('here', decodedToken);
    const id = decodedToken?.id;
    // console.log('id is ', id);

    setAdminId(id)
  }

  const handleToggle = async (salesId: string, currentIsBlocked: boolean) => {
    // console.log('production', salesId);
    setSalesExecList(salesExecList.map(item => {
      if (item._id === salesId) {
        return { ...item, isBlocked: !currentIsBlocked };
      }
      return item;
    }));
    try {
      const response = await api.put(`/retailer/toggle_block_update?id=${salesId}`)
      // console.log('coming here after api call');
      // console.log('response--->',response.data);
      if (response.status === 200) {
         
        const updatedSalesList = response.data.userlist;
        setSalesExecList(updatedSalesList);
      } else {
        console.error('Failed to toggle block status');
      }
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  return (
    <div className='bg-white ml-14 w-4/6 shadow-lg rounded-lg'>
      <div className='flex justify-end items-center pt-5'>
        <p className='pr-6'>Add a new sales executive</p>
        <button
          className="border-2 border-pink-500  active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded 
          shadow hover:bg-pink-500 hover:text-white hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={handleOpenModal}
        >
          Add
        </button>
      </div>
      <UserModal isOpen={showModal} onClose={handleCloseModal} />

      <div className="overflow-auto">
        <div className='p-4 '>
          <div className="overflow-x-auto"> 
            <table className="min-w-full divide-y divide-gray-200 border-black rounded-lg">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesExecList.map((exec, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exec?.username ?? ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exec.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exec.isBlocked ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={exec.isBlocked}
                          onChange={() => handleToggle(exec._id, exec.isBlocked)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  )
}

export default SalesList;
