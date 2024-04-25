import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader'
// import './ProfileProd.css'
import img from "../../../../public/images/Product_pro.png"
import { FaRegEdit } from "react-icons/fa";


const ProfileProd: React.FC = () => {

  const [profileName, setProfileName] = useState('')
  const [description, setDescription] = useState('')
  const [items, setItems] = useState([])
  const [showInput, setShowInput] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editedDescription, setEditedDescription] = useState('')
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])



  const fetchUserData = async () => {

    try {
      setLoading(true)
      const response = await api.get('/production/profile')
      if (response.data.success) {
        const userDetails = response.data;
        console.log('userdetails', userDetails.userDetails);
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

  const handleModalOpen = async () => {
    setEditedDescription(description)
    setShowModal(true)
  }

  const handleModalClose = async () => {
    setEditedDescription('')
    setShowModal(false)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(e.target.value)
  }

  const addItem = () => {
    setShowInput(true);
  };

  const saveDescription = async () => {
    try {
      setModalLoading(true)
      const response = await api.post('/production/update-desc', { description: editedDescription });
      console.log(response.data);
      if (response.data.success) {

        setDescription(editedDescription); // Update the description in the UI
        setShowModal(false); // Close the modal
        setModalLoading(false)
        toast.success('Description updated successfully');
      }
    } catch (error) {
      console.error('Error updating description:', error);
      toast.error('Failed to update description. Please try again.');
      setModalLoading(false)
    }
  }

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
          {/* <div className='bg-slate-400 w-full h-12'>
            <p>hello</p>
           
          </div> */}

          <div className='text-center pt-7'>
            <img src={img} alt="" className='w-36 rounded-xl shadow-slate-800 shadow-md' />
          </div>
          <h1 className='text-center font-bold  p-5 productionName' style={{ fontSize: '32px' }}>{profileName} </h1>
          <div className='p-8'>
            <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center description min-w-80'>
              <div>
                <h1 className='pb-4 font-bold'>About</h1>
                <h2 className='description min-h-16 '>
                  {description}
                </h2>
                <button onClick={handleModalOpen}><FaRegEdit /></button>
              </div>
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

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white w-9 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 w-full sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 ">Edit Description</h3>
                    <div className="mt-2 w-full">
                      <textarea
                        value={editedDescription}
                        onChange={handleDescriptionChange}
                        rows={4}
                        className="resize-none border rounded-md p-2 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  disabled={modalLoading}
                  onClick={saveDescription}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                 { modalLoading ? <ClipLoader/> : 'Save'}
                </button>
                <button
                  onClick={handleModalClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div >
  )
}

export default ProfileProd
