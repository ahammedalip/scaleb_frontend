import React, { useState } from 'react';
import api from '../../../axios/api';
import ClipLoader from 'react-spinners/ClipLoader'
import toast from 'react-hot-toast';

interface CreatePlanProps {
    closeModal: () => void; // Define the type of closeModal prop
    onPlanCreated: () => void; 
}


const CreatePlan: React.FC<CreatePlanProps> = ({ closeModal, onPlanCreated }) => {
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState('retailer');
    const [name, setName] = useState('');
    const [features, setFeatures] = useState('');
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('')
    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeatures(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(e.target.value);
    };

    const handleSubmit = async () => {
        // Handle submitting the plan data
        // You can implement your logic to submit the plan data here
        // For now, let's just log the data
        console.log({
            role,
            name,
            features,
            amount,
            duration,
        });
        const plan = {
            role, name, features, amount, duration
        }
        try {
            setLoading(true)
            const response = await api.post('/admin/create-plan', plan)
            if (response.data.success) {
                setLoading(false)
                closeModal();
                toast.success('Plan successfully created')
                onPlanCreated();
            }
        } catch (error) {
            console.log('error while creating plans', error)
            setLoading(false)
            toast.error('please try later')
            closeModal();
        }

        // Close the modal after submitting
        // closeModal();
    };

    return (
        <div className="p-4">

            <div className="flex justify-end">
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {loading ? (
                <div className='flex items-center justify-center h-80'>
                    <ClipLoader/>
                </div>
            ) : (
                <>
                    <h2 className="text-lg font-semibold mb-4">Create Plan</h2>

                    <div className="mb-4">
                        <label className="block mb-2">Role:</label>
                        <div>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    value="retailer"
                                    checked={role === 'retailer'}
                                    onChange={handleRoleChange}
                                />
                                Retailer
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="production"
                                    checked={role === 'production'}
                                    onChange={handleRoleChange}
                                />
                                Production
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Plan Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Features:</label>
                        <input
                            type="text"
                            value={features}
                            onChange={handleFeaturesChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Amount $:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Duration:</label>
                        <div>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    value="3"
                                    checked={duration === '3'} // Check against duration state
                                    onChange={handleDurationChange}
                                />
                                3 Months
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="6"
                                    checked={duration === '6'} // Check against duration state
                                    onChange={handleDurationChange}
                                />
                                6 Months
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Add Plan
                    </button>
                </>
            )}

        </div>
    );
}


export default CreatePlan;