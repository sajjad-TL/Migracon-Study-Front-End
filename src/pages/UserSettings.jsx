import React, { useContext, useEffect, useRef, useState } from "react";
import SettingsNavbar from "../layouts/SettingsNavbar";
import { UserContext } from "../context/userContext";
import EditProfileModal from "../Model/EditProfileModal"; // make sure this path is correct
import axios from "axios";

const UserSettings = () => {
  const { user, setUser } = useContext(UserContext);
  const [agentData, setAgentData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openModal = () => setIsEditOpen(true);
  const closeModal = () => setIsEditOpen(false);

  useEffect(() => {
    fetchAgentData();
  }, []);

  const fetchAgentData = async () => {
    try {
      if (user?.agentId) {
        const response = await axios.get(`http://localhost:5000/agent/${user.agentId}`);
        setAgentData(response.data.agent);
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };

  const handleUpdate = async (formData) => {
    const sendData = new FormData();

    for (let key in formData) {
      const value = formData[key];
      if (key === "profilePicture" && value instanceof File) {
        sendData.append(key, value);
      } else if (value !== "" && value !== null && value !== undefined) {
        sendData.append(key, value);
      }
    }

    try {
      const response = await fetch(`http://localhost:5000/agent/update/${user.agentId}`, {
        method: "PATCH",
        body: sendData,
      });

      const data = await response.json();

      if (data.success) {
        const { agentId, firstName, lastName, profilePicture, phone } = data.agent;
        const name = `${firstName} ${lastName}`;
        setUser({ agentId, name, profilePicture, phone });
        setAgentData(data.agent);
        closeModal();
      } else {
        alert("Update failed: " + data.message);
      }
    } catch (err) {
      console.error("Update error", err);
      alert("Something went wrong!");
    }
  };





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
      <SettingsNavbar user={user} />

      <div className="max-w-3xl mx-auto p-6 bg-white border border-b shadow-sm rounded-lg mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">User Settings</h2>
          <button
            onClick={openModal}
            className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>

        {/* Profile Details (Read Only) */}
        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <div className="border px-4 py-2 rounded-md bg-gray-50">{`${agentData?.firstName || "N/A"} ${agentData?.lastName || ""}`}</div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="border px-4 py-2 rounded-md bg-gray-50">{agentData?.email || "N/A"}</div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone</label>
            <div className="border px-4 py-2 rounded-md bg-gray-50">{agentData?.phone || "N/A"}</div>
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

        </div>
      </div>

      {/* Edit Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={closeModal}
        agentData={agentData}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default UserSettings;
