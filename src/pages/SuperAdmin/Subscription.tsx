import { useState, useEffect } from 'react'

import Menu from "../../components/SuperAdmin/menu/Menu";
import Header from "../../components/header/Header";
import CreatePlan from '../../components/SuperAdmin/SubscriptionPlans/CreatePlan';
import api from '../../axios/api';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader'

interface IPlan {
    _id: string;
    role: string;
    name: string;
    features: string;
    amount: number;
    duration: number;
    active: boolean;
}


export default function Subscription() {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [plans, setPlans] = useState<IPlan[]>([])

    useEffect(() => {
        fetchPlans()
    }, [])

    const fetchPlans = async () => {
        try {
            setLoading(true)
            const response = await api.get('/admin/fetch-plan')
            if (response.data.success) {
                console.log('hello', response.data.plans)
                setPlans(response.data.plans)
                setLoading(false)
            }

        } catch (error) {
            console.log('Error while fetching data')
            setLoading(false)
            toast.error('Please try again')
        }

    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleActivation = async (planId: string, newActiveStatus: boolean) => {
        try {
            setLoading(true)
            console.log(planId)
            
            const response = await api.post('/admin/update-plan-status', {
                planId,
            active: newActiveStatus,
            });
            if (response.data.success) {
                // Update the local state to reflect the change
                fetchPlans()
                setLoading(false)
                toast.success('Plan status updated successfully');
            } else {
                setLoading(false)
                toast.error('Failed to update plan status');
            }
        } catch (error) {
            console.error('Error updating plan status:', error);
            toast.error('Failed to update plan status');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Header />
            <div className="bg-red-50/40 pt-20 space-x-5 h-screen flex">
                <div className="w-1/4">

                    <Menu />
                </div>
                <div className="bg-white rounded-md shadow-md w-[90%] p-5 text-center space-y-5">

                    <h1 className="font-semibold" style={{ fontSize: '1.2rem' }}>Subscription Plans</h1>
                    <div className="border p-4 rounded-lg bg-gradient-to-bl from-red-200 via-orange-300 to-red-400">
                        <h1>Plans</h1>

                        <div>
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Features
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Duration
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Active
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Handle
                                        </th>
                                    </tr>
                                </thead>
                                
                                    {loading ? (
                                        <div>
                                            <ClipLoader />
                                        </div>
                                    ) : (
                                        <tbody>
                                            {plans.map((plan, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {plan.role}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {plan.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">
                                                        {plan.features}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {plan.amount}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {plan.duration} Months
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {plan.active == true ? 'Active' : 'Not Active'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                        <button className='bg-blue-400 rounded-lg p-2 ' onClick={() => handleActivation(plan._id, !plan.active)}>
                                                            {plan.active ? 'Deactivate' : 'Activate'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                             </tbody>
                                    ) }
                                
                            </table>
                        </div>
                        <div className='flex items-center text-center justify-center pt-4 space-x-5'>

                            <h1>New plan?  </h1>
                            <button className='bg-white rounded-md p-2 hover:bg-gray-600 hover:text-white' onClick={openModal}>Create here</button>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <CreatePlan closeModal={closeModal} onPlanCreated={fetchPlans}/>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
