import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../axios/api.ts'
// import './sample.css'
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';

interface FormData {
  retailerName?: string;
  email?: string;
  password?: string;
}

function Retailersignup() {
  const navigate = useNavigate();
  const [loading, setLoading]= useState(false);
  const [formData, setFormData] = useState<FormData>({})
  const [otp, setOTP] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('')
  const [remainingTime, setRemainingTime] = useState<number>(59);


  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOtpSent && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOtpSent, remainingTime]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    setError('')
    if (e.target.id === "password" && e.target.value.length < 6) {
      setPasswordError('Password must contain 6 characters!')
    } else {
      setPasswordError('')
    }
  }
  const validateFormData = () => {
    const { retailerName, email, password } = formData;

    // Check if retailerName is empty
    if (!retailerName || retailerName.trim() === '') {
      setError('Retailer Name is required.');
      return false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Please enter a password');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmitCred = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // console.log('validate', validateFormData);
    if (!validateFormData()) {
      return;
    }

    try {
      setLoading(true)
      const response = await api.post('/retailer/auth/verify_cred', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = response.data;
      console.log('coming from retailer signup', data)
      if (data.success === true && data.message == 'OTP send succesfully') {
        setIsOtpSent(true);
        setLoading(false)
      }
    }
    catch (err: any) {
      console.log(err?.response.data);
      setLoading(false)
      setError(err?.response.data.message || "An error occured");
    }
  }
  const handleOTPChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value)
    console.log(otp);

  }

  const resendOtp = async () => {
    const email = {
      email:formData.email
    }
    try {
      setLoading(true)
      const response = await api.post('/retailer/auth/resend-otp',email)
      if (response.data.success) {
        setLoading(false)
        setRemainingTime(59)
      }
    } catch (error) {
      console.log('Error while trying to resend otp')
      setLoading(false)
      toast.error('Please restart again')
    }
  }

  const handleSubmitOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(otp == ''){
      return
    }
    const signupData = {
      formData, otp
    }
    try {
      setLoading(true)
      const response = await api.post('/retailer/auth/verify_otp', signupData, {
        headers: {
          "Content-Type": 'application/json'
        }
      })
      const data = response.data;
      console.log(data);
      if (data.success === true) {
        toast.success('Signup Success! Please Login')
        navigate('/retail/login')
        setLoading(false)
      }
    } catch (error: any) {
      console.log(error?.response.data);
      setError(error?.response.data.message || "An error occured");
      setLoading(false)
    }
    // console.log(otp)
  }

  return (

    <div className='gradient-bg'>
      <div className=' flex items-center justify-center h-full pt-20'>
        <div className=' bg-gray-200 bg-opacity-20 border backdrop-filter backdrop-blur-sm  p-8 shadow-left-bottom  rounded-lg w-96'>
          {!isOtpSent ? (
            <form className=' grad' onSubmit={handleSubmitCred}>
              <h2 className='text-2xl font-bold mb-4 text-center'> Retailer SignUp</h2>
              <div className='mb-4 pt-4'>
                {error && (
                  <div className="mb-4 text-red-500 text-center">{error}</div>
                )}
              </div>
              <div className='mb-4'>
                <h1 className='ml-3'>Name<span className='text-red-500'>*</span>:</h1>
                <input type="text" id='retailerName' className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your retailer name' onChange={handleChange} />
              </div>
              <div className='mb-4'>
                <h1 className='ml-3'>email<span className='text-red-500'>*</span>:</h1>
                <input type="text" id='email' className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your email' onChange={handleChange} />
              </div>
              <div className='mb-4'>
                <h1 className='ml-3'>Password<span className='text-red-500'>*</span>:</h1>
                <input type="password" id='password' className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your password' onChange={handleChange} />
                {passwordError && <div className="text-red-500 text-xs mt-1">{passwordError}</div>}
              </div>
              <div className='mb-4 text-center'>
                <button
                  type="submit"
                  className="w-auto px-3 text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-disabled disabled:text-disabled"
                  disabled={loading || !!passwordError}
                >
                 {loading ? <span className='w-20'><ClipLoader/></span> : 'Send OTP'}
                </button>
              </div>
              <div className='text-center pt-3'>
                <h2>Already a user? <Link to='/retail/login' className='text-blue-500'>Click here</Link> </h2>
              </div>
            </form >
          ) : (
            <div>
              <h2 className='text-2xl font-bold mb-4 text-center'>Submit OTP</h2>
              <form onSubmit={handleSubmitOTP}>
                <div className='mb-4 flex '>
                  <div className='flex-auto'>
                    <input type="text" id='otp' className='w-32 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' placeholder='OTP' onChange={handleOTPChange} />
                  </div>
                  {remainingTime != 0 && (
                    <div className='flex-auto'>
                      <button
                        type="submit"
                        className="w-auto px-3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
                      >
                        Verify and Submit
                      </button>
                    </div>
                  )}
                </div>
              </form>
              <div className='text-center '>

              <h1 className='text-sm text-red-500'>resend otp after {remainingTime} seconds</h1>
              </div>

              {remainingTime == 0 && (
                <div className='items-center justify-center flex flex-col space-y-2'>
                  <button disabled={loading}
                   onClick={resendOtp} className='border p-2 rounded-md hover:bg-slate-300 hover:shadow-md transition-shadow'>{loading ? <span className='w-16'><ClipLoader/></span> : 'Resend OTP'}</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Retailersignup