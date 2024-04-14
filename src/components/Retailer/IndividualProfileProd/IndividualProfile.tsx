import React, { useEffect, useState } from 'react'
import api from '../../../axios/api'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { jwtDecode } from 'jwt-decode';
import ClipLoader from "react-spinners/ClipLoader";
import img from "../../../../public/images/Product_pro.png"

// import './ProfileProd.css'

interface JwtPayload {
  id: string;
}

const IndProfileProd: React.FC = () => {
  const [loading, setLoading] = useState(false)
  // const [retailerid, setRetailerId] = useState('')
  const [profileName, setProfileName] = useState('')
  const [description, setDescription] = useState('')
  const [items, setItems] = useState([])
  const [id, setId] = useState<number>()
  const [connected, setConnected] = useState<boolean>(false)
  const location = useLocation();
  const [ratingValue, setRatingValue] = React.useState<number | null>(2);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0)

  useEffect(() => {

    fetchUserData()

  }, [])

  const navigate = useNavigate()

  const fetchUserData = async () => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const view = params.get('view')
    // console.log(id, view);
    if (view) {
      console.log('show only if view appears');
      setConnected(true)
    }
    try {
      setLoading(true)
      const response = await api.get(`/retailer/prod/profile?id=${id}`)

      const userDetails = response.data;

      if (userDetails.success == true) {
        setProfileName(userDetails.userDetails.productionName)
        setDescription(userDetails.userDetails.description)
        setId(userDetails.userDetails._id)
        setItems(userDetails.userDetails.availableItems)
        setRating(userDetails.rating)
        setLoading(false)
      }
    } catch (error) {
      console.log('error at fetching user profile details', error);
      setLoading(false)
      toast.error('please try again')
    }
  }

  const handleRequest = async (prodId: number) => {
    // console.log('from here', prodId);
    try {
      const response = await api.post('/retailer/conn-req', { prodId })
      console.log(response.data)
      if (response.data.success == true) {
        if (response.data.message == 'already requested') {
          toast.success('Already requested')
        } else {
          toast.success('Requested successfully')
        }
      } else if (response.data.success == false && response.data.message == 'not_subscribed') {
        toast.error('Purchase premium plan to access this feature')
        navigate('/retail/subscription-plans')
      }
    } catch (error) {
      console.error('Error making the request:', error);
    }
  }

  const handleRatingChange = (event: React.ChangeEvent<{}>,newValue: number | null) => {
    if (newValue !== null) {
      setRatingValue(newValue);
      console.log(event)
    }
  };

  const handleReviewTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  };

  const handleShareReview = async () => {
    console.log('rating value', ratingValue, 'review text', reviewText)
    console.log('id of opposit', id)
    const token = localStorage.getItem('retailer_token')
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      console.log('decoded token', decodedToken)
      const retailerId = decodedToken.id

      try {
        const response = await api.post('/review/submit?reviewer=retailer&reviewee=productionUnit', {
          reviewerId: retailerId,
          revieweeId: id,
          rating: ratingValue,
          review: reviewText,
        });
        console.log(response.data);
        if (response.data.success) {
          toast.success('Successfully Shared Review')
        }

      } catch (error) {
        console.error('Error sharing review:', error);
        toast.error('Please try again')
      }
    }
  };


  return (
    <div className='bg-white rounded-lg shadow-lg flex flex-col pt-7 items-center space-y-4 justify-center  mainClass pb-3'>
      {loading ? (
        <div>
          <ClipLoader color="rgb(10, 10, 10)" size={60} />
        </div>
      ) : (
        <>
          <div className='flex pt-3 items-center justify-evenly space-x-5 bg-pink-50/40 rounded-3xl p-5 '>
            <div className='text-center pt-3'>
              <img src={img} alt="" className='w-36 rounded-full shadow-slate-800 shadow-md' />
            </div>
            <div>
              <h1 className='text-center font-bold  productionName' style={{ fontSize: '32px' }}>{profileName} </h1>
              <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
            </div>
            {!connected ? (
              <div>
                <button className='bg-blue-500 p-2 rounded-md shadow-md text-white hover:bg-blue-800' onClick={() => id && handleRequest(id)}>Send connection request</button>
              </div>
            ) : null}
          </div>


          <div className='p-5 '>
            <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center description min-w-80'>
              <div>
                <h1 className='pb-4 font-bold'>About</h1>
              </div>
              <h2 className='description min-h-16 '>
                {description}
              </h2>
            </div>
          </div>
          <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-3box-border text-center'>
            <h1 className='p-3 font-semibold'>Available Items</h1>
            <div className='flex'>
              <div className='space-x-3 flex p-3'>
                {items.map((item: string, index: number) => {
                  return (
                    <div key={index} className='bg-slate-300 rounded-md array-of-items'>
                      <h1 className='p-2'>{item}</h1>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {connected ? (
            <div className='border border-gray-300 flex flex-col items-center space-y-3 p-3 rounded-md'>
              <div className='w-full flex justify-center'>
                <h1 className='text-center font-sans'>Post your review</h1>
              </div>
              <div className='w-full flex justify-between items-center'>
                <div className='flex flex-col items-center'>
                  <Stack spacing={1}>
                    <Rating name="half-rating" defaultValue={0}
                      precision={0.5}
                      size='large'
                      onChange={(event, newValue)=>{ handleRatingChange(event,newValue)}} />
                  </Stack>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        id="outlined-textarea"
                        label="Review"
                        placeholder="Write your review.."
                        multiline
                        onChange={handleReviewTextChange}
                      />
                    </div>
                  </Box>
                </div>
                <div>
                  <button className='border rounded-full bg-slate-400 hover:bg-black hover:text-white p-2' onClick={handleShareReview}>Share review</button>
                </div>
              </div>
            </div>
          ) : null}

        </>
      )}
    </div>
  )
}

export default IndProfileProd
