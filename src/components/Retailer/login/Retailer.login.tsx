import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '../../../axios/api';
import { useNavigate,Link } from 'react-router-dom';

interface IFormInput {
    retailerName: string,
    password: string
}

function Retailerlogin() {
    const [authError, setAuthError] = useState<string>('')
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const navigate= useNavigate();
    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        try {
            const response = await api.post('/retailer/auth/login', data,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const result = response.data;
            console.log(result);
            if(result.success== true){
                localStorage.setItem('access_token1', result?.token)
                navigate('/retail/home')
            }

        } catch (error:any) { 
            console.log(error?.response.data)
            setAuthError(error?.response.data.message ||'An error occured')
        }
        // console.log(data);
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-200'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-sm'>
                <div className='mb-4 text-center'>
                    <h2 className='text-2xl font-bold '>Retailers Login</h2>
                </div>
                <div className='mb-4'>
                    {authError && (
                        <div className='mb-4 text-red-500 text-center'>{authError}</div>
                    )}
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='retailerName'>
                        Retailer Name
                    </label>
                    <input
                        id='retailerName'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        {...register('retailerName', { required: 'Retailer name is required' })}
                    />
                    {errors.retailerName && <p className='text-red-500 text-xs italic'>{errors.retailerName.message}</p>}
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
                    <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                        Sign In
                    </button>
                </div>
                <div className='text-center pt-3'>
                    <h2>New user? <Link to='/retail/signup' className='text-blue-500'>Click here</Link> </h2>
                  </div>

                
            </form>
        </div>
    );
}

export default Retailerlogin;
