import React, { useState, useRef, useEffect } from "react";
import { BsFillBagCheckFill, BsCalculatorFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import {  FaFileArrowUp } from "react-icons/fa6";
import {  FaEdit } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import img1 from "../assets/schoolgirl.jpg"
import { MdOutlineWhatsapp } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { MdLocalPhone } from "react-icons/md";
import { FaUserPlus, FaSearch, FaFileAlt, FaChartBar } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const getStatusClasses = (status) => {
  switch (status) {
    case "Under Review":
      return "bg-green-100 text-green-600";
    case "Pending Documents":
      return "bg-yellow-100 text-yellow-600";
    case "Offer Received":
      return "bg-blue-100 text-blue-600";
    case "Rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const data = [
  { name: 'Apr', paid: 8, offers: 5, visas: 4, promos: 1 },
  { name: 'May', paid: 20, offers: 15, visas: 12, promos: 3 },
  { name: 'Jun', paid: 30, offers: 25, visas: 22, promos: 7 },
  { name: 'Jul', paid: 40, offers: 35, visas: 32, promos: 12 },
];

const ActionButton = ({ label, icon: Icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-10 py-2 rounded text-sm font-medium transition-colors duration-200
      ${isActive ? "bg-blue-800 text-white" : "bg-white text-gray-800 border"}
      hover:bg-blue-800 hover:text-white`}
  >
    <Icon className="text-base" />
    {label}
  </button>
);




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

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const navItems = ["Dashboard", "Student", "Application", "Program"];
  const [activeAction, setActiveAction] = useState("Add New Student");

  //  Define the actions array here
  const actions = [
    { label: "Add New Student", icon: FaUserPlus },
    { label: "Search Programs", icon: FaSearch },
    { label: "Start Application", icon: FaFileAlt },
    { label: "View Reports", icon: FaChartBar },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

   // Close dropdown when clicking outside
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

  return (
    <div className="flex min-h-screen bg-gray-100">
 
      {/* navbar */}
      <div>
        <nav className="w-[98.9%] bg-white shadow-md">
          <div className="max-w-7xl pl-[5rem] pr-[1rem] py-3 flex justify-between items-center relative">
            <ul className="hidden md:flex space-x-6 text-gray-500 font-medium">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActive(item)}
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

            <div className="relative" ref={dropdownRef}>
      <div className="flex flex-row gap-8 items-center cursor-pointer">
        <IoMdNotifications className="text-2xl text-gray-500" />
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          className="w-10 h-10 rounded-full"
          alt="User"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
      </div>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>


          </div>
        </nav>
        <div className="flex flex-col lg:flex-row w-full">


          {/* Main Content */}

          <main className="flex-1 p-4 sm:p-6 space-y-6 w-full lg:w-[60rem] overflow-y-auto">
            {/* TopNav */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="text-xl font-bold">Agent Dashboard</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Active Tasks"
                value="38"
                icon={<BsFillBagCheckFill className="text-[#1543a7] text-3xl" />}
              />
              <StatCard title="Approved Applications" value="156" icon="✅" />
              <StatCard
                title="Applications"
                value="48"
                icon={<IoDocumentText className="text-[#1a5ef0] text-3xl" />}
              />
              <StatCard title="Rejected Applications" value="2" icon="❌" />
            </div>

            {/* Recent Applications & Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Recent Applications" colSpan={2}>
                <AppRow
                  image={img1}
                  name="Sarah Chen"
                  uni="University of Toronto - CS"
                  status="Under Review"
                />
                <AppRow
                  image={img1}
                  name="Mohammed Al-Rashid"
                  uni="McGill - Business Admin"
                  status="Pending Documents"
                />
                <AppRow
                  image={img1}
                  name="Priya Patel"
                  uni="UBC - Engineering"
                  status="Offer Received"
                />
                <div className="mt-4 border border-gray-300 rounded p-3 flex justify-center">
                  <button className="text-black font-semibold text-sm hover:underline">
                    View all
                  </button>
                </div>
              </Card>

              <Card title="Tasks Due Soon">
                <TaskRow
                  image={<FaFileArrowUp className="text-2xl" />}
                  title="Upload IELTS Results"
                  para="For Sarah Chen"
                  due="Today"
                />
                <TaskRow
                  image={<FaEdit className="text-2xl" />}
                  title="Review SOP Draft"
                  para="From Muhammad Al-Rashid"
                  due="Tomorrow"
                />
                <TaskRow
                  image={<MdPayments className="text-2xl" />}
                  title="Submit Fee Payment"
                  para="For Priya Patel"
                  due="In 3 days"
                />
                <div className="mt-4 border border-gray-300 rounded p-3 flex justify-center">
                  <button className="text-black font-semibold text-sm hover:underline">
                    View all tasks
                  </button>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white p-4 shadow rounded-lg w-full">
                <h2 className="font-bold pb-4 text-lg">Quick Actions</h2>
                <div className="flex flex-wrap gap-2 mt-1 px-3">
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
            </div>

            {/* Task Management Chart */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">Task Management</h2>
                <div className="flex flex-wrap gap-4 border-b">
                  {semesters.map((sem, index) => (
                    <button
                      key={index}
                      className={`pb-2 text-sm font-medium ${sem === "Summer 2025"
                          ? "border-b-2 border-black text-black"
                          : "text-gray-500"
                        }`}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              </div>
              <h3 className="font-semibold mb-2 mt-12 ml-0 sm:ml-5">
                Application Statistics - Summer 2025
              </h3>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 45]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="paid" stroke="#3b82f6" name="Paid Applications" />
                    <Line type="monotone" dataKey="offers" stroke="#10b981" name="Final Offers" />
                    <Line type="monotone" dataKey="visas" stroke="#f97316" name="Visas" />
                    <Line type="monotone" dataKey="promos" stroke="#a855f7" name="Promotions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm mt-4">
                <div className="bg-gray-100 rounded-sm h-[4rem] pt-2">
                  <div>Paid Applications</div>
                  <strong className="text-xl">45</strong>
                </div>
                <div className="bg-gray-100 rounded-sm pt-2">
                  <div>Final Offers</div>
                  <strong className="text-xl">38</strong>
                </div>
                <div className="bg-gray-100 rounded-sm pt-2">
                  <div>Visas</div>
                  <strong className="text-xl">32</strong>
                </div>
                <div className="bg-gray-100 rounded-sm pt-2">
                  <div>Promotions</div>
                  <strong className="text-xl">12</strong>
                </div>
              </div>
            </div>
          </main>



          {/* Right Sidebar */}
          <aside className="w-full lg:w-[24rem] bg-gray-100 p-4 space-y-4 mt-4 lg:mt-[3.7rem]">
            {/* Your Balance Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-black mb-2 font-bold">Your balance</div>
              <input placeholder="CAD" className="border p-2 rounded w-full" />
              <div className="mt-4 text-sm leading-[2] text-black ">
                Commissions <br /> ApplyCredits
              </div>
              <button className="mt-2 w-full bg-blue-100 text-black font-semibold py-2 rounded text-sm">
                Request commission withdrawal
              </button>
            </div>

            {/* Popular Links */}
            <div className="bg-white p-4 rounded-lg shadow ">
              <div className="text-sm font-medium mb-2">Popular links</div>
              <ul className="space-y-1 text-sm text-black leading-[2]">
                <li className="flex flex-row gap-2 items-center ">
                  <MdOutlineWhatsapp className="text-green-500 text-2xl" />
                  WhatsApp chat
                </li>
                <li className="flex flex-row gap-2 items-center ">
                  <IoDocumentTextSharp className="text-2xl" />
                  Assist - knowledge base
                </li>
                <li className="flex flex-row gap-2 items-center ">
                  <BsCalculatorFill className="text-2xl" />
                  Canadian visa calculator
                </li>
              </ul>
            </div>

            {/* Account Manager */}
            <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center gap-4">
              <div>
                <div className="font-semibold mb-4">Your account manager</div>
                <div className="text-sm text-gray-500">
                  <div className="flex flex-row gap-2 items-center">
                    <TfiEmail />
                    shakeel@migraconstudy.com
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <MdLocalPhone />
                    +92 333 1234 567
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="https://randomuser.me/api/portraits/men/31.jpg"
                  className="w-12 h-12 rounded-full"
                />
                <div className="font-semibold">Shakeel</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}



const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-2 rounded-lg shadow flex items-center gap-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  </div>
);

const Card = ({ title, children, colSpan }) => (
  <div
    className={`bg-white rounded-lg p-4 shadow ${colSpan ? `md:col-span-${colSpan}`
      : ""}`}
  >
    <h3 className="font-bold mb-2">{title}</h3>
    {children}
  </div>
);

const AppRow = ({ image, name, uni, status }) => (
  <div className="flex justify-between text-sm py-2 border-b last:border-b-0">
    <div className="flex flex-row gap-4">
      <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-gray-500">{uni}</div>
      </div>

    </div>
    <div className={`text-xs h-5 mt-3 px-2 rounded-full text-center font-semibold w-[120px] truncate ${getStatusClasses(status)}`}>
      {status}
    </div>

  </div>

);

// tasks solution 

const TaskRow = ({ title, due, para, image }) => (
  <div className="text-sm py-1 flex justify-between  border-b last:border-b-0">
    <div className="flex flex-row gap-4">
      <span className="pt-1">{image}</span>
      <div className="flex flex-col">
        <div className="font-semibold ">{title}</div>
        <div className="mb-2 text-gray-500">{para}</div>
      </div>
    </div>
    <span className="text-red-600 pt-2">Due {due}</span>
  </div>
);
