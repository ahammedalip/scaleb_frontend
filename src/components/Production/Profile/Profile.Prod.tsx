import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader'
// import './ProfileProd.css'



const ProfileProd: React.FC = () => {

  const [profileName, setProfileName] = useState('')
  const [description, setDescription] = useState('')
  const [items, setItems] = useState([])
  const [showInput, setShowInput] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    fetchUserData()

  }, [])

  const fetchUserData = async () => {

    try {
      setLoading(true)
      const response = await api.get('/production/profile')
      if (response.data.success) {
        const userDetails = response.data;
        console.log('userdetails',userDetails.userDetails);
        setProfileName(userDetails.userDetails.productionName)
        setDescription(userDetails.userDetails.description)
        setItems(userDetails.userDetails.availableItems)
        setLoading(false)
      }
    } catch (error) {
      console.log('error at fetching user profile details', error);
      setLoading(false)
      toast.error('Please try again')
    }
  }

  const addItem = () => {
    setShowInput(true);
  };

  const saveItem = async () => {
    // Assuming you have an API endpoint to add a new item
    try {
      const response = await api.post('/production/addItem', { name: newItemName });
      console.log(response.data);
      const details = response.data;
      setItems(details.userDetails.availableItems)
      // setItems([...items, { id: response.data.id, name: newItemName }]);
      fetchUserData()
      setShowInput(false);
      setNewItemName('');
      toast.success('Item Saved')
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-lg flex flex-col items-center justify-center mainClass overflow-y-auto pb-3'>
      {loading ? (
        <div>
          <ClipLoader color="rgb(10, 10, 10)" size={60} />
        </div>
      ) : (
        <>
          <div className='text-center pt-7'>
            <img src="../../../../public/images/Product_pro.png" alt="" className='w-36 rounded-xl shadow-slate-800 shadow-md' />
          </div>
          <h1 className='text-center font-bold  p-5 productionName' style={{ fontSize: '32px' }}>{profileName} </h1>
          <div className='p-8'>
            <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center description min-w-80'>
              <div>
                <h1 className='pb-4 font-bold'>About</h1>
              </div>
              <h2 className='description min-h-16 '>
                {description}
              </h2>
            </div>
          </div>
          <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center'>
            <h1 className='p-3 font-semibold'>Available Items</h1>


            <div className='flex'>
              <div className='space-x-3 flex p-3'>
                {items.map((item, index) => {
                  return (
                    <div key={index} className='bg-slate-300 rounded-md array-of-items'>
                      <h1 className='p-2'>{item}</h1>
                    </div>
                  )
                })}
              </div>
            </div>
            <button className='bg-pink-600/65 p-2 rounded-md text-white shadow-lg pb-3' onClick={addItem}>
              Add Item
            </button>
            {showInput && (
              <div className='flex items-center p-3'>
                <input
                  type='text'
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder='New item name'
                  className='p-2 border-2 rounded-md space-x-4'
                />
                <button className='bg-blue-500 text-white p-2 rounded-md '
                  onClick={saveItem}
                  disabled={!newItemName}>
                  Save
                </button>
              </div>
            )}
          </div>
        </>
      )}

    </div >
  )
}

export default ProfileProd
