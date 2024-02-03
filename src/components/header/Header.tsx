import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='flex justify-center'>
      <div className="fixed  p-4 w-[98%] border-box shadow-xl flex justify-between items-center rounded-full bg-white">
        <h2 className=" headerLogo pl-5 text-xl ">SCALE.B</h2>
        <div className="flex items-center space-x-4 mr-4">
          <button>Home</button>
          <button className="">Login</button>
          <button className="">Signup</button>
        </div>
      </div>
    </div>

  )
}

export default Header