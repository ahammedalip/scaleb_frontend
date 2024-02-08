import React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './SignupProduction.css'

interface SignupForm{
    productionName : string,
    email: string,
    password: string
}

function SignupProduction() {

const {register, handleSubmit, formState:{errors}} = useForm<SignupForm>();
const navigate = useNavigate()
const onSubmit : SubmitHandler<SignupForm>= async (data)=>{
    console.log(data);
}
  return (
    <div className='flex justify-center items-center h-screen bg-gray-200'>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md'>
            <div className=' mb-4 text-center font-medium text-2xl'>
                <h2 className='heading_font'>Production Unit Signup</h2>
            </div>

            <div className='mb-4'>
                <label htmlFor="productionName" className='block text-gray-700 text-sm font-bold mb-2'>
                    Production Name
                </label>
                <input
                id='productionName' className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register('productionName', {required: 'Name is required',
                minLength:{
                    value:6,
                    message:'Name should be atleast 6 character'
                }})} />
                {errors.productionName && <p className='text-red-500 text-xs italic'>{errors.productionName.message}</p>}
            </div>

            <div className='mb-4'>
                <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'> Email</label>
                <input id='email' className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                {...register('email',{required: 'Email is mandatory'}
                ) } />
                {errors.email && <p className='text-red-500 text-xs italic'> {errors.email.message} </p> }

            </div>

            
        </form>

    </div>
  )
}

export default SignupProduction