import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyResetCode } from '../api/authApi';
import { toast } from 'react-toastify';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await verifyResetCode(email, code);
      localStorage.setItem('resetCode', code);
      localStorage.setItem('resetCodeVerified', 'true');
      navigate('/reset-password');
      
      toast.success("Verified Code");
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
      toast.error("Invalid Code");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-5/12 bg-blue-700 relative overflow-hidden">
        <div className="absolute w-full h-full">
          <div className="absolute rounded-full w-96 h-96 border border-blue-600 opacity-20 top-16 -left-20"></div>
          <div className="absolute rounded-full w-96 h-96 border border-blue-600 opacity-20 top-40 -left-10"></div>
          <div className="absolute rounded-full w-96 h-96 border border-blue-600 opacity-20 top-16 left-20"></div>
        </div>
      </div>

      <div className="w-full md:w-7/12 flex items-center justify-center p-8 bg-gray-100">
        <div className="w-full max-w-md bg-white shadow rounded-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Verify Code</h1>
            <p className="text-gray-600 mt-2 text-sm">
              Enter the 6-digit code sent to your email to verify your identity.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex justify-center">
              <input
                id="code"
                type="text"
                placeholder="______"
                value={code}
                onChange={handleChange}
                required
                maxLength={6}
                className="w-48 text-center tracking-widest text-2xl font-mono px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={code.length !== 6}
              className={`w-full py-2 rounded text-white transition duration-200 ${code.length === 6
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Verify
            </button>
          </form>

          {error && (
            <p className="mt-4 text-center text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="text-center mt-6 text-sm">
            <span className="text-gray-600">Entered wrong email? </span>
            <button
              onClick={() => navigate('/forgot-password')}
              className="text-blue-700 hover:underline font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
