// import { IoDocumentText } from "react-icons/io5";
// import { FaFileArrowUp } from "react-icons/fa6";
// import { IoDocumentTextSharp } from "react-icons/io5";

// const getStatusClasses = (status) => {
//   switch (status) {
//     case "Under Review":
//       return "bg-green-100 text-green-600";
//     case "Pending Documents":
//       return "bg-yellow-100 text-yellow-600";
//     case "Offer Received":
//       return "bg-blue-100 text-blue-600";
//     case "Rejected":
//       return "bg-red-100 text-red-600";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

// // Data for Application Statuses chart

// // Performance data - number of students over time

// export default function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* navbar */}
//       <div>
//         <nav className="w-[98.9%] bg-white shadow-md">
//           <div className="max-w-7xl pl-[5rem] pr-[1rem] py-3 flex justify-between items-center relative">
//
//
//         </nav>
//         <div className="flex flex-col lg:flex-row max-w-[21rem] sm:max-w-[22rem] md:max-w-[30rem] lg:max-w-[110rem] w-full">

//           {/* Main Content */}

//           <main className="flex-1 p-4 sm:p-6 space-y-6 w-full overflow-y-auto">
//             {/* TopNav */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//               <div className="text-xl font-bold">Agent Dashboard</div>
//             </div>

//             {/* Stats */}

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <StatCard
//                 title="Active Tasks"
//                 value="38"
//                 icon={<BsFillBagCheckFill className="text-[#1543a7] text-3xl" />}
//               />
//               <StatCard title="Approved Applications" value="156" icon="✅" />
//               <StatCard
//                 title="Applications"
//                 value="48"
//                 icon={<IoDocumentText className="text-[#1a5ef0] text-3xl" />}
//               />
//               <StatCard title="Rejected Applications" value="2" icon="❌" />
//             </div>

//             {/* Recent Applications & Tasks */}
//             <div className="flex flex-col lg:flex-row gap-4 ">
//               <Card title={<span className="text-xl font-bold">Recent Applications</span>} colSpan={2}>
//                 <AppRow
//                   image={img1}
//                   name="Sarah Chen"
//                   uni="University of Toronto - CS"
//                   status="Under Review"
//                 />
//                 <AppRow
//                   image={img1}
//                   name="Mohammed Al-Rashid"
//                   uni="McGill - Business Admin"
//                   status="Pending Documents"
//                 />
//                 <AppRow
//                   image={img1}
//                   name="Priya Patel"
//                   uni="UBC - Engineering"
//                   status="Offer Received"
//                 />
//                 <div className="mt-4 border border-gray-300 rounded p-3 flex justify-center">
//                   <button className="text-black font-semibold text-sm hover:underline">
//                     View all
//                   </button>
//                 </div>
//               </Card>

//               <Card title={<span className="text-xl font-bold">Tasks Due Soon</span>}>
//                 <TaskRow
//                   image={<FaFileArrowUp className="text-2xl" />}
//                   title="Upload IELTS Results"
//                   para="For Sarah Chen"
//                   due="Today"
//                 />
//                 <TaskRow
//                   image={}
//                   title="Review SOP Draft"
//                   para="From Muhammad Al-Rashid"
//                   due="Tomorrow"
//                 />
//                 <TaskRow
//                   image={}
//                   title="Submit Fee Payment"
//                   para="For Priya Patel"
//                   due="In 3 days"
//                 />
//                 <div className="mt-4 border border-gray-300 rounded p-3 flex justify-center">
//                   <button className="text-black font-semibold text-sm hover:underline">
//                     View all tasks
//                   </button>
//                 </div>
//               </Card>
//             </div>

//             {/* Quick Actions */}
//             <div className="flex flex-wrap gap-4">
//               <div className="bg-white p-4 shadow rounded-lg w-full">
//                 <h2 className="font-bold pb-4 text-lg">Quick Actions</h2>
//                 <div className="flex flex-wrap gap-2 mt-1 px-3">
//
//                 </div>
//               </div>
//             </div>

//             {/* Task Management Chart */}
//             <div className="bg-white rounded-lg p-4 shadow">
//               <div className="bg-white rounded-lg p-4">
//                 <h2 className="text-lg font-semibold mb-2">Task Management</h2>
//                 <div className="flex flex-wrap gap-4 border-b">
//                   {semesters.map((sem, index) => (
//                     <button
//                       key={index}
//                       className={`pb-2 text-sm font-medium ${sem === "Summer 2025"
//                         ? "border-b-2 border-black text-black"
//                         : "text-gray-500"
//                         }`}
//                     >
//                       {sem}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <h3 className="font-semibold mb-2 mt-12 ml-0 sm:ml-5">
//                 Application Statistics - Summer 2025
//               </h3>

//               <div className="h-64 w-full">
//
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm mt-4">
//
//               </div>
//             </div>

//             {/* First Chart Section */}
//
//           </main>

//           {/* Right Sidebar */}
//           <aside className="bg-gray-100 p-4 space-y-4 mt-4 lg:mt-[3.7rem] w-[18rem] xl:w-[27rem] mx-auto lg:mx-0 lg:w-[20rem]">
//             {/* Your Balance Section */}
//             <div className="bg-white p-4 rounded-lg shadow">
//               <div className="text-sm text-black mb-2 font-bold">Your balance</div>
//
//               <button className="mt-2 w-full bg-blue-100 text-black font-semibold py-2 rounded text-sm">
//                 Request commission withdrawal
//               </button>
//             </div>

//             {/* Popular Links */}
//             <div className="bg-white p-4 rounded-lg shadow">
//               <div className="text-sm font-medium mb-2">Popular links</div>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-black leading-[2]">
//                 <li className="flex items-center gap-2">
//                   <MdOutlineWhatsapp className="text-green-500 text-2xl" />
//                   <a href="https://wa.me/923016108979" target="_blank" className="cursor-pointer text-black">WhatsApp chat</a>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <IoDocumentTextSharp className="text-2xl" />
//                   Assist - knowledge base
//                 </li>
//                 <li className="flex flex-row items-center gap-2">
//                   <BsCalculatorFill className="text-2xl" />
//                   <span>Canadian visa calculator</span>
//                 </li>
//               </ul>
//             </div>

//             {/* Account Manager */}

//
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillBagCheckFill, BsCalculatorFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { IoDocumentText } from "react-icons/io5";
import { UserContext } from "../context/userContext";
import { FileText } from "lucide-react";
import { FaUserPlus, FaSearch, FaFileAlt, FaChartBar } from "react-icons/fa";
import { MdOutlineWhatsapp } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import img1 from "../assets/schoolgirl.jpg"

import { AiOutlineClose } from "react-icons/ai";


import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TfiEmail } from "react-icons/tfi";
import { MdLocalPhone } from "react-icons/md";

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("Summer 2025");
  const [active, setActive] = useState("Dashboard");
  const [agentData, setAgentData] = useState(null);
  const [activeAction, setActiveAction] = useState("Add New Student");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [studentFilter, setStudentFilter] = useState("Student");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [yearRevenue, setYearRevenue] = useState("2025");

  const [currency, setCurrency] = useState("USD");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useContext(UserContext);
  const navItems = ["Dashboard", "Student", "Application", "Program"];
  const navigate = useNavigate();

  const dropdownRef = useRef();
  useEffect(() => {
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

  const actions = [
    { label: "Add New Student", icon: FaUserPlus },
    { label: "Search Programs", icon: FaSearch },
    { label: "Start Application", icon: FaFileAlt },
    { label: "View Reports", icon: FaChartBar },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const ActionButton = ({ label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex flex-row gap-3 items-center justify-center space-x-2 text-black py-2 px-4 rounded-md hover:bg-blue-700>
      ${isActive
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-800 border hover:bg-blue-600"
        }
       hover:text-black `}
    >
      <Icon className="text-base" />
      {label}
    </button>
  );

  const handleClick = (item) => {
    setActive(item);
    // Navigate to the corresponding page
    if (item === "Dashboard") navigate("/dashboard");
    if (item === "Student") navigate("/students");
    if (item === "Application") navigate("/application");
    if (item === "Program") navigate("/programs");
  };

  const fetchAgentData = async () => {
    try {
      if (user?.agentId) {
        const response = await axios.get(
          `http://localhost:5000/agent/${user.agentId}`
        );
        setAgentData(response.data.agent);
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };

  useEffect(() => {
    if (user?.agentId) {
      fetchAgentData();
    }
  }, [user]);

  const data = [
    { name: "Apr", paid: 8, offers: 5, visas: 4, promos: 1 },
    { name: "May", paid: 20, offers: 15, visas: 12, promos: 3 },
    { name: "Jun", paid: 30, offers: 25, visas: 22, promos: 7 },
    { name: "Jul", paid: 40, offers: 35, visas: 32, promos: 12 },
  ];

  const processingTimesData = [
    {
      name: "0-30 days",
      visaApplications: 1.8,
      studyPermits: 1.6,
      workPermits: 1.5,
      otherDocuments: 1.3,
    },
    {
      name: "31-60 days",
      visaApplications: 1.6,
      studyPermits: 1.2,
      workPermits: 1.1,
      otherDocuments: 0.9,
    },
    {
      name: "61-90 days",
      visaApplications: 2.1,
      studyPermits: 2.0,
      workPermits: 1.8,
      otherDocuments: 1.6,
    },
    {
      name: "90+ days",
      visaApplications: 2.4,
      studyPermits: 2.2,
      workPermits: 2.1,
      otherDocuments: 1.9,
    },
  ];

  const applicationStatusesData = [
    {
      name: "Jan",
      submitted: 25,
      inReview: 22,
      pendingDocuments: 17,
      completed: 12,
    },
    {
      name: "Feb",
      submitted: 33,
      inReview: 30,
      pendingDocuments: 22,
      completed: 17,
    },
    {
      name: "Mar",
      submitted: 30,
      inReview: 25,
      pendingDocuments: 18,
      completed: 15,
    },
    {
      name: "Apr",
      submitted: 38,
      inReview: 32,
      pendingDocuments: 24,
      completed: 18,
    },
    {
      name: "May",
      submitted: 32,
      inReview: 28,
      pendingDocuments: 20,
      completed: 16,
    },
    {
      name: "Jun",
      submitted: 35,
      inReview: 30,
      pendingDocuments: 22,
      completed: 19,
    },
  ];

  const performanceData = [
    { month: "Jan", students: 50 },
    { month: "Feb", students: 55 },
    { month: "Mar", students: 58 },
    { month: "Apr", students: 62 },
    { month: "May", students: 67 },
    { month: "Jun", students: 70 },
    { month: "Jul", students: 74 },
    { month: "Aug", students: 78 },
    { month: "Sep", students: 82 },
    { month: "Oct", students: 86 },
    { month: "Nov", students: 89 },
    { month: "Dec", students: 93 },
  ];

  // Revenue data - total amount by month
  const revenueData = [
    { month: "Jan", revenue: 32000 },
    { month: "Feb", revenue: 35000 },
    { month: "Mar", revenue: 34000 },
    { month: "Apr", revenue: 42000 },
    { month: "May", revenue: 47000 },
    { month: "Jun", revenue: 50000 },
    { month: "Jul", revenue: 52000 },
    { month: "Aug", revenue: 55000 },
    { month: "Sep", revenue: 58000 },
    { month: "Oct", revenue: 62000 },
    { month: "Nov", revenue: 66000 },
    { month: "Dec", revenue: 70000 },
  ];

  // Month buttons for performance section
  const months = [
    ["Jan", "Feb", "Mar"],
    ["Apr", "May", "Jun"],
    ["Jul", "Aug", "Sep"],
    ["Oct", "Nov", "Dec"],
  ];

  const semesters = [
    "Summer 2025",
    "Fall 2025",
    "Winter 2026",
    "Spring 2026",
    "Summer 2026",
    "Fall 2026",
    "Winter 2027",
    "Spring 2027",
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4">
          <div className="flex md:space-x-6">
            <ul className="hidden md:flex space-x-6 pt-4 text-gray-500 font-medium">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleClick(item)}
                    className={`relative pb-2 transition-colors ${active === item ? "text-black" : "hover:text-black"
                      }`}
                  >
                    {item}
                    {active === item && (
                      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black rounded-md"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <div className="flex flex-row gap-8 items-center cursor-pointer">
                <Link to="/notifications">
                  <div className="relative cursor-pointer">
                    <IoMdNotifications className="text-2xl text-gray-500 hover:text-gray-700" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      6
                    </span>
                  </div>
                </Link>
                <img
                  src={
                    user.profilePicture
                      ? `${user.profilePicture}?v${Date.now()}`
                      : "https://randomuser.me/api/portraits/women/44.jpg"
                  }
                  className="w-10 h-10 rounded-full"
                  alt="User"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                />
              </div>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <Link to="/ProfileDetail">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Profile
                      </li>
                    </Link>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Settings
                    </li>
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
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white px-4 py-2 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <div className="text-gray-500 py-1">Students</div>
              <div className="text-gray-500 py-1">Applications</div>
              <div className="text-gray-500 py-1">Programs</div>
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row ">
        <main className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Agent Dashboard
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <BsFillBagCheckFill className="text-blue-600 text-3xl" />
                <div>
                  <div className="text-sm text-gray-500">Active Tasks</div>
                  <div className="text-xl font-semibold">38</div>
                </div>

              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="bg-green-400 rounded-full text-3xl">
                  <div><TiTick className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    Approved Applications
                  </div>
                  <div className="text-xl font-semibold">156</div>
                </div>

              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <div className=" rounded">
                  <IoDocumentText className="text-blue-600 text-3xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Applications</div>
                  <div className="text-xl font-semibold">48</div>
                </div>

              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="bg-red-400 p-2 rounded-full">
                  <AiOutlineClose className="text-white" />
                </div>
                <div>

                  <div className="text-sm text-gray-500">
                    Rejected Applications
                  </div>
                  <div className="text-xl font-semibold">2</div>
                </div>

              </div>
            </div>
          </div>

          {/* Two Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-2xl text-gray-800">
                  Recent Applications
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200">
                      <img
                        src={img1}
                        alt="Student"
                        className="rounded-full h-10 w-10"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Sarah Chen</div>
                      <div className="text-xs text-gray-500">
                        University of Toronto · Computer Science
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    <button className="px-2 py-1 rounded bg-blue-50">
                      Under Review
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200">
                      <img
                        src={img1}
                        alt="Student"
                        className="rounded-full h-10 w-10"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Mohammed Al-Rashid</div>
                      <div className="text-xs text-gray-500">
                        KFUPM University · Business Administration
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-yellow-600 font-medium">
                    <button className="px-2 py-1 rounded bg-yellow-50">
                      Pending Documents
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200">
                      <img
                        src={img1}
                        alt="Student"
                        className="rounded-full h-10 w-10"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Priya Patel</div>
                      <div className="text-xs text-gray-500">
                        University of British Columbia · Engineering
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    <button className="px-2 py-1 rounded bg-blue-50">
                      Offer Received
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button className="w-full py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                  View all
                </button>
              </div>
            </div>

            {/* Tasks Due Soon */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-2xl text-gray-800">Tasks Due Soon</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-black">
                      <IoDocumentText className="text-3xl" />
                    </div>
                    <div>
                      <div className="font-medium">Upload IELTS Results</div>
                      <div className="text-xs text-gray-500">
                        For Sarah Chen
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-red-600 font-medium">
                    Due Today
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-black">
                      <FaEdit className="text-2xl" />
                    </div>
                    <div>
                      <div className="font-medium">Review SOP Draft</div>
                      <div className="text-xs text-black">
                        For Mohammed Al-Rashid
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-orange-400 font-medium">
                    Due Tomorrow
                  </div>
                </div>

                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-black">
                      <MdPayments className="text-2xl" />
                    </div>
                    <div>
                      <div className="font-medium">Submit Fee Payment</div>
                      <div className="text-xs text-black">
                        For Priya Patel
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Due in 3 days
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button className="w-full py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                  View all tasks
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h2 className="font-semibold text-2xl text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {actions.map(({ label, icon }) => (
                <ActionButton
                  key={label}
                  label={label}
                  icon={icon}
                  isActive={activeAction === label}
                  onClick={() => setActiveAction(label)}
                />
              ))}
            </div>
          </div>

          {/* Task Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h2 className="font-semibold text-2xl text-gray-800 mb-4">
              Task Management
            </h2>
            <div className="flex flex-wrap overflow-x-auto mb-4">
              {[
                "Summer 2025",
                "Fall 2025",
                "Winter 2026",
                "Spring 2026",
                "Summer 2026",
                "Fall 2026",
                "Winter 2027",
                "Spring 2027",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Application Statistics */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Application Statistics - Summer 2025
              </h3>
              <div className="h-64 bg-white">
                {/* Chart placeholder */}

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 45]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="paid"
                      stroke="#3b82f6"
                      name="Paid Applications"
                    />
                    <Line
                      type="monotone"
                      dataKey="offers"
                      stroke="#10b981"
                      name="Final Offers"
                    />
                    <Line
                      type="monotone"
                      dataKey="visas"
                      stroke="#f97316"
                      name="Visas"
                    />
                    <Line
                      type="monotone"
                      dataKey="promos"
                      stroke="#a855f7"
                      name="Promotions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-4 mt-4">
                <div className="bg-gray-100 rounded-md h-[4rem] pt-2">
                  <div>Paid Applications</div>
                  <strong className="text-xl">45</strong>
                </div>
                <div className="bg-gray-100 rounded-md pt-2">
                  <div>Final Offers</div>
                  <strong className="text-xl">38</strong>
                </div>
                <div className="bg-gray-100 rounded-md pt-2">
                  <div>Visas</div>
                  <strong className="text-xl">32</strong>
                </div>
                <div className="bg-gray-100 rounded-md pt-2">
                  <div>Promotions</div>
                  <strong className="text-xl">12</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Business Insights */}

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Business Insights
              </h2>
              <div className="flex flex-col lg:flex-row  gap-2">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border rounded-md py-1 px-3 text-sm bg-white"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="border rounded-md py-1 px-3 text-sm bg-white"
                >
                  <option value="All Countries">All Countries</option>
                  <option value="Canada">Canada</option>
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>

            <h3 className="text-md font-medium mb-2">
              Application Processing Times
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Number of applications by processing times
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={processingTimesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Average Processing Time (Months)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="visaApplications"
                    name="Visa Applications"
                    fill="#60a5fa"
                  />
                  <Bar
                    dataKey="studyPermits"
                    name="Study Permits"
                    fill="#84e1bc"
                  />
                  <Bar
                    dataKey="workPermits"
                    name="Work Permits"
                    fill="#fdba74"
                  />
                  <Bar
                    dataKey="otherDocuments"
                    name="Other Documents"
                    fill="#d8b4fe"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Second Chart Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Application Statuses
              </h2>
              <div className="flex flex-col lg:flex-row  gap-2">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border rounded-md py-1 px-3 text-sm bg-white"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="border rounded-md py-1 px-3 text-sm bg-white"
                >
                  <option value="All Countries">All Countries</option>
                  <option value="Canada">Canada</option>
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>

            <h3 className="text-md font-medium mb-2">Application Statuses</h3>
            <p className="text-sm text-gray-500 mb-4">
              Number of applications by status and intake over time
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={applicationStatusesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Number of Applications",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="submitted" name="Submitted" fill="#93c5fd" />
                  <Bar dataKey="inReview" name="In Review" fill="#86efac" />
                  <Bar
                    dataKey="pendingDocuments"
                    name="Pending Documents"
                    fill="#fdba74"
                  />
                  <Bar dataKey="completed" name="Completed" fill="#d8b4fe" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4 ">
              <h2 className="text-lg font-semibold">Performance</h2>
              <div className="flex flex-col lg:flex-row  gap-2">
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border rounded-md py-1 px-3 text-sm bg-white"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>

                </div>



                <div className="relative  ">
                  <select
                    className="appearance-none border rounded-md py-1 px-4 pr-8 bg-white"
                    value={studentFilter}
                    onChange={(e) => setStudentFilter(e.target.value)}
                  >
                    <option value="Student">Student</option>
                    <option value="All Students">All Students</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-md font-medium">Performance Metrics</h3>
            <p className="text-sm text-gray-500 mb-4">
              Number of students over time
            </p>

            <div className="h-64 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 120]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="students"
                    name="Students"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center text-sm">
              {months.flat().map((month, index) => (
                <button key={index} className="py-1 text-gray-700">
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Revenue Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Revenue Generated</h2>
              <div className="flex flex-col lg:flex-row  gap-2">
                <div className="relative">
                  <select
                    className="appearance-none border rounded-md py-1 px-4 pr-8 bg-white"
                    value={yearRevenue}
                    onChange={(e) => setYearRevenue(e.target.value)}
                  >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <select
                    className="appearance-none border rounded-md py-1 px-4 pr-8 bg-white"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-md font-medium">Total Revenue Generated</h3>
            <p className="text-sm text-gray-500 mb-4">
              Total amount of revenue generated by month
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100000]} />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#86efac" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>

        {/* Sidebar - Only visible on larger screens */}
        <div className="w-full lg:w-[50%] px-5 pt-20">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
            <h3 className="font-semibold text-2xl mb-4">Your balance</h3>
            <div className="space-y-2 mb-4">
              <input placeholder="CAD" className="border p-2 rounded w-full" />
              <div className="mt-4 text-sm leading-[2] text-black flex flex-col ">
                <span>Commissions</span>
                <span>ApplyCredits</span>
              </div>
            </div>
            <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
              Request commission withdrawal
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
            <h3 className="font-semibold text-2xl mb-4">Popular links</h3>
            <div className="space-y-3">
              <a
                href="http://wa.me/923016108979" target="_blank"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
              >
                <MdOutlineWhatsapp className="text-green-500 text-2xl" />
                WhatsApp chat
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FileText size={20} className="mr-2 text-gray-500" />
                Assist - knowledge base
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <BsCalculatorFill size={20} className="mr-2 text-gray-500" />
                Canadian visa calculator
              </a>
            </div>
          </div>

          {agentData && (
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4">
              <div>
                <div className="font-semibold mb-4">Your account manager</div>
                <div className="text-sm text-gray-500 space-y-2">
                  <div className="flex items-center gap-2">
                    <TfiEmail />
                    {agentData.email || "Not available"}
                  </div>
                  <div className="flex items-center gap-2">
                    <MdLocalPhone />
                    {agentData.phone || "Not available"}
                  </div>
                </div>
              </div>
              <div className="flex items-center md:flex-none gap-4 mt-4 md:mt-0">
                <img
                  alt="Profile"
                  className="w-10 h-10 rounded-full ms-auto"
                  src={
                    user?.profilePicture
                      ? `${user.profilePicture}?v${Date.now()}`
                      : "https://randomuser.me/api/portraits/women/44.jpg"
                  }
                />
                <div className="font-semibold pr-4">
                  {agentData.firstName || "No name"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
