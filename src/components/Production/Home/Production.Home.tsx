import React from 'react'

function Productionhome() {
  return (
    <div className='bg-white rounded-md h-[95%] shadow-md opacity-95'
      style={{
        backgroundImage: "url('../../../../public/images/mid-century-modern-living-room-interior-design-with-monstera-tree (1).jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='p-10'>
        <div className=' bg-slate-300/30 text-white opacity-100 w-fit p-5 rounded-lg flex flex-col items-center justify-center'>
          <h1 className='text-2xl'>Total Orders:</h1>
          <h1 className='text-5xl font-bold'>7</h1>
        </div>
      </div>

    </div>
  )
}

export default Productionhome