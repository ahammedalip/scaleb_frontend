import React, { useEffect, useState } from 'react';
import UserModal from '../AddSalesExec';
import api from '../../../axios/api';
import { jwtDecode } from 'jwt-decode'

function SalesList() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number>()
  const [salesExecList, setSalesExecList] = useState([])

  useEffect(() => {

    getToken();
    fetchSalesList();
    
  }, [adminId]);

  const fetchSalesList = async () => {
    try {
      const response = await api.get(`/retailer/sales_list?id=${adminId}`)
      const userDetails = response.data
      console.log(userDetails.salesExeclist);
      setSalesExecList(userDetails.salesExeclist);
    } catch (error) {
      console.log('error at fetch list', error);

    }
  };

  const getToken = async () => {
    const token = localStorage.getItem('access_token1');
    const decodedToken = token ? jwtDecode(token) : null
    console.log('here',decodedToken);
    // const validUser = decodedToken?.validUser

    const id = decodedToken.id;
    console.log('id is ', id);

    setAdminId(id)
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = ():void => {
    setShowModal(false);
  };

  return (
    <div className='bg-white ml-14 w-4/6 shadow-lg rounded-lg'>
      <div className='flex justify-end items-center pt-5'>
        <p className='pr-6'>Add a new sales executive</p>
        <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={handleOpenModal}
        >
          Add
        </button>
      </div>
      <UserModal isOpen={showModal} onClose={handleCloseModal} />

      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
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
            {salesExecList.map((exec:
            {
              username:string,
              email: string,
              isBlocked: boolean
            },
             index:number
             ) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>




    </div>
  )
}

export default SalesList;
