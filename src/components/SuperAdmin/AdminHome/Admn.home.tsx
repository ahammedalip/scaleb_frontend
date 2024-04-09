

function Admnhome() {
  return (
    
      <div className="p-5 rounded-md shadow-md h-[95%]"
        style={{
          backgroundImage: "url('../../../../public/images/justwall.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='justify-center md:flex md:justify-between px-10 pt-9'>
          <div className='w-full sm:w-auto flex flex-col justify-center items-center md:w-1/4 bg-black text-white p-7 text-center bg-opacity-50 rounded-md shadow-md m-2'>
            <h1 className='text-2xl'>Total Revenue:</h1>
            <h1 className='text-5xl font-bold'>$ 7999</h1>
          </div>
          <div className='w-full sm:w-auto flex flex-col justify-center items-center md:w-1/4 bg-black text-white p-7 text-center bg-opacity-50 rounded-md shadow-md m-2'>
            <h1 className='text-2xl'>Retailers</h1>
            <h1 className='text-5xl font-bold'>13</h1>
          </div>
          <div className='w-full sm:w-auto flex flex-col justify-center items-center md:w-1/4 bg-black text-white p-7 text-center bg-opacity-50 rounded-md shadow-md m-2'>
            <h1 className='text-2xl'>Production</h1>
            <h1 className='text-5xl font-bold'>9</h1>
          </div>
        </div>
      </div>
  

  )
}

export default Admnhome