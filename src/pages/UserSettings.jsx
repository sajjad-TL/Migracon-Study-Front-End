import React, { useContext, useState } from "react";
import SettingsNavbar from "../layouts/SettingsNavbar";
import { UserContext } from '../context/userContext';

const UserSettings = () => {
  const { user1 } = useContext(UserContext);

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "",
    notifications: true,
    darkMode: false,
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    if (password && password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSaving(false);
      return;
    }
    setMessage("Settings saved successfully.");
    setIsSaving(false);
  };

  const passwordStrength = () => {
    if (password.length > 8) return "strong";
    if (password.length > 5) return "medium";
    return "weak";
  };

  return (
    <div>
    <SettingsNavbar user={user1} />

    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6">User Settings</h2>

      <div className="space-y-5">
        {/* Profile Info */}
        <div>
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter your name"
            aria-label="Full Name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter your email"
            aria-label="Email"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter your phone number"
            aria-label="Phone Number"
          />
        </div>

        {/* Password Change */}
        <div>
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter new password"
            aria-label="New Password"
          />
          <div className={`text-xs mt-1 ${passwordStrength() === 'weak' ? 'text-red-600' : passwordStrength() === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
            Password strength: {passwordStrength()}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Confirm password"
            aria-label="Confirm Password"
          />
        </div>

        {/* Preferences */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-700">Enable Notifications</span>
          <input
            type="checkbox"
            name="notifications"
            checked={user.notifications}
            onChange={handleChange}
            className="toggle toggle-primary"
            aria-label="Enable Notifications"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Dark Mode</span>
          <input
            type="checkbox"
            name="darkMode"
            checked={user.darkMode}
            onChange={handleChange}
            className="toggle toggle-secondary"
            aria-label="Enable Dark Mode"
          />
        </div>

        {/* Feedback & Button */}
        {message && (
          <p className="text-sm text-green-600 font-medium mt-2">{message}</p>
        )}

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserSettings;
