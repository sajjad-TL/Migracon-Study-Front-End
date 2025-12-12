import { useState } from 'react';
import { resetPassword } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { CheckCircle, Circle } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');
  const code = localStorage.getItem('resetCode');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );
      toast.error('Password does not meet requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      await resetPassword({ email, code, password, confirmPassword });
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetCode');
      localStorage.removeItem('resetCodeVerified');
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
      toast.error('Password reset failed');
    }
  };
  const checks = {
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const renderCheck = (condition, text) => (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      {condition ? (
        <CheckCircle className="text-green-600" size={16} />
      ) : (
        <Circle className="text-gray-400" size={16} />
      )}
      {text}
    </div>
  );
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
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Enter your new password and confirm it below.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute bottom-3 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute top-9 right-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {renderCheck(checks.length, 'At least 12 characters')}
                {renderCheck(checks.lower, 'A lowercase letter')}
                {renderCheck(checks.upper, 'An uppercase letter')}
                {renderCheck(checks.number, 'A number')}
                {renderCheck(checks.symbol, 'A symbol')}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Reset Password
            </button>
          </form>
          {error && (
            <p className="mt-4 text-center text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
