import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='ml-4'>
      <div className="nav fixed  z-50 w-full border-box shadow-xl p-4 flex justify-between items-center rounded-full bg-white">
        <h2 className=" headerLogo ml-5 text-xl ">SCALE.B</h2>
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