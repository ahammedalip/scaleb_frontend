import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

function Header() {

  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showSignupDropdown, setShowSignupDropdown] = useState(false);

  const token: any = localStorage.getItem("access_token1")
  const isloggedin =  !!token;


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
      <div className="fixed p-4 w-[98%] border-box shadow-xl flex justify-between items-center rounded-full bg-white">
        <h2 className="headerLogo pl-5 text-xl">SCALE.B</h2>
        {isloggedin ? (
          <div className='flex items-center space-x-4 mr-4 pr-8'>
            <Link to='/profile'>
            <img src="../../../public/images/profileC.png" alt=""  className='w-8 h-8 '/>
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
