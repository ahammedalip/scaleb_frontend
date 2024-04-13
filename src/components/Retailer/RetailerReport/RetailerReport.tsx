import React, { useEffect, useState } from 'react';
import api from '../../../axios/api';
import toast from 'react-hot-toast';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { jwtDecode } from 'jwt-decode';
import ClipLoader from 'react-spinners/ClipLoader'

interface JwtPayLoad {
  id: string;
}

interface ChartData {
  retailerName: string;
  productionName: string;
  totalOrders: number;
}

export default function RetailerReport() {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartDataProd, setChartDataProd] = useState<ChartData[]>([])

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    const token = localStorage.getItem('retailer_token');
    if (token) {
      const decodedToken = jwtDecode<JwtPayLoad>(token);

      if (decodedToken) {
        const decodedId = decodedToken.id;

        try {
          setLoading(true)
          const response = await api.get(`/retailer/reports?id=${decodedId}`);
          if (response.data.success) {
            console.log(response.data)
            setChartData(response.data.orders);
            setChartDataProd(response.data.ordersToProd)
            setLoading(false)
          }
        } catch (error) {
          console.log('Error while fetching report', error);
          setLoading(false)
          toast.error('Please refresh later');
        }
      }
    }
  };

  return (
    <div className='bg-white w-9/12 rounded-md shadow-md'>
      <div className='p-5 items-center justify-center flex flex-col space-y-7 overflow-x-auto'>
        {loading ? (
          <div className='w-full h-[80%] items-center justify-center flex'>
            <ClipLoader size={40}/>
          </div>
        ) : (
          <>
            {chartData.length > 0 && (
              <>
                <div className='border shadow-sm w-fit text-center'>
                  <h1>Orders By Sales Executives</h1>

                  <BarChart
                    xAxis={[{ data: chartData.map(data => data.retailerName), scaleType: 'band' }]}
                    series={[
                      {
                        data: chartData.map(data => data.totalOrders),
                      },
                    ]}
                    width={500}
                    height={300}
                  />
                </div>
                <div className='border shadow-sm w-fit text-center'>
                  <h1>Orders with Production Unit</h1>
                  <PieChart
                    series={[
                      {
                        data: chartDataProd.map((data, index) => ({
                          id: index,
                          value: data.totalOrders,
                          label: data.productionName,
                        })),
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
