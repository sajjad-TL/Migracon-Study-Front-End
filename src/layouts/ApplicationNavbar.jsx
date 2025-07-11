import { useEffect, useRef, useState } from "react";
import { IoMdArrowBack, IoMdNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const ApplicationNavbar = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef();

    const { badgeCount } = useSocket(); // 👈 use real-time badge

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full py-4 px-4 md:px-8 border-b">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <IoMdArrowBack className="text-xl" />
                        <span className="text-gray-500 hover:text-black transition">Dashboard</span>
                    </div>
                    <span className="mx-1">/</span>
                    <span className="font-medium text-black border-b-2 border-black pb-1">Application</span>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <div className="flex flex-row gap-8 items-center cursor-pointer">
                        <Link to="/notifications">
                            <div className="relative">
                                <IoMdNotifications className="text-2xl text-gray-500 hover:text-gray-700" />
                                {badgeCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                        {badgeCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <img
                            src={user.profilePicture ? `${user.profilePicture}?v=${Date.now()}` : "https://randomuser.me/api/portraits/women/44.jpg"}
                            className="w-10 h-10 rounded-full"
                            alt="User"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                        />
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                            <ul className="py-2 text-sm text-gray-700">
                                <Link to="/ProfileDetail">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                </Link>
                                <Link to="/UserSetting">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                                </Link>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500" onClick={handleLogout}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationNavbar;
