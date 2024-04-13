import { useEffect, useState } from 'react'
import api from '../../../axios/api'
import { jwtDecode } from 'jwt-decode'
// import ClipLoader from 'react-spinners/ClipLoader'
import toast from 'react-hot-toast';

interface RetailerItem {
  _id: string;
  retailerName: string;
  email: string;
  isBlocked: boolean;

}
interface JwtPayload {
  id: string
}

function Retailerlist() {
  // const [loading, setLoading] = useState(false)
  const [adminId, setAdminId] = useState('')
  const [retailerList, setRetailerList] = useState<RetailerItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    getToken()

    getRetailersList()
  }, [adminId])

  const getToken = async () => {
    const token = localStorage.getItem('superAdmin_token');
    if (token) {

      const decodedToken = jwtDecode<JwtPayload>(token)
      if (decodedToken) {
        setAdminId(decodedToken.id)
      }
    }
  }

  const getRetailersList = async (page = 1) => {

    try {
      // setLoading(true)
      const response = await api.get(`/admin/retailer_list?id=${adminId}& page=${page}`)
      const retailerList = response.data
      if (response.data.success) {
        setRetailerList(retailerList.userlist)
        setTotalPages(response.data.totalPages)
        // setLoading(false)
      }
    } catch (error) {
      console.log('error at retail list fetch', error);
      // setLoading(false)
      toast.error('Please try again')
    }
  }

  const handleToggle = async (productionId: string, currentIsBlocked: boolean) => {
    console.log('production', productionId);
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
        <div className='text-center pb-5'>
          <h1 className='text-2xl' style={{ fontFamily: 'cursive' }}>VERIFIED RETAILER FIRMS</h1>
        </div>
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                Sl.No.
              </th>
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
                Toggle
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
                <td className="px-6 py-3 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {retail?.retailerName ?? ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {retail.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {retail.isBlocked ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={retail.isBlocked}
                      onChange={() => handleToggle(retail._id, retail.isBlocked)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='text-center justify-center flex space-x-5 pt-5'>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='border rounded-full p-2 shadow-sm  hover:bg-black hover:text-white'>Prev</button>
          <p className='pt-2'>{currentPage}</p>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className='border rounded-full p-2 shadow-sm hover:bg-black hover:text-white'>Next</button>
        </div>
      </div>
    </div>
  )
}

export default Retailerlist