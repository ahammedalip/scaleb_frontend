import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

function Menu() {

    const navigate = useNavigate()
    const handleLogout = () => {

        try {
            localStorage.removeItem('superAdmin_token')
            if (localStorage.getItem('superAdmin_token') === null) {
                console.log('token is deleted and logged out');
                toast.success('Logged out successfully!')
                navigate('/admin/login')
                return
            }
            toast.error('Something went wrong!')
        } catch (error) {
            console.log('Something went wrong', error)
            toast.error('Something went wrong!')
        }

    }

    return (
        <div>
            <div className='pl-1 flex w-full '>
                <div className='bg-white pt-5 rounded-lg shadow-lg '>
                    <ul className='list-none flex sm:flex-col justify-evenly w-full'>
                        <div className='group py-3 hover:bg-pink-700/85 transition duration-1000 ease-in-out'>
                            <li className=''>
                                <Link to='/admin/retail' className='flex items-center hover:text-white'>
                                    <span className="inline-flex items-center pl-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0  24  24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9  12h3.75M9  15h3.75M9  18h3.75m3 .75H18a2.25  2.25  0  0  0  2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424  48.424  0  0  0-1.123-.08m-5.801  0c-.065.21-.1.433-.1.664  0 .414.336.75.75.75h4.5a.75.75  0  0  0 .75-.75  2.25  2.25  0  0  0-.1-.664m-5.8  0A2.251  2.251  0  0  1  13.5  2.25H15c1.012  0  1.867.668  2.15  1.586m-5.8  0c-.376.023-.75.05-1.124.08C9.095  4.01  8.25  4.973  8.25  6.108V8.25m0  0H4.875c-.621  0-1.125.504-1.125  1.125v11.25c0 .621.504  1.125  1.125  1.125h9.75c.621  0  1.125-.504  1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75  12h.008v.008H6.75V12Zm0  3h.008v.008H6.75V15Zm0  3h.008v.008H6.75V18Z" />
                                        </svg>
                                        <h3 className="ml-2 sm:block hidden group-hover:text-white">Retailers</h3>
                                    </span>
                                </Link>
                            </li>
                        </div>

                        <div className=' py-3 hover:bg-pink-700/85 transition duration-1000 ease-in-out group'>
                            <li>
                                <Link to='/admin/prod' className='flex items-center hover:text-white'>
                                    <span className='inline-flex items-center pl-5'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>

                                        <h3 className='ml-2 sm:block hidden group-hover:text-white'>Production Units</h3>
                                    </span></Link>
                            </li>
                        </div>
                        <div className='group py-3 hover:bg-pink-700/85 transition duration-1000 ease-in-out'>

                            <li>
                                <Link to='/admin/report' className='flex items-center'>
                                    <span className='inline-flex items-center pl-5'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                        </svg>

                                        <h3 className='ml-2 sm:block hidden group-hover:text-white'>Reports</h3>
                                    </span>
                                </Link>
                            </li>
                        </div>
                        <div className='group py-3 hover:bg-pink-700/85 transition duration-1000 ease-in-out'>
                            <li>
                                <Link to='/admin/revenue' className='flex items-center'>
                                    <span className='inline-flex items-center pl-5'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>

                                        <h3 className='ml-2 sm:block hidden group-hover:text-white'>Revenue</h3>
                                    </span>
                                </Link>
                            </li>
                        </div>
                        <div className='group py-3 hover:bg-pink-700/85 transition duration-1000 ease-in-out'>
                            <li>
                                <Link to='/admin/subscriptions' className='flex items-center'>
                                    <span className='inline-flex items-center pl-5'>
                                       
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>


                                        <h3 className='ml-2 sm:block hidden group-hover:text-white'>Subscriptions</h3>
                                    </span>
                                </Link>
                            </li>
                        </div>
                        <div className=' hover:bg-pink-700/85 transition duration-1000 ease-in-out group'
                            onClick={handleLogout}
                        >
                            <li className='logout'>
                                <span className="inline-flex items-center pl-5 py-2">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>


                                    <h3 className="ml-2 sm:block hidden group-hover:text-white">Logout</h3>
                                </span>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu
