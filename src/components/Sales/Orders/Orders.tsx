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
import { FormHelperText } from '@mui/material';
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

interface Order {
  _id: string
  productionName: string;
  // productionId: string;
  salesExec: string;
  retailerId: string;
  scheduledDate: Date;
  imageURL: string[];
  quantity: number;
  status: string;
  blocked: boolean;
  accepted: boolean;
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Dayjs | null>();
  const [quantity, setQuantity] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [images, setImages] = useState<File[]>([]);
  const [orderId, setOrderId] = useState<string>('')
 


  const [errorMessages, setErrorMessages] = useState({
    production: '',
    product: '',
    date: '',
    quantity: '',
  });


  const handleOpen = (order: Order) => {
    setOrderId(order._id)
    setSelectedOrder(order);
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


  useEffect(() => {
    fetchOrders();
  }, []);


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
        toast.success('Update request sent.')
      } else {
        toast.error('Something went wrong, Please try again')
      }

    } catch (error) {
      toast.error('Something went wrong')

    }
  }

  const fetchOrders = async () => {
    const response = await api.get('/sales/orders');
    const result = response.data;
    if (result.success === true) {
      setOrders(result.orders); // Assuming result.orders contains the array of orders
    }
  };



  return (
    <div className='bg-white rounded-md shadow-md'>
      <div className='text-center'>
      <CreateOrder onOrderCreated={fetchOrders} />
      </div>

      {orders.length > 0 ? (
        <div className='p-6 text-center space-y-4 pb-5 '>
          <div className='underline  '>
            <h1 className='font-bold'>Orders</h1>
          </div>

          {orders.map((order: Order, index) => (
            <div key={index} className='bg-gray-200 rounded-md p-5 space-y-3 border-gray-300 border '>
              <div className='flex justify-between'>


                <div className='flex items-center space-x-4 pl-10'>
                  <h1 className='font-semibold' >Production:  {order.productionId.productionName}</h1>
                  <img src="../../../../public/images/profileC.png" alt="" className='w-9' />
                </div>

                <div>
                  <Button onClick={() => handleOpen(order)}>Edit Order</Button>
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
                            error={!!errorMessages.quantity}
                            helperText={errorMessages.quantity}
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
                        <Button variant="outlined" sx={{ borderColor: '#b83280', color: '#b83280' }} onClick={handleUpdateRequest}> Request Update</Button>
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
                {order.updateRequest ? (
                  <div className='p-2'>
                    <h2 className='text-pink-600'>Requested for updating order</h2>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='p-3'>
          <h1>Sorry, your order is empty</h1>
        </div>
      )}
    </div>
  );
}

export default ExistingOrders;
