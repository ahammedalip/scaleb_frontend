import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import api from '../../axios/api'
import { PieChart } from '@mui/x-charts/PieChart';

interface ChartData {
    retailerName: string;
    totalOrders: number
}

export default function ReportsProd() {
    const [loading, setLoading] = useState(false)
    const [pieChartData, setPieChartData] = useState<ChartData[]>([])

    useEffect(() => {
        fetchReports()
    }, [])

    const fetchReports = async () => {
        try {
            setLoading(true)
            const response = await api.get('/production/report')
            if (response.data.success) {
                console.log('data si ', response.data)
                setPieChartData(response.data.pieChart)
                setLoading(false)
            }
        } catch (error) {
            console.log('error while fetching reports', error)
            setLoading(false)
            toast.error('Please refresh later.')
        }
    }
    return (
        <div className='bg-white rounded-md shadow-md h-[95%] pt-5 flex  justify-center'>

            <div className='border-2 rounded-md text-center p-5 w-fit h-fit justify-center overflow-x-auto'>
                <h1>Order data from Retailers</h1>
                {loading ? (
                    <div>
                        <ClipLoader />
                    </div>
                ) : (
                    <>
                        {pieChartData && pieChartData.length > 0 && (
                            <PieChart
                                series={[
                                    {
                                        data: pieChartData.map((data, index) => ({
                                            id: index,
                                            value: data.totalOrders,
                                            label: data.retailerName
                                        })),
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    },
                                ]}
                                width={400}
                                height={200}
                            />


                        )}
                    </>
                )}


            </div>
        </div>
    )
}


// data: [
//     { id: 0, value: 10, label: 'series A' },
//     { id: 1, value: 15, label: 'series B' },
//     { id: 2, value: 20, label: 'series C' },
//   ],