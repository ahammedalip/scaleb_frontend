
import { useState } from 'react'
import Header from '../../../components/header/Header'
import './prod.css'
import { useNavigate, Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import api from '../../../axios/api'
import toast from 'react-hot-toast'


interface SignupForm {
  productionName: string,
  email: string,
  password: string
}
interface OTP {
  otp: number
}

export const ProductionSignup: React.FC = () => {

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [authError, setAuthError] = useState<string>('')
  const { register: registerSignup, handleSubmit: handleSubmitSignup, formState: { errors: errorsSignup } } = useForm<SignupForm>();
  const { register: registerOTP, handleSubmit: handleSubmitOTP, formState: { errors: errorsOTP } } = useForm<OTP>()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    setEmail(data.email)
    try {
      const response = await api.post('/production/auth/verify_cred', data, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      const result = response.data
      console.log(result);
      if (result.success === true) {
        setIsOtpSent(true)
      }

    } catch (error: any) {
      console.log(error?.response.data)
      setAuthError(error?.response.data.message || 'An error occured')
    }
  }

  const onOtpSubmit: SubmitHandler<OTP> = async (data) => {

    try {

      const response = await api.post('/production/auth/verify_otp', { data, email }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      const result = response.data;
      console.log(result);
      if (result.success == true) {
        toast.success('Signup Success! Please Login')
        navigate('/production/login')
      }

    } catch (error: any) {
      setOtpError('Failed to verify OTP');
      console.log(error?.response.data)
      setAuthError(error?.response.data.message || 'An error occured')
    }
  };

  return (
    <div>
      <Header />

      <div className='body-bg h-screen pt-20'>


        <div className='flex justify-center items-center pt-5 '>
          {!isOtpSent ? (

            <form onSubmit={handleSubmitSignup(onSubmit)} className=' backdrop-blur-md bg-opacity-40 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md' style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
              <div className=' mb-4 text-center font-medium text-2xl'>
                <h2 className='heading_font'>Production Unit Signup</h2>
              </div>
              <div className='mb-4'>
                {authError && (
                  <div className='mb-4 text-red-500 text-center'>{authError}</div>
                )}
              </div>
              <div className='mb-4'>
                <label htmlFor="productionName" className='block text-gray-700 text-sm font-semibold mb-2'>
                  Production Name
                </label>
                <input
                  id='productionName' className='border shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  {...registerSignup('productionName', {
                    required: 'Name is required',
                    minLength: {
                      value: 6,
                      message: 'Name should be atleast 6 character'
                    }
                  })} />
                {errorsSignup.productionName && <p className='text-red-500 text-xs italic'>{errorsSignup.productionName.message}</p>}
              </div>

              <div className='mb-4'>
                <label htmlFor="email" className=' block text-gray-700 font-semibold text-sm mb-2'> Email</label>
                <input id='email' className='border shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  {...registerSignup('email', {
                    required: 'Email is mandatory',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address'
                    }

                  }
                  )} />
                {errorsSignup.email && <p className='text-red-500 text-xs italic'> {errorsSignup.email.message} </p>}

              </div>

              <div className='mb-4'>
                <label htmlFor="password" className='block text-gray-700 font-semibold text-sm mb-2'>Password</label>
                <input type="password"
                  id='password'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outlin'
                  {...registerSignup('password', {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })} />
                {errorsSignup.password && <p className='text-red-500 text-xs italic'> {errorsSignup.password.message} </p>}
              </div>
              <div className='flex items-center justify-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                  Request OTP
                </button>
              </div>
              <div className='text-center pt-3'>
                <h2>Already a user? <Link to='/production/login' className="text-blue-500"> Click here</Link></h2>
              </div>
            </form>
          ) : (

            <form onSubmit={handleSubmitOTP(onOtpSubmit)} className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md mt-4'>
              <div className='mb-4 text-center'>
                <h2 className='text-2xl font- '>VERIFY OTP</h2>
              </div>
              <div className='mb-4'>
                {otpError && (
                  <div className='mb-4 text-red-500 text-center'>{otpError}</div>
                )}
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='otp'>
                  Enter OTP
                </label>
                <input
                  id='otp'
                  type='text'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  {...registerOTP('otp', { required: 'OTP is required' })}
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />
                {errorsOTP.otp && <p className='text-red-500 text-xs italic'>{errorsOTP.otp.message}</p>}
              </div>
              <div className='flex items-center justify-center'>

                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                  verify & Sign Up
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  )
}

