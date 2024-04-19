import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import api from '../../../axios/api';

interface Chart {
    month: number;
    totalPayment: number;
}

export default function ReportAdmin() {
    const [revenue, setRevenue] = useState<Chart[]>([]);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        try {
            const response = await api.get('/admin/report');
            if (response.data.success) {
                console.log(response.data)
                // Extracting data from the response
                setRevenue(response.data.revenueData)   

            }
        } catch (error) {
            console.log('Error while fetching data', error);
        }
    };

    return (
        <div className='bg-white rounded-md shadow-md'>
            <div className='p-5'>
                <div className='border rounded-md w-fit text-center overflow-x-auto'>
                    <h1>Revenue collected</h1>
                    {revenue.length > 0 && (

                        <BarChart
                            xAxis={[{ scaleType: 'band', data: revenue.map(data => data.month) }]}
                            // xAxis= {[{scaleType: 'band', data: revenue.map(data=> data.month)}]}
                            series={[{ data: revenue.map(data => data.totalPayment) }]}
                            width={500}
                            height={300}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
