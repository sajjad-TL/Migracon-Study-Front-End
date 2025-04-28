import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import migracon from '../assets/Migracon.svg';
import { IoDocumentText, IoPersonAdd } from "react-icons/io5";
import { FaSchool, FaArrowTrendUp, FaBuildingColumns } from "react-icons/fa6";
import { FaTasks, FaHandHoldingUsd } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { PiStudentFill, PiTestTubeFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";

const navItem = [
  { icon: <IoMdHome size={22} />, text: "Home", path: "/dashboard" },
  { icon: <FaSchool size={22} />, text: "Programs & Schools", path: "/programs" },
  { icon: <PiStudentFill size={22} />, text: "Students", path: "/students" },
  { icon: <IoDocumentText size={22} />, text: "Applications", path: "/application" },
  { icon: <FaTasks size={22} />, text: "My Tasks", path: "/mytasks" },
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
  const sidebarWidth = 200;

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* Mobile Toggle Button */}
      <button
        className="btn btn-light d-md-none m-2 position-fixed z-3"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 z-2"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white border-end p-3 position-fixed top-0 start-0 h-100 overflow-auto z-3 
          ${isSidebarOpen ? "d-block" : "d-none"}
          d-md-block`}
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className="mb-4">
          <img src={migracon} alt="migracon" className="img-fluid" style={{ height: "56px" }} />
        </div>
        <nav className="nav flex-column">
          {navItem.map(({ icon, text, path, badge }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={text}
                to={path}
                onClick={() => setIsSidebarOpen(false)}
                className={`nav-link d-flex justify-content-between align-items-center py-2 px-2 rounded ${isActive ? "fw-semibold" : ""
                  }`}
                style={{
                  color: isActive ? "#000" : "#000",
                  backgroundColor: isActive ? "#f8f9fa" : "transparent",
                  transition: "0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f1f1f1";
                  if (!isActive) e.currentTarget.style.color = "#555";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isActive ? "#f8f9fa" : "transparent";
                  e.currentTarget.style.color = "#000";
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  {icon}
                  <span>{text}</span>
                </div>
                {badge && (
                  <span className="badge bg-success bg-opacity-25 text-success fw-semibold px-2 py-1 rounded-pill">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? 0 : undefined,
          marginLeft: window.innerWidth >= 768 ? `${sidebarWidth}px` : 0,
          transition: "margin-left 0.3s ease",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
