// src/layouts/Layout.jsx
import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import migracon from '../assets/Migracon.svg';
import { IoDocumentText, IoPersonAdd } from "react-icons/io5";
import { FaSchool, FaArrowTrendUp, FaBuildingColumns, FaFileArrowUp } from "react-icons/fa6";
import { FaTasks, FaHandHoldingUsd, FaEdit } from "react-icons/fa";
import { IoMdHome, IoMdNotifications } from "react-icons/io";
import { PiStudentFill, PiTestTubeFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";

const navItem = [
  { icon: <IoMdHome size={22} />, text: "Home", path: "/dashboard" },
  { icon: <FaSchool size={22} />, text: "Programs & Schools", path: "/programs" },
  { icon: <PiStudentFill size={22} />, text: "Students", path: "/students" },
  { icon: <IoDocumentText size={22} />, text: "Applications", path: "/application" },
  { icon: <FaTasks size={22} />, text: "My Tasks", path: "/tasks" },
  { icon: <MdPayments size={22} />, text: "Payments", path: "/payments" },
  { icon: <HiAcademicCap size={22} />, text: "TrainHub", path: "/trainhub" },
  { icon: <FaArrowTrendUp size={22} />, text: "Growth Hub", path: "/growth", badge: "New" },
  { icon: <PiTestTubeFill size={22} />, text: "Test Solutions", path: "/test-solutions" },
  { icon: <IoPersonAdd size={22} />, text: "Add Student", path: "/add-student" },
  { icon: <FaHandHoldingUsd size={22} />, text: "Start Loan Application", path: "/loan" },
  { icon: <FaBuildingColumns size={22} />, text: "Start GIC Application", path: "/gic" },
];

const Layout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar button and overlay */}
      <button
        className="md:hidden p-2 m-2 text-gray-700 bg-gray-100 rounded fixed z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-[300px] bg-white border-r p-4 flex flex-col transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:flex
      `}
      >
        <div className="mb-6">
          <img src={migracon} alt="migracon" className="h-14" />
        </div>
        <nav className="flex-1 space-y-2 text-sm overflow-y-auto">
          {navItem.map(({ icon, text, path, badge }) => (
            <Link
              key={text}
              to={path}
              className={`flex items-center justify-between p-2 rounded hover:bg-gray-100 transition ${
                location.pathname === path ? "bg-gray-100 font-semibold" : ""
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <div className="flex items-center gap-2">
                {icon}
                <span>{text}</span>
              </div>
              {badge && (
                <span className="text-xs text-green-700 font-semibold bg-green-200 px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Page Content */}
      <div className="flex-1 ml-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
