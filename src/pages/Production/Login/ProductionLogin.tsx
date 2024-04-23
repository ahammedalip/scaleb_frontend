
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../../components/header/Header'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import api from '../../../axios/api'
import toast from 'react-hot-toast'
import './production.css'
import ClipLoader from 'react-spinners/ClipLoader'

interface LoginForm {
  productionName: string,
  password: number
}

const ProductionLogin: React.FC = () => {

  const [authError, setAuthError] = useState<string>('')
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('production_token')
    if (token) {
      navigate('/production/home')
    }
  })

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      setLoading(true)
      const response = await api.post('/production/auth/login', data, {
        headers: {
          "Content-Type": 'application/json'
        }
      })
      const result = response.data
      console.log(result);
      if (result.success == true) {
        localStorage.setItem('production_token', result.token)
        toast.success('Login succesfull!')
        setLoading(false)
        navigate('/production/home')
      }
    } catch (error: any) {
      console.log(error?.response.data);
      setLoading(false)
      setAuthError(error?.response.data.message || "An error occured")
    }
  }

  return (
    <div>
      <Header />

      <div className='flex justify-center items-center h-screen background1' >
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-sm'>
          <div className='mb-4 text-center'>
            <h2 className='text-2xl font- '>LOGIN</h2>
          </div>
          <div className='mb-4'>
            {authError && (
              <div className='mb-4 text-red-500 text-center'>{authError}</div>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='productionName'>
              Production Name
            </label>
            <input
              id='productionName'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              {...register('productionName', { required: 'Production name is required' })}
            />
            {errors.productionName && <p className='text-red-500 text-xs italic'>{errors.productionName.message}</p>}
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='password'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              {...register('password', {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: 'Password must be at least  6 characters'
                }
              })}
            />
            {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>}
          </div>
          <div className='flex items-center justify-center'>
            <button 
            disabled ={loading}
            className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
              {loading ? <span><ClipLoader/></span> : 'Sign In'}
            </button>
          </div>
          <div className='text-center pt-4'>
            <h3>New user?<Link to='/production/signup' className='text-blue-500' > Click here</Link> </h3>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ProductionLogin