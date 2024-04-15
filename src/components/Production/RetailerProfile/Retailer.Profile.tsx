import { useEffect, useState } from 'react'
import api from '../../../axios/api'
import toast from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import img from "../../../../public/images/shop-icon.jpg"

interface Profile {
  retailerName: string;
  description: string;
  _id: string

}

export default function RetailerProf() {
  const [productionId, setProductionId] = useState('')
  const [profileDetails, setProfileDetails] = useState<Profile>({} as Profile)
  const [loading, setLoading] = useState(false)
  const [displayReqButton, setDisplayReqButton] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [ratingValue, setRatingValue] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [retailerId, setRetailerId] = useState('')
  const [rating, setRating] = useState(0)


  useEffect(() => {
    fetchUserData()
  }, [productionId])

  const navigate = useNavigate()
  const fetchUserData = async () => {

    const params = new URLSearchParams(location.search)
    const retailId = params.get('id')
    if (retailId) {
      setRetailerId(retailId)
    }
    const token = localStorage.getItem('production_token');
    if (token) {
      const decoded = decodeJWT(token)
      // console.log(decoded)
      // const productionId = decoded.id
      setProductionId(decoded.id)
    }

    try {
      // console.log('production id from try top', productionId)
      setLoading(true)
      const response = await api.get(`/production/ret-profile?id=${retailId}`)
      if (response.data.success) {
        const profileData = response.data.retailerProfile
        setProfileDetails(profileData)
        setRating(response.data.rating)
        const isProductionIdInConnectedProduction = profileData.connectedProduction.includes(productionId);
        setDisplayReqButton(!isProductionIdInConnectedProduction);

        setLoading(false)
      }
    } catch (error) {
      console.log('error at fetching user profile details', error);
      setLoading(false)
      toast.error('please try again')
    }
  }

  const handleSendRequest = async () => {
    try {
      // setLoadingButton(true)
      const data = {
        productionId,
        retailId: profileDetails._id
      }
      const response = await api.patch('/production/conn-req', data)
      if (response.data.success && response.data.message == 'not_subscribed') {
        navigate('/production/subscription')
        toast.error('Please subscribe to get premium feature')
      }
      else if (response.data.success) {
        setLoadingButton(false)
        setDisplayReqButton(!displayReqButton)
        toast.success(response.data.message)
      }

    } catch (error) {
      console.log('error while sending connection request')
      toast.error('Error sending request, please try later!')
    }
  }



  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
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
    console.log('id of opposit', retailerId)
    if (ratingValue == 0) {
      toast.error('Minimum rating is 1')
      return
    }
    if (reviewText.length == 0) {
      toast.error('Type review')
      return
    }
    const token = localStorage.getItem('production_token')
    if (token) {
      const decodedToken = decodeJWT(token);
      console.log('decoded token', decodedToken)
      const productionId = decodedToken.id

      try {
        const response = await api.post('/review/submit?reviewer=productionUnit&reviewee=retailer', {
          reviewerId: productionId,
          revieweeId: retailerId,
          rating: ratingValue,
          review: reviewText,
        });
        console.log(response.data);
        if (response.data.success) {
          setRatingValue(0)
          setReviewText('')
          toast.success('Successfully Shared Review')
        }

      } catch (error) {
        console.error('Error sharing review:', error);
        toast.error('Please try again')
      }
    }
  };


  function decodeJWT(token: string) {

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    // Decode the Base64 string to a JSON object
    const payload = JSON.parse(window.atob(base64));

    return payload;
  }


  return (
    <div className='bg-white rounded-lg shadow-lg flex flex-col items-center justify-center overflow-y-auto pb-3  sm:w-9/12 pt-4'>
      {loading ? (
        <div className='p-5  h-40 flex flex-col items-center justify-center'>
          <ClipLoader color="rgb(10, 10, 10)" size={60} />
        </div>
      ) : (
        <>
          <div className='flex justify-between items-center rounded-md p-8 bg-slate-100'>
            <div>
              <img src={img} alt="" className='w-36 rounded-xl shadow-slate-800 shadow-md' />
            </div>
            <div className='pl-3'>
              <h1 className='text-center font-bold p-5 productionName' style={{ fontSize: '32px' }}>{profileDetails.retailerName}</h1>
              <Stack spacing={1}>
                <Rating name="half-rating-read" defaultValue={rating} precision={0.5} size='large' readOnly />
              </Stack>
              {displayReqButton ? (
                <div>
                  <button className='bg-blue-500 p-2 rounded-md text-white hover:bg-blue-700 ease-in-out duration-200'
                    onClick={handleSendRequest}
                    disabled={loadingButton}>{loadingButton ? 'Loading' : 'Send connection request'}</button>
                </div>
              ) : null}
            </div>
          </div>

          <div className='p-8'>
            <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center description min-w-80'>
              <div>
                <h1 className='pb-4 font-bold'>About</h1>
              </div>
              <h2 className='description min-h-16 '>
                {profileDetails.description}
              </h2>
            </div>
          </div>
        </>

      )}

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
                onChange={(event,newValue)=>handleRatingChange(event,newValue)}
              
              />
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
                  value={reviewText}
                  onChange={handleReviewTextChange}
                />
              </div>
            </Box>
          </div>
          <div>
            <button className='border rounded-full bg-slate-400 hover:bg-black hover:text-white p-2'
              onClick={handleShareReview}
            >Share review</button>
          </div>
        </div>
      </div>
    </div>
  )
}
