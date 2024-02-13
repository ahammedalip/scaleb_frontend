import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../axios/api.ts'

interface FormData {
  username?: string;
  password?: string;
}


function Adminlogin() {
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post('/admin/Admin-auth', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = response.data;
      console.log(data);
      if(data.success=== true){
        localStorage.setItem('access_token', data?.token)

        navigate('/admin/home');
      }
      

    } catch (error) {
      console.error(error?.response.data);
      // setError(error? error.response.data: "An error occured")
      setError(error?.response.data.message || 'An error occurred');

    }
  };

  return (
    <div className=''>
      <div className='pt-11 flex '>
        <div className='w-1/3 pt-20 pb-44'>
          <div className="flex items-center justify-center h-full">
            <form className="p-8 shadow-md rounded-md w-96" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
              <div className="mb-4">
                {error && (
                  <div className="mb-4 text-red-500 text-center">{error}</div>
                )}
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your username"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="pt-5 w-2/3 bg-[url('../../../public/images/loginA1.jpg')] bg-cover">
          {/* Your image section */}
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
