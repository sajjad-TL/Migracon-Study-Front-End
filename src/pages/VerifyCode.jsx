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
    // Sirf digits allow + max 6 digits
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
      navigate('/reset-password');
      toast.success("Verified Code");
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
      toast.error("Invalid Code")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Verify Code
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Enter 6-Digit Code
            </label>
            <input
              id="code"
              type="text"
              placeholder="______"
              value={code}
              onChange={handleChange}
              required
              maxLength={6}
              className="w-48 text-center tracking-widest text-2xl font-mono px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            />
          </div>
          <button
            type="submit"
            disabled={code.length !== 6}
            className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 ${
              code.length === 6
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
      </div>
    </div>
  );
}
