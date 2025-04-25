import React, { useState, useEffect, useContext } from 'react';
import img1 from "../assets/Auth-banner.png";
import logo from "../assets/Migracon.svg";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../context/userContext';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)

  const handleLoginSuccess = async (response) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (data?.token) {
        localStorage.setItem("token", data.token);
        console.log('Context of google stored user', data)
        setUser(data);
        setError(null);
        navigate("/dashboard");
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setError('Error with the Google login API');
    }
  };


  const handleLoginError = (error) => {
    setError('Failed to login with Google');
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      if (res.status === 200) {

        localStorage.setItem("token", res.data.token);
        console.log('Context of normal login user', res.data)
        setUser(res.data)
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, []);


  return (
    <div className="min-h-screen flex">

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm">
          <img
            src={logo}
            alt="ApplyBoard Logo"
            className="h-10 mb-8"
          />

          <h2 className="text-2xl font-semibold mb-6">Log In</h2>

          {error && (
            <div className="text-red-600 mb-4 bg-red-100 p-2 rounded">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 border rounded-lg w-full"
              value={form.email}
              onChange={handleChange}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="p-3 border rounded-lg w-full"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Log In
            </button>
          </form>

          <div className="text-sm text-right mt-2 text-blue-600 cursor-pointer hover:underline">
            <Link to="/forgot-password">

              Forgot password?
            </Link>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="space-y-2">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
            <button className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100">
              <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="Apple" className="h-5 mr-2" />
              Log In with Apple
            </button>
            <button className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="h-5 mr-2" />
              Log In with Facebook
            </button>
          </div>

          <div className="text-sm mt-4 text-blue-600 cursor-pointer hover:underline">
            Unlock account?
          </div>

          <div className="text-sm mt-6 text-center">
            Don’t have an account?
            <div className="text-blue-600 space-y-1">
              <div className="cursor-pointer hover:underline">Register as a Student</div>
              <Link to="/register">
                <div className="cursor-pointer hover:underline">
                  Register as a Recruitment Partner
                </div>
              </Link>
            </div>
          </div>

          <div className="text-sm mt-4 text-blue-600 space-x-4 text-center">
            <a href="#" className="underline">Privacy & Cookies Policy</a>
            <a href="#" className="underline">Terms & Conditions</a>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2 bg-cover bg-center " style={{ backgroundImage: `url(${img1})` }}></div>
    </div>
  );
};

export default Login;
