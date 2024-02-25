
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import api from '../../axios/api';
import {jwtDecode} from 'jwt-decode'
import toast from 'react-hot-toast';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Iform {
    username: string,
    email: string,
    password: string
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
    const [id, setId] = useState()
    const [retailerUsername, setRetailerUsername] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
        getToken()
      
    },[])

    const getToken = async()=>{
        const token= localStorage.getItem('retailer_token');
        const decodedToken =  token?jwtDecode(token) : null
        // console.log('here decoded token is ',decodedToken);
        setId(decodedToken.id)
        setRetailerUsername(decodedToken.validUser)
    
    }

    const onSubmit = async(data: any) => {
        console.log(data);
        const response = await api.post('/retailer/add_sales', {data,id},{
            headers:{
                "Content-Type": 'application/json'
            }
        })
        const result = response.data
        console.log('result from here adding sales exec',result);
        if(result.success=== true){
            toast.success('Sales executive added successfully!')
            onClose()
        }
        
    };


    if (!isOpen) {
        return null;
    }

    return (
        <div>


            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex  text-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-2xl ">
                                Add new sales executive
                            </h3>

                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto text-left">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        {...register('username', { required: true })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                    />
                                    {retailerUsername && (<p>username will be username@ {retailerUsername}</p>)}
                                    {errors.username && <span>This field is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        {...register('email', { required: true })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                    {errors.email && <span>This field is required</span>}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        {...register('password', { required: true })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                    />
                                    {errors.password && <span>This field is required</span>}
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>


        </div>
    );
};

export default UserModal;
