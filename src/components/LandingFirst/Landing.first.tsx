
import './landing.first.css'
import { Link } from 'react-router-dom';
import image2 from "../../../public/images/buisiness meet.jpg"
import image3 from '../../../public/images/home 1.png'

function LandingFirst() {
  return (
    <div className=''>

      <div className='backgroun'>

        <div className='name text-center flex items-center pt-20 '>
          <div className='textName flex-1'>
            <h3 className='growPara'>Grow your business with</h3>
            <h1 className='scaleb text-8xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent'>SCALE.B</h1>
          </div>

          <div className='pl-20 flex-1 '>
            <img src={image3} alt="Your Alt Text" className="sideImage w-[450px]" />

          </div>

        </div>
      </div>
      <div className='p-10 flex items-center justify-center flex-col'>
        <h4 className='footTitl text-center text-4xl font-bold text-gray-600'>Join for the dynamic growth of your wholesale or retail firm with the connected network</h4>
        <div className='p-5 pt-12 text-center'>

          <h1 className='font-semibold text-2xl text-gray-700'>Discover the key features</h1>
          <div className='pt-4 flex flex-col sm:flex-row sm:space-x-5 space-x-0 space-y-4 sm:space-y-0'>
            <div className='bg-white p-7 text-center items-center justify-center flex w-36 rounded-lg shadow-xl font-bold text-gray-600'>
              <h1>Seamless order management</h1>
            </div>
            <div className='bg-white p-7 text-center items-center justify-center flex w-36 rounded-lg shadow-xl font-bold text-gray-600'>
              <h1>Real Time messaging</h1>
            </div>
            <div className='bg-white p-7 text-center items-center justify-center flex w-36 rounded-lg shadow-xl font-bold text-gray-600'>
              <h1>Instant reports</h1>
            </div>
          </div>
        </div>
      </div>
      <div className=' flex landingSecon '>
        {/* bg-gradient-to-bl from-slate-300 via-slate-200 to-gray-50 */}
        <div className='flex-1 grid place-items-center'>
          <img src={image2} alt="" className='sideImage2' />
        </div>
        <div className='flex-1 text-center grid pt-20'>
          <p className=' ml-16 mr-16 font-medium'>Transform your wholesale and retail business with our advanced management app. Streamline operations,
            optimize inventory, and boost sales effortlessly. Join us for a future of efficiency and success!</p>
          <h1 className='font-bold text-8xl pt-4  text-blue-500'>Join Us</h1>
          <div className='flex items-center justify-center'>
            <Link to='/action'>
              <h2 className='text-white p-4 rounded-full px-4 bg-blue-800 w-fit font-semibold animate-bounce'>Get Started</h2>
            </Link>
          </div>




        </div>

      </div>

    </div>
  )
}

export default LandingFirst