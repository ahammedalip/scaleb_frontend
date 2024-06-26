import { useEffect, useState } from 'react';
import UserModal from '../AddSalesExec';
import api from '../../../axios/api';

import ClipLoader from 'react-spinners/ClipLoader'
// import toast from 'react-hot-toast';


interface SalesExecList {
  _id: string;
  username: string;
  email: string;
  isBlocked: boolean;

}



function SalesList() {
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [adminId, setAdminId] = useState<string>()
  const [salesExecList, setSalesExecList] = useState<SalesExecList[]>([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchSalesList(currentPage);

  }, [currentPage]);

  const fetchSalesList = async (page: number = 1) => {
    try {
      setLoading(true)
      const response = await api.get(`/retailer/sales_list?page=${page}`)
      const userDetails = response.data
      // console.log(userDetails.salesExeclist);
      setSalesExecList(userDetails.salesExeclist);
      setTotalPages(userDetails.totalPages)
      setLoading(false)
    } catch (error) {
      console.log('error at fetch list', error);
      setLoading(false)
      // toast.error('please try with different credentials')
    }
  };


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
    <div className='bg-white  shadow-lg rounded-lg '>
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
      <UserModal isOpen={showModal} onClose={handleCloseModal} fetchSalesList={fetchSalesList} />

      <div className="">
        <div className="p-5">
          {loading ? (
            <div className='items-center flex justify-center'>
              <ClipLoader />
            </div>
          ) : (
            <div className=''>
              <table className="min-w-full divide-y divide-gray-200 border-black rounded-lg overflow-x-scroll">
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
          )}
          <div className='text-center justify-center flex space-x-5 pt-5'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
              className="border rounded-full p-2 shadow-sm disabled:bg-white disabled:text-gray-500 disabled:cursor-not-allowed enabled:hover:bg-black enabled:hover:text-white"
            >Prev</button>
            <p className='pt-2'>{currentPage}</p>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
              className="border rounded-full p-2 shadow-sm disabled:bg-white disabled:text-gray-500 disabled:cursor-not-allowed enabled:hover:bg-black enabled:hover:text-white"
            >Next</button>
          </div>
        </div>

      </div>


    </div>
  )
}

export default SalesList;
