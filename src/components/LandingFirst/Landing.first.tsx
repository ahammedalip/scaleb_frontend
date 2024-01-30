import React from 'react'
import Header from '../header/header'
import './landing.first.css'

function LandingFirst() {
  return (
    <div className=''>
      
      <div className='background'>

        <div className='name text-center flex items-center pt-28 '>
          <div className='textName flex-1'>
            <h3 className='growPara'>Grow your business with</h3>
            <h1 className='scaleb text-8xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent'>SCALE.B</h1>
          </div>

          <div className='pl-20 flex-1'>
            <img src="../../../public/images/6685.jpg" alt="Your Alt Text" className="sideImage " />

          </div>

        </div>
        <h4 className='footTitle pt-8 text-center'>Join for the dynamic growth of your wholesale or retail firm with the connected network</h4>
      </div>
      <div className='pt-10'></div>
      <div className=' flex landingSecond bg-gradient-to-bl from-slate-300 via-slate-200 to-gray-50'>

        <div className='flex-1 grid place-items-center'>
          <img src="../../../public/images/buisiness meet.jpg" alt="" className='sideImage2' />
        </div>
        <div className='flex-1 text-center grid pt-20'>
          <p className=' ml-16 mr-16 font-medium'>Transform your wholesale and retail business with our advanced management app. Streamline operations,
            optimize inventory, and boost sales effortlessly. Join us for a future of efficiency and success!</p>
          <h1 className='font-bold text-8xl pt-4  text-blue-500'>Join Us</h1>
          <a href="/action">
            <h2 className='text-blue-400'>Click here</h2>
          </a>

        </div>

      </div>

    </div>
  )
}

export default LandingFirst