import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestResetCode } from '../api/authApi';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await requestResetCode(email);
      localStorage.setItem('resetEmail', email);
      navigate('/verify-code');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded text-white transition duration-200 ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Verification Code'}
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
