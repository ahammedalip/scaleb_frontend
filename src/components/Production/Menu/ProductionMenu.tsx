
import { Link } from 'react-router-dom'

function ProductionMenu() {
    return (
        <div className='  pl-4'>
            <div className='bg-white py-5 rounded-lg shadow-lg'>
                <ul className='list-none'>

                    <div className='group  hover:bg-pink-700/85 transition duration-1000 ease-in-out'>
                        <li className=''>
                            <Link to='/production/order' className='flex items-center hover:text-white py-2'>
                                <span className="inline-flex items-center pl-5 sm:pl-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0  24  24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9  12h3.75M9  15h3.75M9  18h3.75m3 .75H18a2.25  2.25  0  0  0  2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424  48.424  0  0  0-1.123-.08m-5.801  0c-.065.21-.1.433-.1.664  0 .414.336.75.75.75h4.5a.75.75  0  0  0 .75-.75  2.25  2.25  0  0  0-.1-.664m-5.8  0A2.251  2.251  0  0  1  13.5  2.25H15c1.012  0  1.867.668  2.15  1.586m-5.8  0c-.376.023-.75.05-1.124.08C9.095  4.01  8.25  4.973  8.25  6.108V8.25m0  0H4.875c-.621  0-1.125.504-1.125  1.125v11.25c0 .621.504  1.125  1.125  1.125h9.75c.621  0  1.125-.504  1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75  12h.008v.008H6.75V12Zm0  3h.008v.008H6.75V15Zm0  3h.008v.008H6.75V18Z" />
                                    </svg>
                                    <h3 className="ml-2 group-hover:text-white ">Orders</h3>
                                </span>
                            </Link>
                        </li>
                    </div>

                    <div className=' hover:bg-pink-700/85 transition duration-1000 ease-in-out group'>
                        <li>
                            <Link to='/production/messages' className='flex items-center hover:text-white py-2 '>
                                <span className='inline-flex items-center '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>
                                    <h3 className='ml-2 hover:text-white'>Messages</h3>
                                </span></Link>
                        </li>
                    </div>

                    <div className=' hover:bg-pink-700/85 transition duration-1000 ease-in-out group'>
                        <li>
                            <Link to='/production/sales_exec' className='flex items-center hover:text-white py-2'>
                                <span className='inline-flex items-center pl-5 sm:pl-0'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>

                                    <h3 className='ml-2 group-hover:text-white'>Sales Executives</h3>
                                </span></Link>
                        </li>
                    </div>
                    <div className='group  hover:bg-pink-700/85 transition duration-1000 ease-in-out'>

                        <li>
                            <Link to='/production/retailers' className='flex items-center py-2'>
                                <span className='inline-flex items-center pl-5 sm:pl-0'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                    </svg>

                                    <h3 className='ml-2 group-hover:text-white'>Retailers</h3>
                                </span>
                            </Link>
                        </li>
                    </div>
                    <div className='group hover:bg-pink-700/85 transition duration-1000 ease-in-out'>

                        <li>
                            <Link to='/production/report' className='flex items-center py-2'>
                                <span className='inline-flex items-center pl-5 sm:pl-0'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700/85 group-hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>


                                    <h3 className='ml-2 group-hover:text-white '> report</h3>
                                </span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </div >
        </div >
    )
}

export default ProductionMenu
