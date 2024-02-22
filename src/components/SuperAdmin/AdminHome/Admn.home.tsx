import React from 'react'
import Menu from '../menu/Menu'

function Admnhome() {
  return (
    <div className='pt-20 bg-red-50/40 flex'>
      <div className='w-1/5'>
      <Menu/>
      </div>
      
      <div className='pl-8 rounded-lg w-4/5 '>
        <div className='rounded-lg shadow-2xl'>

        <img src="../../../../public/images/justwall.jpg" alt="" className='' />
        </div>
      </div>
    </div>
  )
}

export default Admnhome