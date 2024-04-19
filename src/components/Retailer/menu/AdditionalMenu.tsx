import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { TbUserDollar } from "react-icons/tb";
// import { FaHandshake } from "react-icons/fa";

function AdditionalMenu() {
    const navigate = useNavigate()

    const handleLogout = () => {

        try {
            localStorage.removeItem('retailer_token')
            if (localStorage.getItem('retailer_token') === null) {
                console.log('token is deleted and logged out');
                toast.success('Logged out successfully!')
                navigate('/retail/login')
                return
            }
            toast.error('Something went wrong!')


        } catch (error) {
            console.log('Error while logging out/removing token');
        }

    }

    return (
        <div className='  pl-4'>
            <div className='bg-white py-5 rounded-lg shadow-lg '>
                <ul className='list-none'>
                    <div className='group  hover:bg-pink-700/85 transition duration-1000 ease-in-out'>
                        <li className='Subscriptions'>
                            <Link to='/retail/subscription-plans' className='flex items-center py-2'>
                                <span className='inline-flex items-center pl-5'>
                                    <TbUserDollar size={24} className='text-pink-700/85 group-hover:text-white font-light' />
                                    <h3 className='ml-2 group-hover:text-white'>Subscriptions</h3>
                                </span>
                            </Link>
                        </li>
                    </div>
                    {/* <div className='group  hover:bg-pink-700/85 transition duration-1000 ease-in-out'>
                        <li className='Subscriptions'>
                            <Link to='/retailer/requests' className='flex items-center py-2'>
                                <span className='inline-flex items-center pl-5'>
                                    <FaHandshake size={24} className='text-pink-700/85 group-hover:text-white font-light' />
                                    <h3 className='ml-2 group-hover:text-white'>New requests</h3>
                                </span>
                            </Link>
                        </li>
                    </div> */}

                    {/* <div className='  hover:bg-pink-700/85 transition duration-1000 ease-in-out group'>
                        <li className='logout'>
                            <span className="inline-flex items-center pl-5 py-2">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>

                                <h3 className="ml-2 group-hover:text-white">Reviews</h3>
                            </span>
                        </li>
                    </div> */}

                    <div className='  hover:bg-pink-700/85 transition duration-1000 ease-in-out group' onClick={handleLogout}>
                        <li className='logout'>
                            <span className="inline-flex items-center pl-5 py-2">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>


                                <h3 className="ml-2 group-hover:text-white">Logout</h3>
                            </span>
                        </li>
                    </div>


                </ul>
            </div>
        </div>
    )
}

export default AdditionalMenu
