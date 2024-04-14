import { useEffect} from 'react';
import Header from './header/Header';
import api from '../axios/api';
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast';
import img from "../../public/images/3d-hand.jpg"


interface JwtPayload {
  id: string
}

function PaymentSuccess() {
  // const [id, setId] = useState('')
  // const [token, setToken]= useState('')
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateProfile()
  }, [])
  const updateProfile = async () => {
    // setIsLoading(true);
    const params = new URLSearchParams(location.search)
    const duration = params.get('time')
    // console.log('duration', duration)
    const retailerToken = localStorage.getItem('retailer_token')
    const productionToken = localStorage.getItem('production_token')
try{
  if (retailerToken) {
    // console.log('retialer')
    // setToken('retailer')
    const decodedToken = jwtDecode<JwtPayload>(retailerToken)
    const id = decodedToken.id
    // setId(id)
    const response = await api.patch(`/retailer/subscription?time=${duration}&id=${id}`)
    if(response.data.success){
      toast.success('Success')
    }

  } else if (productionToken) {
    // console.log('production')
    // setToken('production')
    const decodedToken = jwtDecode<JwtPayload>(productionToken)
    const id = decodedToken.id
    // setId(id)
    const response = await api.patch(`/production/subscription?time=${duration}&id=${id}`)
    if(response.data.success){
      toast.success('Success')
    }
  }
}catch(error){
console.log('error while updating profile')
toast.error('Please refresh again')
}  

  }
  return (
    <div>
      <Header />
      <div className="flex justify-center pt-36 h-screen bg-red-50/40">


        <div className='border pt-7 text-center h-96 rounded-md bg-white shadow-md'>
          
          <img src={img} alt="" className='h-60' />
          <h1 className='text-green-600 font-bold'>Payment success</h1>

          <div className='text-left px-4 py-2'>
            Invoice no: 399D9621-0001
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default PaymentSuccess;
