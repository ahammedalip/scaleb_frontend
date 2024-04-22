import { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import api from '../../../axios/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import img from "../../../../public/images/shop-icon.jpg"


interface Profile {
    retailerName: string;
    description: string;
    _id: string

}


export default function RequestProfile() {

    const [loading, setLoading] = useState(false)
    const [buttonClickLoading, setButtonClickLoading] = useState(false)
    const [retailerProf, setRetailerProf] = useState<Profile>({} as Profile)

    useEffect(() => {
        fetchProfile()
    }, [])

    const navigate = useNavigate()

    const fetchProfile = async () => {
        const params = new URLSearchParams(location.search)
        const id = params.get('id')
        setLoading(true)
        try {
            const response = await api.get(`/production/ret-profile?id=${id}`)
            if (response.data.success) {
                console.log(response.data)
                setRetailerProf(response.data.retailerProfile)
                setLoading(false)
            }
        } catch (error) {
            console.log('error while fetching the profile')
            setLoading(false)
            toast.error('Please try again')
        }
    }

    const handleAccept = async () => {
        try {
            setButtonClickLoading(true)
            const id = retailerProf._id
            console.log('id is ', id)
            const response = await api.post(`/production/acc-req`, { id })

            const data = response.data;
            if (data.success == true && data.message == 'already connected') {
                toast.success('Already connected')
                navigate('/production/requests')
            } else if (data.success == true && data.message == 'User connected') {
                toast.success('Succesfully connected')
                setButtonClickLoading(false)
                navigate('/production/requests')
            }
            else {
                toast.error('Please try again')
            }
        } catch (error) {
            console.log('Error while accepting request')
            setButtonClickLoading(false)
            toast.error('Error! please try again')
        }
    }

    const handleReject = async () => {
        try {
            setButtonClickLoading(true)
            const profileId = retailerProf._id
            const response = await api.delete(`/production/delete-req?id=${profileId}`);

            if (response.data.success) {
                toast.success(response.data.message)
                setButtonClickLoading(false)
                navigate('/production/requests')
            }
        } catch (error) {
            console.log('error in rejecting the request')
            toast.error('Something went wrong, please try again')
            setButtonClickLoading(false)

        }
    }


    return (
        <div className='bg-slate-100 rounded-lg shadow-lg flex flex-col items-center justify-center overflow-y-auto pb-3 w-9/12'>
            {loading ? (
                <div className='p-5  h-40 flex flex-col items-center justify-center'>
                    <ClipLoader color="rgb(10, 10, 10)" size={60} />
                </div>
            ) : (
                <>
                    <div className='text-center pt-7'>
                        <img src={img} alt="" className='w-36 rounded-xl shadow-slate-800 shadow-md' />
                    </div>
                    <h1 className='text-center font-bold  p-5 productionName' style={{ fontSize: '32px' }}>{retailerProf.retailerName}</h1>
                  
                        <>
                            {buttonClickLoading ? (

                                <div>
                                    <div className='space-x-5'>
                                        <button className='p-1 bg-slate-300 rounded-md shadow-md  hover:text-white w-40' ><ClipLoader /></button>
                                    </div>

                                </div>
                            ) : (

                                <div className='space-x-5'>
                                    <button className='p-2 bg-green-500 rounded-md shadow-md hover:bg-green-700 hover:text-white' onClick={handleAccept}>Accept request</button>
                                    <button className='p-2 bg-red-500 rounded-md shadow-md hover:bg-red-700 hover:text-white' onClick={handleReject}>Reject request</button>
                                </div>
                            )}
                        </>

                    <div className='p-8'>
                        <div className='border-2 rounded-lg bg-red-50/40 border-pink-700/10 p-5 box-border text-center description min-w-80'>
                            <div>
                                <h1 className='pb-4 font-bold'>About</h1>
                            </div>
                            <h2 className='description min-h-16 '>
                                {retailerProf.description}
                            </h2>
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}
