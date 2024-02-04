import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../../axios/api.ts'
// import './retailer.signup.css'


interface FormData {
  retailerName?: string;
  email?: string;
  password?: string;

}



function Retailersignup() {
  const [formData, setFormData] = useState<FormData>({})
  const [otp, setOTP] = useState<string>('')

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    console.log(formData);
  }

  const handleSubmitCred = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {

    }
    catch (err) {
      console.log(err);
    }

  }
const handleOTPChange = async (e:ChangeEvent<HTMLInputElement>)=>{
setOTP(e.target.value)
console.log(otp);

}
const handleSubmitOTP = async (e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  
  console.log(otp)

}

  return (
    <div className='bg-gradient-to-r from-slate-300 to-slate-400'>
      {/* <div className='container'>    */}
      <div className='pt-11 flex'>
        <div className='w-2/3 pt-20 pb-44'>
          <div className=' flex items-center justify-center h-full'>
            <div className=' bg-white bg-opacity-100 p-8 shadow-md rounded-tl-md rounded-bl-md w-96'>
              <form className=' grad' onSubmit={handleSubmitCred}>
                <h2 className='text-2xl font-bold mb-4 text-center'> Retailer SignUp</h2>
                <div className='mb-4'>


                  <input type="text" id='retailerName' className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your retailer name' onChange={handleChange} />
                </div>
                <div className='mb-4'>
                  <input type="text" id='email' className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your email' onChange={handleChange} />
                </div>
                <div className='mb-4'>
                  <input type="password" id='password' className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' placeholder='Enter your password' onChange={handleChange} />
                </div>
                <div className='mb-4 text-center'>
                  <button
                    type="submit"
                    className="w-auto px-3 text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Send OTP
                  </button>
                </div>
              </form >
              <form onSubmit={handleSubmitOTP}>
                <div className='mb-4 flex '>
                  <div className='flex-auto'>
                    <input type="text" id='otp' className='w-32 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' placeholder='OTP' onChange={handleOTPChange}/>

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
            <div className='w-1/2'>
              <img src="../../../../public/images/signupSide.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Retailersignup