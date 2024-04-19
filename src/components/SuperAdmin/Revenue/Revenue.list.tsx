import { useState, useEffect } from 'react'
import api from '../../../axios/api';
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";
import img from '../../../../public/images/admin-home.jpg'

interface RevenueItem {
    _id: string;
    userId: {
        subscribed: object;
        _id: string;
        productionName?: string;
        retailerName?: string;
        email: string;
        password: string;
        role: string;
        otpCode: number;
        isVerified: boolean;
        isBlocked: boolean;
        availableItems?: string[];
        connectedRetailer?: string[];
        requestedRetailer?: string[];
        recievedRetailer?: string[];
        __v: number;
        description?: string;
    };
    amount: number;
    role: string;
    period: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function Revenuelist() {
    const [revenueList, setRevenueList] = useState<RevenueItem[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalAmount, setTotalAmount] = useState(0)

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchRevenue(currentPage)
    }, [currentPage])

    const fetchRevenue = async (page = 1) => {
        try {
            setLoading(true)
            const response = await api.get(`/admin/revenue?page=${page}`)
            if (response.data.success) {
                // console.log(response.data)
                setRevenueList(response.data.revenueList)
                setTotalAmount(response.data.totalAmount)
                setTotalPages(response.data.totalPages)

                setLoading(false)
            }

        } catch (error) {
            console.log('Error while fetching revenues')
            setLoading(false)
            toast.error('Please refresh again')
        }
    }

    return (
        <div className='bg-white rounded-md shadow-md '
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>

            <div className='justify-center md:flex md:justify-between px-10 pt-9'>
                <div className='w-full sm:w-auto flex flex-row justify-center items-center  bg-black text-white p-7 text-center bg-opacity-50 rounded-md shadow-md m-2'>
                    <h1 className='text-3xl'>Total Revenue: </h1>
                    <h1 className='text-3xl'><span className='text-green-500'> $ {totalAmount}</span></h1>
                </div>
            </div>

            <div className='p-7 '>
                <div className="overflow-x-auto sm:overflow-x-auto md:overflow-x-auto">

                    <table className='w-full bg-white  opacity-75 rounded-lg text-center'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2'>Sl. No</th>
                                <th className='px-4 py-2'>Username</th>
                                <th className='px-4 py-2'>Category</th>
                                <th className='px-4 py-2'>Date</th>
                                <th className='px-4 py-2'>Amount</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <div className='justify-center items-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                                <ClipLoader color="rgb(10, 10, 10)" size={60} />
                            </div>
                        ) : (
                            <tbody>
                                {revenueList?.map((item, index: number) => (
                                    <tr key={index}>
                                        <td className='border px-4 py-2'>{index + 1}</td>
                                        <td className='border px-4 py-2'>{item.userId.productionName || item.userId.retailerName}</td>
                                        <td className='border px-4 py-2'>{item.role}</td>
                                        <td className='border px-4 py-2'>{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className='border px-4 py-2'>{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}

                    </table>
                </div>

                <div className='text-center justify-center flex space-x-5 pt-5'>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='border rounded-full p-2 shadow-sm bg-white'>Prev</button>
                    <p className='pt-2'>
                        {currentPage}
                    </p>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='border rounded-full p-2 shadow-sm bg-white'>Next</button>
                </div>
            </div>

        </div>
    )
}

