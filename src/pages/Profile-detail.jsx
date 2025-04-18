import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import logo from "../assets/Migracon.svg";
import notification from "../assets/notificaton.png"
import EditProfileModal from "../Model/EditProfileModal"
import { UserContext } from '../context/userContext'
import axios from 'axios';
import {
  FaArrowLeft,
  FaBell,
  FaEnvelope,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const ProfileDetail = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { user } = useContext(UserContext)
  const openModal = () => setIsEditOpen(true);
  const closeModal = () => setIsEditOpen(false);
  const [agentData, setAgentData] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {
    fetchAgentData();
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };


  const fetchAgentData = async () => {
    try {
      if (user?.agentId) {
        const response = await axios.get(`http://localhost:5000/agent/${user.agentId}`);
        console.log('Agent Data:', response.data);
        setAgentData(response.data.agent); // Store agent data here
      }
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/agent/update/${user.agentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAgentData(data.agent); // Refresh UI with updated data
      } else {
        alert("Update failed: " + data.message);
      }
    } catch (err) {
      console.error("Update error", err);
      alert("Something went wrong!");
    }
  };

  const tabs = [
    { key: "profile", label: "Profile Information" },
    { key: "business", label: "Business Information" },
    { key: "notifications", label: "Notification Preferences" },
  ];

  return (
    <div className="container">
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div
            className="container mx-auto px-4 py-4 flex items-center justify-between"
            style={{ borderBottom: "2px solid #bebebe" }}
          >
            <div className="flex items-center space-x-2 text-gray-500">
              <Link to="/dashboard" className="text-gray-500">
                <FaArrowLeft />
              </Link>
              <span>Home</span>
              <span>/</span>
              <span className="text-gray-900 font-semibold">Dashboard</span>
            </div>
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-4">
                <FaBell className="text-gray-500 cursor-pointer" />
                <img
                  src={user?.profilePicture || "https://randomuser.me/api/portraits/women/44.jpg"}
                  alt="User"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>


          </div>
        </header>

        {/* Main */}
        <main className="container mx-auto px-4 py-8">
          <div className="rounded-lg p-6">
            {/* Tabs */}
            <div
              className="flex justify-between items-center mb-6"
              style={{ borderBottom: "2px solid #d6d6d6", width: "80%" }}
            >
              <div className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded ${activeTab === tab.key
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "profile" && (
              <>
                {/* Profile Info */}
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Profile Information
                      </h2>
                    </div>
                    <div className="col-md-8">
                      <div
                        className="flex items-center space-x-2 py-1 ml-[33%] rounded-3 border"
                        style={{ width: "38%" }}
                      >
                        <img
                          alt="Company Logo"
                          className="w-10 h-10 rounded-full ms-2"
                          src={user?.profilePicture || "https://randomuser.me/api/portraits/women/44.jpg"}
                        />
                        <div>
                          <p
                            className="text-gray-900 font-semibold m-0"
                            style={{ fontSize: "12px" }}
                          >
                            Migracon Inc.
                          </p>
                          <p
                            className="text-gray-500 text-sm m-0"
                            style={{ fontSize: "12px" }}
                          >
                            Recruitment Partner ID: {agentData?._id || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="p-6 rounded-lg border shadow-sm bg-white"
                  style={{ width: "52%" }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      User Settings
                    </h3>
                    <MdEdit className="text-gray-500 cursor-pointer" onClick={openModal} />

                    <EditProfileModal
                      isOpen={isEditOpen}
                      onClose={closeModal}
                      agentData={agentData}
                      onSubmit={handleUpdate}
                    />
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8" >
                    {/* Profile Photo */}
                    <div className="text-sm text-gray-500 font-medium">
                      Profile Photo
                    </div>
                    <div className="flex items-center">
                      <img
                        alt="Profile"
                        className="w-10 h-10 rounded-full ms-auto"
                        src={user?.profilePicture || "https://randomuser.me/api/portraits/women/44.jpg"}
                      />
                    </div>

                    {/* Password */}
                    <div className="text-sm text-gray-500 font-medium">
                      Password
                    </div>
                    <div className="text-gray-900 text-sm ms-auto">
                      *********
                    </div>

                    {/* First Name */}
                    <div className="text-sm text-gray-500 font-medium">
                      First Name
                    </div>
                    <div className="text-gray-900 text-sm ms-auto">
                      {agentData?.firstName || 'N/A'}
                    </div>

                    {/* Last Name */}
                    <div className="text-sm text-gray-500 font-medium">
                      Last Name
                    </div>
                    <div className="text-gray-900 text-sm ms-auto">
                      {agentData?.lastName || 'N/A'}
                    </div>

                    {/* Email */}
                    <div className="text-sm text-gray-500 font-medium">
                      Email
                    </div>
                    <div className="text-gray-900 text-sm ms-auto">
                      {agentData?.email || 'N/A'}
                    </div>

                    {/* Mobile */}
                    <div className="text-sm text-gray-500 font-medium">
                      Mobile
                    </div>
                    <div className="flex items-center text-gray-900 text-sm space-x-2">
                      <img
                        alt="Canada Flag"
                        className="w-5 h-5 ms-auto"
                        src="https://placehold.co/20x20"
                      />
                      <span>{agentData?.phone || 'N/A'}</span>
                    </div>
                  </div>

                </div>
              </>
            )}

            {activeTab === "business" && (
              <>
                {/* Profile Info */}
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Business Information
                      </h2>
                    </div>
                    <div className="col-md-8">
                      <div
                        className="flex items-center space-x-2 py-1 ml-[33%] rounded-3 border"
                        style={{ width: "38%" }}
                      >
                        <img
                          alt="Company Logo"
                          className="w-10 h-10 rounded-full ms-2"
                          src={logo}
                        />
                        <div>
                          <p
                            className="text-gray-900 font-semibold m-0"
                            style={{ fontSize: "12px" }}
                          >
                            Migracon Inc.
                          </p>
                          <p
                            className="text-gray-500 text-sm m-0"
                            style={{ fontSize: "12px" }}
                          >
                            Recruitment Partner ID: 259023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="p-6 rounded-lg border "
                  style={{ width: "52%" }}
                >
                  {/* Header */}
                  <div className="p-6 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      General Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      {/* Company Logo */}
                      <div className="text-sm text-gray-500 font-medium">Company Logo</div>
                      <div className="flex justify-start ms-auto">
                        <img
                          src={logo}
                          alt="Company Logo"
                          className="w-10 h-10 object-contain"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="text-sm text-gray-500 font-medium">Company Name</div>
                      <div className="text-gray-900 text-sm ms-auto">Migracon Inc.</div>

                      {/* Website */}
                      <div className="text-sm text-gray-500 font-medium">Website</div>
                      <div className="text-blue-600 text-sm underline ms-auto">
                        <a href="https://www.migracon.com" target="_blank" rel="noreferrer">
                          www.migracon.com
                        </a>
                      </div>

                      {/* Main Source Of Students */}
                      <div className="text-sm text-gray-500 font-medium">Main Source Of Students</div>
                      <div className="flex items-center text-sm ms-auto space-x-2">
                        <img
                          src="https://flagcdn.com/w40/pk.png"
                          alt="PK"
                          className="w-5 h-4 object-cover"
                        />
                        <span>Pakistan</span>
                      </div>

                      {/* Street Address */}
                      <div className="text-sm text-gray-500 font-medium">Street Address</div>
                      <div className="text-gray-900 text-sm ms-auto">5485 Bellaggio Crescent</div>

                      {/* City */}
                      <div className="text-sm text-gray-500 font-medium">City</div>
                      <div className="text-gray-900 text-sm ms-auto">Mississauga</div>

                      {/* Country */}
                      <div className="text-sm text-gray-500 font-medium">Country</div>
                      <div className="flex items-center text-sm ms-auto space-x-2">
                        <img
                          src="https://flagcdn.com/w40/ca.png"
                          alt="Canada"
                          className="w-5 h-4 object-cover"
                        />
                        <span>Canada</span>
                      </div>

                      {/* State / Province */}
                      <div className="text-sm text-gray-500 font-medium">State / Province</div>
                      <div className="text-gray-900 text-sm ms-auto">Ontario</div>

                      {/* Postal Code */}
                      <div className="text-sm text-gray-500 font-medium">Postal Code</div>
                      <div className="text-gray-900 text-sm ms-auto">L5V 0C6</div>
                    </div>
                  </div>


                </div>
              </>
            )}


            {activeTab === "notifications" && (
              <div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Notification Preferences</h1>
                <p className="text-gray-600 mb-6 pb-2" style={{ borderBottom: "2px solid #d6d6d6", width: "80%" }}>
                  Manage your notifications (including alert types and frequency) to stay informed and meet every deadline.
                </p>

                {/* Notification Type */}
                <div className="mb-6">
                  <label htmlFor="notification-type" className="block text-gray-700 font-medium mb-2">
                    Notification type <i className="fas fa-info-circle text-gray-400"></i>
                  </label>
                  <select id="notification-type" className="block w-full border border-gray-300 rounded-md p-2" style={{ width: "9%" }}>
                    <option>Notes</option>
                  </select>
                  <p className="text-gray-600 mt-2">
                    You will receive a notification when a new note has been added to an application.
                  </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ width: '68%' }}>
                  {/* Email Notifications */}
                  <div className="bg-white p-6 rounded-lg shadow-md w-full">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Email notifications</h2>
                    <p className="text-gray-600 mb-4">
                      Adjust how you would like to receive this type of notification via email.
                    </p>
                    <label htmlFor="frequency-options" className="block text-gray-700 font-medium mb-2">
                      Frequency options
                    </label>
                    <select id="frequency-options" className="block w-full border border-gray-300 rounded-md p-2 mb-4">
                      <option>Immediate</option>
                      <option>Never</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                    </select>
                  </div>

                  {/* Mobile Notification Illustration */}

                  <div className="bg-white p-6 rounded-2 shadow-md w-full flex flex-col items-center text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 w-full text-left">
                      Mobile Push Notifications
                    </h2>

                    <img
                      src={notification}
                      alt="Mobile Notification"
                      width={100}
                      height={100}
                      className="mb-4"
                    />

                    <p className="text-gray-600 mb-4">
                      To receive notifications on your phone, open the ApplyBoard app. Don’t have it yet?
                    </p>

                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white px-5 py-2 rounded-lg flex items-center">
                      <i className="fas fa-download mr-2"></i> Download App
                    </button>
                  </div>

                </div>

              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white py-4 mt-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © 2025 Migraconstudy.com
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500">
                <FaEnvelope />
              </a>
              <a href="#" className="text-gray-500">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-500">
                <FaYoutube />
              </a>
              <a href="#" className="text-gray-500">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-500">
                <FaLinkedin />
              </a>
            </div>
            <div className="flex flex-wrap space-x-4 mb-2 md:mb-0">
              {[
                "Legal",
                "Privacy policy",
                "Terms & conditions",
                "Accessibility",
                "About",
                "Blog",
              ].map((item) => (
                <a key={item} className="text-gray-500" href="#">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>

        {/* Help Button */}
        <div className="fixed bottom-4 right-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
            Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
