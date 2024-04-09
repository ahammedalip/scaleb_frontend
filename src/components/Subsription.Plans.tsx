import React, { useEffect, useState } from 'react'
import { TbPointFilled } from "react-icons/tb";
import { loadStripe } from '@stripe/stripe-js'
import api from '../axios/api';
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";

interface SubscriptionPlansProps {
    role: string;
}

interface SubscriptionData {
    endDate: Date;
    active: boolean;
    duration: string;
}

interface JwtPayload {
    id: string;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ role }) => {
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
        endDate: new Date(),
        active: false,
        duration: ''
    })
    const [sub, setSub] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchSubscription()
    }, [])

    const fetchSubscription = async () => {
        if (role == 'retailer') {
            try {
                setLoading(true)
                const response = await api.get('/retailer/profile')
                if (response.data.success) {
                    // console.log(response.data.userDetails)
                    if (response.data.userDetails.subscribed) {
                        console.log('active', response.data.userDetails.subscribed)
                        const subscribed = response.data.userDetails.subscribed

                        if (subscribed.active) {
                            setSubscriptionData(response.data.userDetails.subscribed)
                            setSub(true)
                            setLoading(false)
                        }

                    } else {
                        console.log('come here')
                        setLoading(false)
                    }

                }
            } catch (error) {
                console.log('Error while fetching subscription data', error)
                setLoading(false)
                toast.error('please refresh the page')
            }
        } else if (role == 'production') {
            try {
                setLoading(true)
                const response = await api.get('/production/profile')
                if (response.data.success) {
                    // console.log(response.data.userDetails)
                    if (response.data.userDetails.subscribed) {
                        console.log('active', response.data.userDetails.subscribed)
                        const subscribed = response.data.userDetails.subscribed

                        if (subscribed.active) {
                            setSubscriptionData(response.data.userDetails.subscribed)
                            setSub(true)
                            setLoading(false)
                        }
                    } else {
                        console.log('come here')
                        setLoading(false)
                    }

                }
            } catch (error) {
                console.log('Error while fetching subscription data', error)
                setLoading(false)
                toast.error('please refresh the page')
            }
        }

    }

    const handleSixMonth = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
        if (role === 'retailer') {
            const token = localStorage.getItem('retailer_token');
            if (token) {
                const decodedToken = jwtDecode<JwtPayload>(token);
                console.log(decodedToken)
                const id = decodedToken.id
                const data = {
                    userId: id,
                    role: 'retailer'
                }

                try {
                    const response = await api.post('/stripe/create-checkout-session-six', data);

                    const sessionId = response.data.id; // Adjust this line based on your actual API response structure

                    // Redirect to Stripe Checkout
                    stripe?.redirectToCheckout({
                        sessionId: sessionId,
                        // Redirect the user to the Stripe Checkout page using the session ID

                    }).then(function (result) {
                        // If `redirectToCheckout` fails due to a browser or network
                        // error, you should display the localized error message to your
                        // customer using `error.message`.
                        if (result.error) {
                            alert(result.error.message);
                        }
                    });


                } catch (error) {
                    console.error("Error processing payment:", error);
                }
            }
        }
        if (role == 'production') {
            const token = localStorage.getItem('production_token');
            if (token) {
                const decodedToken = jwtDecode<JwtPayload>(token);
                console.log(decodedToken)
                const id = decodedToken.id
                const data = {
                    userId: id,
                    role: 'production'
                }
                console.log('data is ,', data)
                try {
                    const response = await api.post('/stripe/create-checkout-session-six', { userId: id, role: 'production' });

                    const sessionId = response.data.id; // Adjust this line based on your actual API response structure

                    // Redirect to Stripe Checkout
                    stripe?.redirectToCheckout({
                        sessionId: sessionId,

                    }).then(function (result) {
                        if (result.error) {
                            alert(result.error.message);
                        }
                    });


                } catch (error) {
                    console.error("Error processing payment:", error);
                }
            }
        }
    }

    const handleOneYear = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
        if (role === 'retailer') {
            const token = localStorage.getItem('retailer_token');
            if (token) {
                const decodedToken = jwtDecode<JwtPayload>(token);
                console.log(decodedToken)
                const id = decodedToken.id
                try {
                    const response = await api.post('/stripe/create-checkout-session-one', {
                        userId: id
                    });
                    const sessionId = response.data.id; // Adjust this line based on your actual API response structure
                    // Redirect to Stripe Checkout
                    stripe?.redirectToCheckout({
                        sessionId: sessionId,
                        // Redirect the user to the Stripe Checkout page using the session ID
                    }).then(function (result) {
                        // If `redirectToCheckout` fails due to a browser or network
                        if (result.error) {
                            alert(result.error.message);
                        }
                    });
                } catch (error) {
                    console.error("Error processing payment:", error);
                }
            }
        }
        if (role == 'production') {
            const token = localStorage.getItem('production_token');
            if (token) {
                const decodedToken = jwtDecode<JwtPayload>(token);
                console.log(decodedToken)
                const id = decodedToken.id
                try {
                    const response = await api.post('/stripe/create-checkout-session-one', {
                        userId: id
                    });
                    const sessionId = response.data.id; // Adjust this line based on your actual API response structure
                    // Redirect to Stripe Checkout
                    stripe?.redirectToCheckout({
                        sessionId: sessionId,
                    }).then(function (result) {
                        if (result.error) {
                            alert(result.error.message);
                        }
                    });
                } catch (error) {
                    console.error("Error processing payment:", error);
                }
            }
        }
    }

    return (
        <div className='bg-white rounded-md shadow-md p-5 justify-center  flex'>
            {loading ? (
                <div className='justify-center items-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <ClipLoader color="rgb(10, 10, 10)" size={60} />
                </div>
            ) : (
                <>
                    {sub ? (

                        <div className='flex flex-col items-center justify-center p-5 w-fit bg-green-200/45 border rounded-sm'>
                            <img src="../../public/images/store image.jpg" alt="" className='w-60' />
                            <h1 className='text-center' style={{fontSize:'1.5rem', fontFamily:'serif'}}>ACTIVE</h1>
                            <h1 className='text-center'>Your subscription is active</h1>
                            <p className='text-center'>validity: <span className='bold'>{new Date(subscriptionData.endDate).toLocaleDateString()}</span></p>
                        </div>
                    ) : (
                        <div>
                            <div className='text-center '>
                                <h1 className='font-bold' style={{ fontSize: '1.9rem' }}>Unlock the features with <span className='text-orange-300 p-1' style={{ backgroundColor: 'gold', color: 'black', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)' }}>PREMIUM</span></h1>
                                <h1 style={{ fontSize: '1.2rem' }}>Pick the plans that's best for you</h1>
                            </div>

                            <div className="flex justify-evenly pt-5 space-x-4">
                                <div className="rounded-3xl border bg-gradient-to-b from-sky-300 to-sky-50 p-4 text-center ">
                                    <h1 style={{ fontSize: '1.2rem' }}>Basic Plan</h1>
                                    <h1 className="font-bold" style={{ fontSize: '2rem', }} >0$</h1>
                                    <h1 className="font-bold" style={{ fontSize: '1.5rem' }}>/month</h1>
                                    <div className="text-left pt-10 pl-3 space-y-2 text-gray-700">
                                        <p className="p-1 underline">Features</p>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}><TbPointFilled /><p>Unlimited free trial</p></span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}><TbPointFilled style={{ fontSize: '1.4rem' }} /><p>Max 3 association with retailer/production</p></span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}><TbPointFilled style={{ fontSize: '1.4rem' }} /><p>Real time messaging with connections is unavailable</p></span>
                                    </div>
                                    <div className="pt-14">
                                        <p className=" bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full shadow-md ">Free</p>
                                    </div>
                                </div>

                                <div className="rounded-3xl border bg-gradient-to-b from-red-400 to-red-50 p-4 text-center ">
                                    <h1 style={{ fontSize: '1.2rem' }}>6 Month Plan</h1>
                                    <h1 className="font-bold" style={{ fontSize: '2rem', }} >249.00 $  </h1>
                                    <h1 className="font-bold" style={{ fontSize: '1.5rem' }}>/month</h1>
                                    <div className="text-left pt-10 pl-3 space-y-2 text-gray-800">
                                        <p className="p-1 underline">Features</p>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}><TbPointFilled /><p></p></span>6 months plan
                                        <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '' }}><TbPointFilled style={{ fontSize: '1.4rem' }} /><p>Unlimited association with retailer/production</p></span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}><TbPointFilled style={{ fontSize: '1.4rem' }} /><p>Real time messaging with connections</p></span>
                                    </div>
                                    <div className="pt-10">

                                        <button
                                            className="bg-yellow-400 p-2 rounded-full shadow-md hover:bg-black hover:text-yellow-400"
                                            onClick={handleSixMonth} >Subscribe</button>

                                    </div>
                                </div>

                                <div className="rounded-3xl border bg-gradient-to-b from-amber-300 to-amber-50 p-4 text-center ">
                                    <h1 style={{ fontSize: '1.2rem' }}>1 Year Plan</h1>
                                    <h1 className="font-bold" style={{ fontSize: '2rem', }} >399.00 $</h1>
                                    <h1 className="font-bold" style={{ fontSize: '1.5rem' }}>/month</h1>
                                    <div className="text-left pt-10 pl-3 space-y-2 text-gray-800">
                                        <p className="p-1 underline">Features</p>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}><TbPointFilled /><p>1 year plan</p></span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}><TbPointFilled style={{ fontSize: '1.4rem' }} /><p>Unlimited association with retailer/production</p></span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}><TbPointFilled style={{ fontSize: '1.4rem' }} /><p>Real time messaging with connections</p></span>
                                    </div>
                                    <div className="pt-10">
                                        <button onClick={handleOneYear} className="bg-yellow-400 p-2  rounded-full shadow-md hover:bg-black hover:text-yellow-400">Subscribe</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                </>
            )}

        </div >

    )
}


export default SubscriptionPlans