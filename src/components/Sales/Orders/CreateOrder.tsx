import React, { useState, useEffect } from 'react'
import api from '../../../axios/api'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import FileUploader from './FileUploader';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../../firebase/firebaseConfig'
import { FormHelperText } from '@mui/material';
import toast from 'react-hot-toast';

interface Production {
  _id: string;
  productionName: string;
  availableItems: string[];
}
interface Order {
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

}

interface CreateOrderProps {
  orderToEdit?: Order; // Assuming you have an Order interface defined
  isEditMode?: boolean;
 }

function CreateOrder({ onOrderCreated }) {
  const [createOrder, setCreateOrder] = useState<boolean>(false);
  const [availableProduction, setAvailableProduction] = useState<Production[]>([]);
  const [selectedProduction, setSelectedProduction] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('')
  const [date, setDate] = React.useState<Dayjs | null>();
  const [quantity, setQuantity] = useState<number>(0)
  const [images, setImages] = useState<File[]>([]);
  const [downloadURLs, setDownloadURLs] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('')
  const [errorMessages, setErrorMessages] = useState({
    production: '',
    product: '',
    date: '',
    quantity: '',
  });




  const resetForm = () => {
    setCreateOrder(false);
    setSelectedProduction('');
    setSelectedProduct('');
    setDate(null);
    setQuantity(0);
    setImages([]);
    setDownloadURLs([]);
    setErrorMessages({
      production: '',
      product: '',
      date: '',
      quantity: '',
    });
    setDescription('');
  };


  const fetchApi = async () => {
    const response = await api.get('/sales/available-prod')
    const result = response.data;
    if (result.success == true) {
      console.log('result her', result.availableProduction);
      setAvailableProduction(result.availableProduction)
    }
  }

  const handleCreateOrder = () => {
    setCreateOrder(!createOrder)
    fetchApi()
  }

  const handleProductionCompany = (event: SelectChangeEvent) => {
    setSelectedProduction(event.target.value);
    setSelectedProduct('')
  };

  const handleProduct = (event: SelectChangeEvent) => {
    setSelectedProduct(event.target.value)
  }

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue > 0) {
      setQuantity(newValue);
    }
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const availableItems = availableProduction.find(
    (production: {
      _id: string
    }) => production._id === selectedProduction
  )?.availableItems || [];

  const submitOrder = async () => {

    let errors = { ...errorMessages };
    let hasError = false;

    if (!selectedProduction) {
      errors.production = 'This field is required.';
      hasError = true;
    }
    if (!selectedProduct) {
      errors.product = 'This field is required.';
      hasError = true;
    }
    if (!date) {
      errors.date = 'This field is required.';
      hasError = true;
    }
    if (quantity <= 0) {
      errors.quantity = 'This field is required.';
      hasError = true;
    }

    if (hasError) {
      setErrorMessages(errors);
      return
    }
    // console.log('images are ->', images)

    const storage = getStorage(app)
    const storageRef = ref(storage)
    const imagePromises = images.map((image) => {
      // file name with time+filename
      const fileName = `Orders/${new Date().getTime()}_${image.name}`;
      const imageRef = ref(storageRef, fileName);
      return uploadBytes(imageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        return getDownloadURL(snapshot.ref);
      });

    });

    try {
      const urls: string[] = await Promise.all(imagePromises);
      console.log('All images uploaded successfully');

      const response = await api.post('/sales/createOrder', { productionId: selectedProduction, selectedProduct, scheduledDate: date, quantity, urls, description }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = response.data
      console.log('result is ', result);
      if (result.success == true) {
        setCreateOrder(false)
        toast.success('Order Created!')
        resetForm()
        onOrderCreated();
      }

    } catch (error) {
      console.error('Image upload failed', error);

    }
  }



  return (
    <div className='bg-white p-3'>


      <div className='p-3'>

        <button className='p-2 border-2 border-pink-500 rounded-md  shadow-md hover:bg-pink-700 hover:text-white ease-linear transition-all duration-150'
          onClick={handleCreateOrder}>Create New Order
        </button>
      </div>

      {createOrder ? (

        <div>
          <div className='text-right pr-5'>
            <span className='hover:shadow-lg px-2 hover:border-2 border-gray-400' style={{ fontSize: '32px', cursor: 'pointer' }} onClick={() => setCreateOrder(!createOrder)}>x</span>
          </div>
          < div className='bg-gray-100 p-5 rounded-md space-y-4'>

            <div>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth1-label">Production Unit</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth1-label"
                  id="demo-simple-select-autowidth1"
                  value={selectedProduction}
                  onChange={handleProductionCompany}
                  autoWidth

                  label="Production Unit"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {availableProduction.map((production: Production) => (
                    <MenuItem key={production._id} value={production._id}>
                      {production.productionName}
                    </MenuItem>
                  ))}
                </Select>
                {errorMessages.production && <FormHelperText><span className='text-red-600/85'>{errorMessages.production} </span></FormHelperText>}
              </FormControl>
            </div>


            <div>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Select Product</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={selectedProduct}
                  onChange={handleProduct}
                  autoWidth
                  required
                  label="Production Unit"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {availableItems.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {errorMessages.product && <FormHelperText><span className='text-red-600/85'>{errorMessages.product}</span></FormHelperText>}
              </FormControl>
            </div>



            <div className='flex space-x-6'>


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
                  {errorMessages.date && <FormHelperText><span className='text-red-600/80 pl-4'>{errorMessages.date}</span></FormHelperText>}
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
            </div>

            <div className='px-2'>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                defaultValue="Write your description here..."
                fullWidth
                onChange={handleDescription}
              />
            </div>
            <div className='pl-2'>
              <FileUploader images={images} setImages={setImages} />
            </div>
            <div className='pl-2'>
              <button className='bg-pink-500 p-2 rounded-md shadow-md text-white' type='submit' onClick={submitOrder}>Create Order</button>
            </div>

          </div>
        </div>

      ) : null}


    </div>
  )
}

export default CreateOrder