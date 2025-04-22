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
  const { user, setUser } = useContext(UserContext)
  const openModal = () => setIsEditOpen(true);
  const closeModal = () => setIsEditOpen(false);
  const [agentData, setAgentData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
        fetchAgentData();
        console.log('Agent Data : ', agentData)
        console.log('Context User: ', user)
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
        console.log('Get agent api response : ', response)
        setAgentData(response.data.agent); // Store agent data here
      }
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  const handleUpdate = async (formData) => {
    console.log('Raw Form Data: ', formData);
    const sendData = new FormData();
  
    for (let key in formData) {
      const value = formData[key];
  
      // Skip empty strings and nulls (unless it's a file)
      if (key === "profilePicture" && value instanceof File) {
        sendData.append(key, value);
      } else if (key !== "profilePicture" && value !== "" && value !== null && value !== undefined) {
        sendData.append(key, value);
      }
    }
  
    try {
      console.log('Agend id in handle update func', user.agentId)
      const response = await fetch(`http://localhost:5000/agent/update/${user.agentId}`, {
        method: "PATCH",
        body: sendData,
      });

      const data = await response.json();

      if (data.success) {
        console.log('Update api repsonse : ',data)
        const { agentId, firstName, lastName, profilePicture, phone } = data.agent;
        const name = `${firstName} ${lastName}`;

        setUser({
          agentId,
          name,
          profilePicture,
          phone
        });


        setAgentData(data.agent);
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
    <div className="container mr-10">
      <div className="bg-gray-50 ">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div
            className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4 sm:gap-0"
            style={{ borderBottom: "2px solid #bebebe" }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center flex-wrap gap-1 text-sm sm:text-base text-gray-500">
              <Link to="/dashboard" className="text-gray-500">
                <FaArrowLeft />
              </Link>
              <span>Home</span>
              <span>/</span>
              <span className="text-gray-900 font-semibold">Dashboard</span>
            </div>

            {/* Notification + Profile */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <FaBell className="text-gray-500 cursor-pointer text-lg sm:text-xl" />
                <img
                  src={user?.profilePicture ? `${user.profilePicture}?v${Date.now()}` :  "https://randomuser.me/api/portraits/women/44.jpg"}
                  alt="User"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg z-50">
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
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="rounded-lg p-4 sm:p-6 bg-white shadow-sm">
            {/* Tabs */}
            <div
              className="flex flex-wrap justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0"
              style={{ borderBottom: "2px solid #d6d6d6", width: "100%" }}
            >
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base transition ${activeTab === tab.key
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-500 hover:text-blue-600"
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
                <div className="container mx-auto px-4">
                  {/* Top Profile Header Row */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0">
                      Profile Information
                    </h2>

                    <div className="flex items-center space-x-2 py-2 px-3 rounded-3 border w-full sm:w-[60%] md:w-[38%]">
                      <img
                        alt="Company Logo"
                        className="w-10 h-10 rounded-full"
                        src={user?.profilePicture ? `${user.profilePicture}?v${Date.now()}` :  "https://randomuser.me/api/portraits/women/44.jpg"}
                        />
                      <div>
                        <p className="text-gray-900 font-semibold text-xs m-0">
                          Migracon Inc.
                        </p>
                        <p className="text-gray-500 text-xs m-0">
                          Recruitment Partner ID: {agentData?.agentId || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Main Card */}
                  <div className="p-6 rounded-lg border shadow-sm bg-white w-full md:w-[85%] lg:w-[52%] mr-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">User Settings</h3>
                      <MdEdit className="text-gray-500 cursor-pointer" onClick={openModal} />
                    </div>

                    <EditProfileModal
                      isOpen={isEditOpen}
                      onClose={closeModal}
                      agentData={agentData}
                      onSubmit={handleUpdate}
                    />

                    {/* Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                      <div className="text-sm text-gray-500 font-medium">Profile Photo</div>
                      <div className="flex items-center">
                        <img
                          alt="Profile"
                          className="w-10 h-10 rounded-full ms-auto"
                          src={user?.profilePicture ? `${user.profilePicture}?v${Date.now()}` :  "https://randomuser.me/api/portraits/women/44.jpg"}
  />
                      </div>

                      <div className="text-sm text-gray-500 font-medium">Password</div>
                      <div className="text-gray-900 text-sm ms-auto">*********</div>

                      <div className="text-sm text-gray-500 font-medium">First Name</div>
                      <div className="text-gray-900 text-sm ms-auto">
                        {agentData?.firstName || 'N/A'}
                      </div>

                      <div className="text-sm text-gray-500 font-medium">Last Name</div>
                      <div className="text-gray-900 text-sm ms-auto">
                        {agentData?.lastName || 'N/A'}
                      </div>

                      <div className="text-sm text-gray-500 font-medium">Email</div>
                      <div className="text-gray-900 text-sm ms-auto">
                        {agentData?.email || 'N/A'}
                      </div>

                      <div className="text-sm text-gray-500 font-medium">Mobile</div>
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
                </div>

              </>
            )}

            {activeTab === "business" && (
              <>
                {/* Profile Info */}
                <div className="w-full px-4 sm:px-6 lg:px-8 mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Business Information
                    </h2>

                    <div className="flex items-center space-x-3 bg-white border rounded-md p-2 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                      <img
                        alt="Company Logo"
                        className="w-10 h-10 rounded-full"
                        src={logo}
                      />
                      <div>
                        <p className="text-gray-900 font-semibold text-sm">Migracon Inc.</p>
                        <p className="text-gray-500 text-xs">
                          Recruitment Partner ID: 259023
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* General Info Card */}
                <div className="w-full px-4 sm:px-6 lg:px-8">
                  <div className="p-6 rounded-lg border bg-white max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">
                      General Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                      <div className="text-gray-500 font-medium">Company Logo</div>
                      <div className="flex sm:justify-end">
                        <img
                          src={logo}
                          alt="Company Logo"
                          className="w-10 h-10 object-contain"
                        />
                      </div>

                      <div className="text-gray-500 font-medium">Company Name</div>
                      <div className="text-gray-900 sm:text-right">Migracon Inc.</div>

                      <div className="text-gray-500 font-medium">Website</div>
                      <div className="text-blue-600 underline sm:text-right">
                        <a href="https://www.migracon.com" target="_blank" rel="noreferrer">
                          www.migracon.com
                        </a>
                      </div>

                      <div className="text-gray-500 font-medium">Main Source Of Students</div>
                      <div className="flex sm:justify-end items-center space-x-2">
                        <img
                          src="https://flagcdn.com/w40/pk.png"
                          alt="PK"
                          className="w-5 h-4 object-cover"
                        />
                        <span>Pakistan</span>
                      </div>

                      <div className="text-gray-500 font-medium">Street Address</div>
                      <div className="text-gray-900 sm:text-right">5485 Bellaggio Crescent</div>

                      <div className="text-gray-500 font-medium">City</div>
                      <div className="text-gray-900 sm:text-right">Mississauga</div>

                      <div className="text-gray-500 font-medium">Country</div>
                      <div className="flex sm:justify-end items-center space-x-2">
                        <img
                          src="https://flagcdn.com/w40/ca.png"
                          alt="Canada"
                          className="w-5 h-4 object-cover"
                        />
                        <span>Canada</span>
                      </div>

                      <div className="text-gray-500 font-medium">State / Province</div>
                      <div className="text-gray-900 sm:text-right">Ontario</div>

                      <div className="text-gray-500 font-medium">Postal Code</div>
                      <div className="text-gray-900 sm:text-right">L5V 0C6</div>
                    </div>
                  </div>
                </div>
              </>
            )}


            {activeTab === "notifications" && (
              <div className="px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                  Notification Preferences
                </h1>

                <p
                  className="text-gray-600 mb-6 pb-2 border-b-2 border-gray-300"
                  style={{ maxWidth: "800px" }}
                >
                  Manage your notifications (including alert types and frequency) to stay informed and meet every deadline.
                </p>

                {/* Notification Type */}
                <div className="mb-6 max-w-sm">
                  <label
                    htmlFor="notification-type"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Notification type <i className="fas fa-info-circle text-gray-400"></i>
                  </label>
                  <select
                    id="notification-type"
                    className="block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option>Notes</option>
                  </select>
                  <p className="text-gray-600 mt-2">
                    You will receive a notification when a new note has been added to an application.
                  </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full lg:max-w-4xl">
                  {/* Email Notifications */}
                  <div className="bg-white p-6 rounded-lg shadow-md w-full">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">
                      Email notifications
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Adjust how you would like to receive this type of notification via email.
                    </p>
                    <label
                      htmlFor="frequency-options"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Frequency options
                    </label>
                    <select
                      id="frequency-options"
                      className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                    >
                      <option>Immediate</option>
                      <option>Never</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                    </select>
                  </div>

                  {/* Mobile Notification Illustration */}
                  <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col items-center text-center">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 w-full text-left">
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

                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white px-5  py-2 rounded-lg flex items-center">
                      <i className="fas fa-download mr-2"></i> Download App
                    </button>
                  </div>
                </div>
              </div>

            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white py-4 mt-[11rem]">
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
            <div className="flex flex-wrap space-x-4 mb-10 md:mb-0">
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
