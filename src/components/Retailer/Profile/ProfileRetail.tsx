import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import img from '../../../../public/images/Product_pro.png'
import toast from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import { FaRegEdit } from "react-icons/fa";


// import './ProfileProd.css'


const ProfileRet: React.FC = () => {

  const [profileName, setProfileName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false);
  const [editedDescription, setEditedDescription] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await api.get('/retailer/profile')

      const userDetails = response.data;
      console.log(userDetails.userDetails);
      setProfileName(userDetails.userDetails.retailerName)
      setDescription(userDetails.userDetails.description)
      setLoading(false)
    } catch (error) {
      console.log('error at fetching user profile details', error);
      setLoading(false)
      toast.error('please refresh again')
    }
  }

  const openModal = () => {
    setShowModal(true);
    setEditedDescription(description)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditedDescription('')
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(e.target.value)
  }

  const saveDescription = async () => {
    try {
      setModalLoading(true)
      const response = await api.post('/retailer/update-desc', { description: editedDescription })
      if (response.data.success) {
        setDescription(editedDescription)
        setModalLoading(false)
        setShowModal(false)
        toast.success('Description updated succesfully')
      }
    } catch (error) {
      toast.error('Please try again later')
      console.log('Error while changing description')
      setModalLoading(false)
    }
  }


  return (
    <div className='bg-slate-100 rounded-lg shadow-lg flex flex-col items-center justify-center mainClass overflow-y-auto pb-3'>
      <div className='text-center pt-7'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <ClipLoader />
          </div>
        ) : (

          <img src={img} alt="" className='w-36 rounded-xl shadow-slate-800 shadow-md' />
        )}
      </div>
      <h1 className='text-center font-bold  p-5 productionName' style={{ fontSize: '32px' }}>{profileName} </h1>
      <div className='p-8'>
        <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center description min-w-80'>
          <div>
            <h1 className='pb-4 font-bold'>About</h1>
          </div>
          {loading ? (
            <div className='flex justify-center items-center'>
              <ClipLoader />
            </div>
          ) : (
            <h2 className='description min-h-16 '>
              {description}
            </h2>
          )}
          <button onClick={openModal}><FaRegEdit /></button>

        </div>
      </div>

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
                 {modalLoading ? <ClipLoader/> : 'Save'}
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProfileRet
