import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../axios/api.ts'
import './sample.css'

interface FormData {
  retailerName?: string;
  email?: string;
  password?: string;
}

function Retailersignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({})
  const [otp, setOTP] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('')

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    setError('')
    if (e.target.id === "password" && e.target.value.length < 6) {
      setPasswordError('Password must contain 6 characters!')
    } else {
      setPasswordError('')
    }
    console.log(formData);
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
    console.log('validate', validateFormData);
    if (!validateFormData()) {
      return;
    }

    try {
      const response = await api.post('/retailer/auth/verify_cred', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = response.data;
      console.log('coming from retailer signup', data)
      if (data.success === true && data.message == 'OTP send succesfully') {
        setIsOtpSent(true);
      }
    }
    catch (err: any) {
      console.log(err?.response.data);
      setError(err?.response.data.message || "An error occured");
    }
  }
  const handleOTPChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value)
    console.log(otp);

  }
  const handleSubmitOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const signupData = {
      formData, otp
    }
    try {
      const response = await api.post('/retailer/auth/verify_otp', signupData, {
        headers: {
          "Content-Type": 'application/json'
        }
      })
      const data = response.data;
      console.log(data);
      if (data.success === true) {
        navigate('/retail/login')
      }
    } catch (error: any) {
      console.log(error?.response.data);
      setError(error?.response.data.message || "An error occured");
    }
    console.log(otp)
  }

  return (

    <div className='bg-gradient-to-r from-slate-400 to-slate-300 min-h-screen container-fluid'>

      <div className="background3e">
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>


        <div className='pt-11 flex'>
          <div className=' pt-20 '>
            <div className=' flex items-center justify-center h-full '>
              <div className=' ml-48 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md  p-8 shadow-left-bottom  rounded-lg w-96'>
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
                        disabled={!!passwordError}
                      >
                        Send OTP
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
                        <div className='flex-auto'>
                          <button
                            type="submit"
                            className="w-auto px-3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
                          >
                            Verify and Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              {/* <div className='shadow-bo rounded-tr-md rounded-br-md'>
              <img src="../../../../public/images/signupSide.jpg" alt="" className=' max-w-[444px] shadow-bottom-right rounded-tr-md rounded-br-md' />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Retailersignup