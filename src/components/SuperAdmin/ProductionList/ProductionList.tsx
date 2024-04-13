import { useEffect, useState } from 'react'
import api from '../../../axios/api'
import { jwtDecode } from 'jwt-decode'
import ClipLoader from 'react-spinners/ClipLoader'
import toast from 'react-hot-toast';

interface ProductionItem {
  _id: string;
  productionName: string;
  email: string;
  isBlocked: boolean;

}

interface JwtPayload {
  id: string
}

function Productionlist() {
  const [loading, setLoading] = useState(false)
  const [adminId, setAdminId] = useState('')
  const [productionList, setProductionList] = useState<ProductionItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  useEffect(() => {
    getToken()
    getProductionList()
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

  const getProductionList = async (page = 1) => {

    try {
      setLoading(true)
      const response = await api.get(`/admin/production_list?id=${adminId}&page=${page}`)
      const productionList = response.data

      console.log('production list', productionList.userlist);
      if (response.data.success) {
        console.log(response.data)
        setProductionList(productionList.userlist)
        setTotalPages(response.data.totalPages)
        setLoading(false)
      }
    } catch (error) {
      console.log('error at production list fetch', error);
      setLoading(false)
      toast.error('Please refresh page')
    }

  }

  const handleToggle = async (productionId: string, currentIsBlocked: boolean) => {
    console.log('production', productionId);
    setProductionList(productionList.map(item => {
      if (item._id === productionId) {
        return { ...item, isBlocked: !currentIsBlocked };
      }
      return item;
    }));
    try {
      setLoading(true)
      const response = await api.put(`/admin/toggle_block_update?id=${productionId}&role=production`)
      if (response.status === 200) {
        // Assuming the API returns the updated production list
        const updatedProductionList = response.data.userlist;
        setProductionList(updatedProductionList);
        setLoading(false)
      } else {
        console.error('Failed to toggle block status');
        setLoading(false)
        toast.error('Failed to toggle, please try again later')
      }
    } catch (error) {
      console.error('Error toggling block status:', error);
      setLoading(false)
      toast.error('Please try later')
    }
  };

  return (

    <div className='bg-white ml-10 shadow-lg rounded-lg p-4'> {/* Add padding here */}
      <div className="overflow-auto">
        <div className='text-center pb-5'>

          <h1 className='text-2xl' style={{ fontFamily: 'cursive' }}>VERIFIED PRODUCTION FIRMS</h1>
        </div>
        <table className="min-w-full divide-y divide-gray-200 border rounded-md">
          {/* ... rest of your table code ... */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                Sl. No.
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
            {loading ? (
              <div>
                <ClipLoader></ClipLoader>
              </div>
            ) : (
              <>
                {productionList.map((retail:
                  {
                    _id: string,
                    productionName: string,
                    email: string,
                    isBlocked: boolean
                  },
                  index: number
                ) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {retail?.productionName ?? ""}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {retail.email}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {retail.isBlocked ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
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
              </>
            )}

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

export default Productionlist