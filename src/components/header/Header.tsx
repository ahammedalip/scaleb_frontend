import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

function Header() {

  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showSignupDropdown, setShowSignupDropdown] = useState(false);

  const retailerToken: any = localStorage.getItem("retailer_token")
  const isRetailerLoggedIn = !!retailerToken;

  const retailerSalesToken: any = localStorage.getItem("retailerSales_token")
  const isRetailerSalesLoggedIn = !!retailerSalesToken

  const superAdminToken: any = localStorage.getItem('superAdmin_token')
  const isSuperAdminloggedIn = !!superAdminToken

  const productionToken: any = localStorage.getItem('production_token')
  const isProductionLoggedIn = !!productionToken

  const handleLoginMouseEnter = () => {
    setShowLoginDropdown(true);
  };

  const handleLoginMouseLeave = () => {
    setShowLoginDropdown(false);
  };

  const handleSignupMouseEnter = () => {
    setShowSignupDropdown(true);
  };

  const handleSignupMouseLeave = () => {
    setShowSignupDropdown(false);
  };

  return (
    <div className='flex justify-center'>
      <div className="fixed p-4 w-[98%] border-box shadow-lg flex justify-between items-center rounded-full bg-white">
        <h2 className="headerLogo pl-5 text-xl">SCALE.B</h2>
        {isRetailerLoggedIn ? (
          <div className='flex items-center space-x-10 mr-4'>
            <Link to='/retail/home'>
              <h1>Home</h1>
            </Link>
            <Link to='/retail/profile'>
              <img src="../../../public/images/profileC.png" alt="" className='w-8 h-8 ' />
            </Link>
          </div>
        ) : isRetailerSalesLoggedIn ? (
          <div className='flex items-center space-x-10 mr-4'>
            <Link to='/sales/home'>
              <h1>Home</h1>
            </Link>
            <Link to='/sales/profile'>
              <img src="../../../public/images/profileC.png" alt="" className='w-8 h-8 ' />
            </Link>
          </div>

        ) : isProductionLoggedIn ? (
          <div className='flex items-center space-x-10 mr-4'>
            <Link to='/production/home'>
              <h1>Home</h1>
            </Link>
            <Link to='/production/profile'>
              <img src="../../../public/images/profileC.png" alt="" className='w-8 h-8 ' />
            </Link>
          </div>
        ) : isSuperAdminloggedIn ? (
          <div className='flex items-center space-x-10 mr-4'>
            <Link to='/admin/home'>
              <h1>Home</h1>
            </Link>
            <Link to='/admin/profile'>
              <img src="../../../public/images/profileC.png" alt="" className='w-8 h-8 ' />
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4 mr-4 pr-8">
            <Link to='/action'><button>Home</button></Link>
            <div className="relative" onMouseEnter={handleLoginMouseEnter} onMouseLeave={handleLoginMouseLeave}>
              <button>Login</button>
              {showLoginDropdown && (
                <div className="dropdown bg-white">
                  <ul>
                    <Link to='/retail/login'><li>Retail</li></Link>
                    <Link to='/production/login'><li>Production</li></Link>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={handleSignupMouseEnter} onMouseLeave={handleSignupMouseLeave}>
              <button>Signup</button>
              {showSignupDropdown && (
                <div className='dropdown bg-white'>
                  <ul>
                    <Link to='/retail/signup'><li>Retail</li></Link>
                    <Link to='/production/signup'><li>Production</li></Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
