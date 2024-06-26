import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { TbUserDollar } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa";

function AdditionalMenu() {
    const navigate = useNavigate()

    const handleLogout = () => {

        try {
            localStorage.removeItem('production_token')
            if (localStorage.getItem('production_token') === null) {
                console.log('token is deleted and logged out');
                toast.success('Logged out successfully!')
                navigate('/production/login')
                return
            }
            toast.error('Something went wrong!')


        } catch (error) {

        }

    }

    return (
        <div className='pl-8 pr-4'>
            <div className='bg-white py-4 rounded-lg shadow-lg '>
                <ul className='list-none'>
                    <div className='group  hover:bg-pink-700/85 transition duration-1000 ease-in-out'>
                        <li className='Subscriptions'>
                            <Link to='/production/subscription' className='flex items-center py-2'>
                                <span className='inline-flex items-center pl-5'>
                                        <TbUserDollar size={24} className='text-pink-700/85 group-hover:text-white font-light'/>
                                    <h3 className='ml-2 group-hover:text-white'>Subscriptions</h3>
                                </span>
                            </Link>
                        </li>
                    </div>

                    <div className='group  hover:bg-pink-700/85 transition duration-1000 ease-in-out'>
                        <li className='Subscriptions'>
                            <Link to='/production/requests' className='flex items-center py-2'>
                                <span className='inline-flex items-center pl-5'>
                                        <FaHandshake size={24} className='text-pink-700/85 group-hover:text-white font-light'/>
                                    <h3 className='ml-2 group-hover:text-white'>New Requests</h3>
                                </span>
                            </Link>
                        </li>
                    </div>

                    <div className=' hover:bg-pink-700/85 transition duration-1000 ease-in-out group' onClick={handleLogout}>
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
