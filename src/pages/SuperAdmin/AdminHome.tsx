import Admnhome from '../../components/SuperAdmin/AdminHome/Admn.home'
import Header from '../../components/header/Header'
import Menu from '../../components/SuperAdmin/menu/Menu'

function AdminHome() {
  return (
    <div className=''>
      <Header />
      <div className='flex bg-red-50/40 space-x-5 pt-20 h-screen'>
        <Menu />
        <div className='w-9/12 '>

        <Admnhome />
        </div>
      </div>

    </div>
  )
}

export default AdminHome