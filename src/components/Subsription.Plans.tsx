import React, { useEffect, useState } from 'react'
import { TbPointFilled } from "react-icons/tb";
import { loadStripe } from '@stripe/stripe-js'
import api from '../axios/api';
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";
import img from "../../public/images/store image.jpg"

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
interface SPlans {
    _id: string,
    role: string,
    name: string,
    amount: string,
    features: string,
    duration: string,
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ role }) => {
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
        endDate: new Date(),
        active: false,
        duration: ''
    })
    const [sub, setSub] = useState(false)
    const [loading, setLoading] = useState(false)
    const [plans, setPlans] = useState<SPlans[]>([])

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
                        // console.log('active', response.data.userDetails.subscribed)
                        const subscribed = response.data.userDetails.subscribed.active
                        // console.log('subscribed:=', subscribed)
                        if (subscribed) {
                            setSubscriptionData(response.data.userDetails.subscribed)
                            setSub(true)
                            setLoading(false)
                        } else if (subscribed == false) {
                            setSub(false)
                            availablePlansRet()
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
                        } else if (!subscribed.active) {
                            setSub(false)
                            availablePlansProd()
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


    const availablePlansProd = async () => {
        try {
            const response = await api.get('/production/fetch-plans')
            if (response.data.success) {
                console.log('Available plans', response.data.fetch)
                setPlans(response.data.fetch)
            }
        } catch (error) {
            console.log('erorr while fetching available plans', error)
            toast.error('Please refresh again')
        }
    }

    const availablePlansRet = async () => {
        try {
            const response = await api.get('/retailer/fetch-plans')
            if (response.data.success) {
                console.log('Available plans', response.data.fetch)
                setPlans(response.data.fetch)
            }
        } catch (error) {
            console.log('erorr while fetching available plans', error)
            toast.error('Please refresh again')
        }
    }


    const handlePayment = async (planId: string) => {
        console.log('plan id si ', planId)
        const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
        if (role === 'retailer') {
            const token = localStorage.getItem('retailer_token');
            if (token) {
                const decodedToken = jwtDecode<JwtPayload>(token);
                console.log(decodedToken)
                const id = decodedToken.id
             
                try {
                    const response = await api.post('/stripe/create-checkout-session-six', { userId: id, role: 'production', planId });

                    const sessionId = response.data.id;

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
        if (role == 'production') {
            const token = localStorage.getItem('production_token');
            if (token) {
                const decodedToken = jwtDecode<JwtPayload>(token);
                console.log(decodedToken)
                const id = decodedToken.id
                const data = {
                    userId: id,
                    role: 'production',
                    planId
                }
                console.log('data is ,', data)
                try {
                    const response = await api.post('/stripe/create-checkout-session-six', { userId: id, role: 'production', planId });

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
        <div className='bg-white rounded-md shadow-md p-5 justify-center flex h-[80%]'>
            {loading ? (
                <div className='justify-center items-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <ClipLoader color="rgb(10, 10, 10)" size={60} />
                </div>
            ) : (
                <>
                    {sub ? (

                        <div className='flex flex-col items-center justify-center p-5 w-fit bg-yellow-400/45  border rounded-2xl shadow-xl'>
                            <img src={img} alt="" className='w-60 rounded-xl' />
                            <h1 className='text-center' style={{ fontSize: '1.5rem', fontFamily: 'serif' }}>ACTIVE</h1>
                            <h1 className='text-center'>Your subscription is active</h1>
                            <p className='text-center'>validity: <span className='bold'>{new Date(subscriptionData.endDate).toLocaleDateString()}</span></p>
                        </div>
                    ) : (
                        <div className=''>
                            <div className='text-center '>
                                <h1 className='font-bold' style={{ fontSize: '1.9rem' }}>Unlock the features with <span className='text-orange-300 p-1' style={{ backgroundColor: 'gold', color: 'black', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)' }}>PREMIUM</span></h1>
                                <h1 style={{ fontSize: '1.2rem' }}>Pick the plans that's best for you</h1>
                            </div>
                            {loading ? (
                                <div>
                                    <ClipLoader/>
                                </div>
                            ):(
                                <div className="flex flex-col w-8/12 sm:w-full sm:flex-row sm:overflow-x-auto sm:justify-evenly pt-5 space-x-4">
                                {plans.map((plan) => (
                                    <div key={plan._id} className="rounded-3xl border bg-gradient-to-b from-sky-300 to-sky-50 p-4 text-center ">
                                        <h1 style={{ fontSize: '1.2rem' }}>{plan.name}</h1>
                                        <h1 className="font-bold" style={{ fontSize: '2rem', }} >${plan.amount}</h1>
                                        <h1 className="font-bold" style={{ fontSize: '1.5rem' }}>{plan.duration}/month</h1>
                                        <div className="text-left pt-10 pl-3 space-y-2 text-gray-700">
                                            <p className="p-1 underline">Features</p>
                                            {plan.features.split(',').map((feature, index) => (
                                                <span key={index} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                    <TbPointFilled /><p>{feature}</p>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="pt-14">
                                            {plan.amount == '0' ? (
                                                <p className='bg-yellow-500 p-2 rounded-full shadow-md'>
                                                    Active
                                                </p>
                                            ) : (

                                                <button className=" bg-yellow-300 hover:bg-yellow-600 p-2 rounded-full shadow-md " onClick={() => { handlePayment(plan._id) }}>
                                                    Purchase
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                

                            </div>
                            )}

                           
                        </div>
                    )}

                </>
            )}

        </div >

    )
}


export default SubscriptionPlans