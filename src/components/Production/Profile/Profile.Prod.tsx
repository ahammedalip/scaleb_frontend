import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast';
// import './ProfileProd.css'

type Item = {
  id: string;
  name: string;
};

const  ProfileProd: React.FC= ()=> {

  const [profileName, setProfileName] = useState('')
  const [description, setDescription] = useState('')
  const [items, setItems] = useState<Item[]>([])
  const [showInput, setShowInput] = useState(false); 
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {

    fetchUserData()

  }, [])

  const fetchUserData = async () => {
    try {
      const response = await api.get('/production/profile')

      const userDetails = response.data;
      console.log(userDetails.userDetails);
      setProfileName(userDetails.userDetails.productionName)
      setDescription(userDetails.userDetails.description)

      // const transformedItems = userDetails.userDetails.availableItems.map((item:any, index:number) => ({
      //   id: index.toString(), 
      //   name: item, 
      // }));

      // setItems(transformedItems)

      setItems(userDetails.userDetails.availableItems)

    } catch (error) {
      console.log('error at fetching user profile details', error);
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
            {items.map((item:{
              
            },index) => {
              return(
              <div key={index}  className='bg-slate-300 rounded-md array-of-items'>
                <h1 className='p-2'>{item}</h1>
              </div>
            )})}
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
    </div>
  )
}

export default ProfileProd
