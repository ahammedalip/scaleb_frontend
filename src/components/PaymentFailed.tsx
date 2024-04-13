import Header from './header/Header'

function PaymentFailed() {
  return (
    <div>
        <Header/>
        <div className='bg-gray-500'>
            <h1 className='text-red-500'>payment failed</h1>
        </div>
    </div>
  )
}

export default PaymentFailed