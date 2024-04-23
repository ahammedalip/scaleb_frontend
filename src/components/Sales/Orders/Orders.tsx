import React, { useEffect, useState } from 'react';
import api from '../../../axios/api';
import { app } from '../../../firebase/firebaseConfig'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CreateOrder from './CreateOrder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClipLoader from "react-spinners/ClipLoader";
import FileUploader from './FileUploader';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';



const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Production {
  productionId: string;
  productionName: string
}

interface Order {
  _id: string
  productionName: string;
  productionId: Production;
  salesExec: string;
  retailerId: string;
  scheduledDate: Date;
  imageURL: string[];
  quantity: number;
  status: string;
  blocked: boolean;
  accepted: string;
  description: string;
  item: string;
  updateRequest: string;

}

interface UpdateOrder {
  orderId: string;
  scheduledDate: Dayjs | null | undefined;
  description: string;
  quantity: number;
  urls?: string[];
}

function ExistingOrders() {
  const [orders, setOrders] = useState([]);
  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Dayjs | null>();
  const [quantity, setQuantity] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [images, setImages] = useState<File[]>([]);
  const [orderId, setOrderId] = useState<string>('')
  const [deletemodal, setDeleteModal] = React.useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)


  const handleOpen = (order: Order) => {
    setOrderId(order._id)
    // setSelectedOrder(order);
    setDate(dayjs(order.scheduledDate));
    setQuantity(order.quantity);
    setDescription(order.description);
    setOpen(true)
    console.log(orderId)
  }

  const handleClose = () => {
    fetchOrders()
    setOpen(false);
  }

  const handleDeleteModalOpen = () => {
    setDeleteModal(true)
  }

  const handleDeleteModalClose = () => {
    setDeleteModal(false)
  }

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);


  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue > 0) {
      setQuantity(newValue);
    }
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }


  const handleUpdateRequest = async () => {
    const storage = getStorage(app);
    const storageRef = ref(storage)
    const imagePromises = images.map((image) => {
      const fileName = `Orders/${new Date().getTime()}_${image.name}`
      const imageRef = ref(storageRef, fileName);
      return uploadBytes(imageRef, image).then((snapshot) => {
        console.log('uploaded a blob or file', snapshot);
        return getDownloadURL(snapshot.ref)
      })
    })
    try {
      const urls: string[] = await Promise.all(imagePromises);

      const updatedOrderData: UpdateOrder = {
        orderId,
        scheduledDate: date, quantity, description,
      }
      if (urls.length > 0) {
        updatedOrderData.urls = urls;
      }

      const request = await api.patch('/sales/edit-order', updatedOrderData)
      const response = request.data
      if (response.success) {
        fetchOrders()
        toast.success('Order edited succesfully')
        handleClose()
      } else {
        toast.error('Something went wrong, Please try again')
        handleClose()
      }

    } catch (error) {
      toast.error('Something went wrong')

    }
  }


  const fetchOrders = async (page: number = 1) => {
    setLoading(true)
    try {
      const response = await api.get(`/sales/orders?page=${page}`);
      const result = response.data;
      if (result.success === true) {
        setOrders(result.orders); // Assuming result.orders contains the array of orders
        setTotalPages(result.totalPages)
        setLoading(false)
      }
    } catch (error) {
      console.log('error while fetching data')
      setLoading(false)
      toast.error('Error while fetching data, please refresh the page.')
    }

  };

  const handleDelete = async (orderId: string) => {
    const deleteOrder = {
      orderId
    };
    const request = await api.delete('/sales/deleteOrder', { data: deleteOrder });
    const response = request.data;
    if (response.success) {
      toast.success('Order successfully deleted!')
      handleDeleteModalClose()
      fetchOrders(1)
    }
  }

  const handleEditRequest = async (orderId: string) => {
    const id = {
      orderId
    }
    try {
      const request = await api.patch('/sales/edit-req', id)
      const response = request.data;
      if (response.success) {
        toast.success("Requested for editing")
      }
    } catch (error) {
      console.log('error at sending edit request', error)
      toast.error('Something went wrong, please try again')
    }
  }

  // onOrderCreated={fetchOrders}
  return (
    <div className='bg-white rounded-md shadow-md'>
      <div className='text-center'>
        <CreateOrder />
      </div>
      {loading ? (
        <div className='flex items-center justify-center h-96 '>
          <ClipLoader color="rgb(10, 10, 10)" size={60} />
        </div>
      ) : (


        <>
          {orders.length > 0 ? (
            <div className='p-6 text-center space-y-4 pb-5 '>
              <div className='underline  '>
                <h1 className='font-bold'>Orders</h1>
              </div>



              <div>
                {orders.map((order: Order, index) => (
                  <div key={index} className='bg-gray-200 rounded-md p-5 space-y-3 border-gray-300 border '>
                    <div className='flex justify-between'>


                      <div className='flex items-center space-x-4 pl-10'>
                        <h1 className='font-semibold' >Production:  {order.productionId.productionName}</h1>
                        <img src="../../../../public/images/profileC.png" alt="" className='w-9' />
                      </div>

                      <div>
                        {order.accepted == 'Rejected' ? (
                          <div>
                            {/* <Button onClick={handleDeleteModalOpen}>Delete Order</Button> */}
                            <button onClick={handleDeleteModalOpen} className='border-2 hover:bg-red-600 hover:text-white rounded-md shadow-md p-2 bg-white border-red-700 transition duration-300 ease-in-out'>Delete Order</button>
                            <Modal
                              open={deletemodal}
                              onClose={handleDeleteModalClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={modalStyle}>

                                <Typography id="modal-modal-description" className='text-center space-y-3' sx={{ mt: 2 }}>
                                  <h1 className='text-red-700 text-xl'>Are you sure you want to delete this order?</h1>
                                  <button onClick={() => handleDelete(order._id)} className='p-2 bg-red-600 text-white hover:bg-red-700 rounded-md shadow-md '>Delete Order</button>

                                </Typography>
                              </Box>
                            </Modal>
                          </div>
                        ) : order.status === 'Pending' && order.accepted === 'Yes' && (order.updateRequest !== 'Requested' && order.updateRequest !== 'Granted') ? (
                          <button className='border-2  bg-white hover:bg-pink-700/95 hover:text-white border-pink-700 p-2 rounded-md ease-linear transition-all duration-150' onClick={() => handleEditRequest(order._id)}>Request for Editing</button>
                        ) : order.updateRequest === 'Granted' ? (
                          <button className='border-2  bg-white hover:bg-pink-700/95 hover:text-white border-pink-700 p-2 rounded-md ease-linear transition-all duration-150' onClick={() => handleOpen(order)}>Edit Order</button>
                        ) : null}
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"

                        >
                          <Box sx={modalStyle} >
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              Edit Order Details
                            </Typography>
                            <div className='p-2 space-y-5'>

                              <div className='w-fit pl-2'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={['DatePicker', 'DatePicker']}>

                                    <DatePicker

                                      label="Select Date"
                                      value={date}
                                      onChange={(newValue) => setDate(newValue)}
                                      disablePast
                                    />

                                  </DemoContainer>
                                  {/* {errorMessages.date && <FormHelperText><span className='text-red-600/80 pl-4'>{errorMessages.date}</span></FormHelperText>} */}
                                </LocalizationProvider>
                              </div>

                              <div className='quantity-div p-2'>
                                <TextField
                                  required
                                  label="Quantity"
                                  type="number"
                                  value={quantity}
                                  onChange={handleQuantity}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                // error={!!errorMessages.quantity}
                                // helperText={errorMessages.quantity}
                                />
                              </div>

                              <div className='px-2'>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Description"
                                  multiline
                                  value={description}
                                  rows={4}

                                  fullWidth
                                  onChange={handleDescription}
                                />
                              </div>

                              <div className='pl-2'>
                                <FileUploader images={images} setImages={setImages} />
                              </div>

                            </div>
                            <div className='text-center p-2'>
                              <Button variant="outlined" sx={{ borderColor: '#b83280', color: '#b83280' }} onClick={handleUpdateRequest}> Edit Order</Button>
                            </div>
                          </Box>
                        </Modal>
                      </div>

                    </div>

                    <div className='flex justify-evenly'>
                      <h1>Item: {order.item}</h1>
                      <h1>Quantity: {order.quantity}</h1>
                      <h1>Delivery: {new Date(order.scheduledDate).toLocaleDateString()}</h1>
                      <h1>Status: {order.status}</h1>
                      <h1>Accepted: {order.accepted.toString()}</h1>
                    </div>
                    <div className='px-5 p-2 bg-gray-100 rounded-lg'>
                      <h1 className='text-left pl-2'>Description:</h1>
                      <p className='text-left pl-2'>{order.description}</p>
                    </div>
                    <div className='px-5'>
                      <h1>Images:</h1>
                      <div className='flex space-x-3 justify-center'>
                        {order.imageURL.map((url, idx) => (
                          <img key={idx} src={url} alt="" className=' bg-white w-32 h-32 rounded-md shadow-lg object-cover' />
                        ))}
                      </div>
                    </div>
                    <div>
                      {order.updateRequest === 'Requested' ? (
                        <div className='p-2'>
                          <h2 className='text-pink-600'>Requested for updating order</h2>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

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

          ) : (
            <div className='p-3'>
              <h1>Sorry, your order is empty</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ExistingOrders;
