import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { requestResetCode } from '../api/authApi';
import { toast } from "react-toastify"

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
      toast.success("Check your verification code in Email")
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setIsSubmitting(false);
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

      <div className="w-full md:w-7/12 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Forgot Password</h1>
            <p className="text-gray-600 mt-2 text-sm">
              Enter the email address you used when joined and we'll
              send reset instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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
          <div className="text-center mt-6 text-sm">
            <span className="text-gray-600">Back to log in page? </span>
            <Link to="/login" className="text-blue-700 hover:underline font-medium">Back now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

