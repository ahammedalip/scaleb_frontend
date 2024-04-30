import LandingFirst from '../components/LandingFirst/Landing.first'
import Header from '../components/header/Header'
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
function landing() {
  return (
    <div className='bg-gradient-to-b from-slate-100 to-slate-300'>


      <Header />

      <LandingFirst />
      <div className='footer bg-black '>
        <div className='flex flex-row justify-between'>

        
        <div className='p-5 pl-14'>
          <h1 className='scaleb text-2xl text-white bg-clip-text text-transparent'>SCALE.B</h1>
          <div className='flex flex-row space-x-2 pt-4'>

            <a href="https://github.com/ahammedalip" >
              <FaGithubSquare className='text-gray-300 text-2xl' />
            </a>
            <a href="https://www.linkedin.com/in/ahammedalip-webdeveloper/">
              <FaLinkedin className='text-gray-300 text-2xl' />
            </a>
          </div>
        </div>


        <div className='text-white p-5 pr-14'>
          <h1 className='text-lg'>Contact</h1>
          <h1 className='pt-3 text-gray-400'>+91 8891905036</h1>
          <h1 className='text-gray-400'>ahammed.puthuppalli@gmail.com</h1>
        </div>
        </div>

        <h1 className='text-gray-400 text-center text-sm'>©All rights reserved.</h1>
      </div>
    </div>
  )
}

export default landing