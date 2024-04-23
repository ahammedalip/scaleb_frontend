import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import api from '../../../axios/api'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import img1 from "../../../../public/images/sales-wall.jpg"

interface BarChart {
  retailerName: string;
  productionAdmin: string;
  totalOrders: number;
}

export default function ReportSales() {
  const [loading, setLoading] = useState(false)
  const [barChartData, setBarChartData] = useState<BarChart[]>([])
  const [pieChartData, setPieChartData] = useState<BarChart[]>([])

  useEffect(() => {
    fetchReport()
  }, [])

  const fetchReport = async () => {
    try {
      setLoading(true)
      const response = await api.get('/sales/report')
      if (response.data.success) {
        console.log(response.data)
        setBarChartData(response.data.barChart)
        setPieChartData(response.data.pieChart)
        setLoading(false)
      }
    } catch (error) {
      console.log('error at fetching report', error)
      setLoading(false)
      toast.error('please refresh later')
    }
  }

  return (
    <div className='rounded-md shadow-md bg-white  '
      style={{
        backgroundImage: `url(${img1})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',

      }}>
      {loading ? (
        <div className='h-96 flex justify-center items-center'>
          <ClipLoader />
        </div>

      ) : (
        <div className='p-5 flex-row space-y-5 items-center justify-center overflow-x-auto '>
          <div>

            {barChartData.length > 0 ? (
              <div className=' border-2  bg-slate-100/70 w-fit rounded '>

                <h1>Sales Executives chart</h1>
                <BarChart
                  xAxis={[{ data: barChartData.map(data => data.retailerName), scaleType: 'band' }]}
                  series={[{ data: barChartData.map(data => data.totalOrders) }]}
                  width={400}
                  height={250}
                />

              </div>
            ) : (
              <div className='bg-slate-100/70 w-fit'>
                <h1 className='text-center pt-10'>Your haven't created any orders yet</h1>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['You'] }]}
                  series={[{ data: [0] }]}
                  width={500}
                  height={300}
                />
              </div>
            )}
          </div>
          <div>
            {pieChartData.length > 0 && (
              <div className='border-2 bg-slate-100/70 w-fit rounded '>
                <h1>Orders to Production Unit</h1>
                <PieChart
                  series={[
                    {
                      data: pieChartData.map((data, index) => ({
                        id: index + 1,
                        value: data.totalOrders,
                        label: data.productionAdmin
                      })),
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                  ]}
                  width={400}
                  height={200}
                />

              </div>
            )}
          </div>
        </div>
      )}




    </div>
  )
}
