import React from 'react'
import './Signup.landing.css'
import { Link } from 'react-router-dom'
import bg from '../../../public/images/5588665.jpg'

function Signuplanding() {
  return (
    <div>
      <div className="bg-[url('../../../public/images/landing_soc.jpg')] bg-cover h-auto shadow-md">
        <div className='flex pt-24 ml-48'>
          <div className='flex-1 pb-10'>
            <img src={"../../../public/images/store image.jpg"} alt="" className='sideImage12' />
          </div>
          <div className='flex-1 mr-16 '>
            <div className='grid place-items-center'>
              <h1 className='text-5xl font-bold pt-11 text-slate-500'>Retail Business</h1>
              <p className='pt-8'>Ready to revolutionize your retail business? Join us today and take the first step towards
                streamlined management and increased success.</p>
              <Link to="/retail/signup">
                <h4 className='text-blue-500 font-medium pt-5'>Signup here</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='pt-10'></div>

      {/* <div className="flex bg-[url('../../../public/images/oa.png')] bg-cover shadow translate-x-[-5px] translate-y-[-5px]"> */}
      <div className='flex bg-gradient-to-r from-cyan-100 via-cyan-300 to-cyan-600'>
        <div className='flex-1 ml-16 text-center pt-10'>
          <h1 className='text-5xl font-bold pt-11 text-slate-500'>Production Units</h1>
          <p className='pt-12'>Ready to revolutionize your retail business? Join us today and take the first step towards streamlined management and increased success.</p>
          <h4 className='text-blue-500 font-medium pt-5'>Signup here</h4>
        </div>
        <div className='flex-1 pt-8 ml-12'>
          <img className='h-80 sideImage22' src="../../../public/images/fact.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Signuplanding