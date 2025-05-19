import { useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const NotificationsNavbar = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dropdownRef = useRef();
    const sidebarRef = useRef();



    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };



    return (
        <div className="w-full py-4 px-4 md:px-8 border-b">

            <div className="flex justify-between items-center">
                {/* Left side: Hamburger + Back + Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-600">


                    <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                        <IoMdArrowBack className="text-xl" />
                        <span className="text-gray-500 hover:text-black transition">Dashboard</span>
                    </Link>
                    
                    <span className="mx-1">/</span>
                    <span className="font-medium text-black border-b-2 border-black pb-1">Notifications</span>
                </div>

                {/* Right side: Notifications + Profile */}
                <div className="flex items-center gap-4">


                    <div className="relative" ref={dropdownRef}>
                        <img
                            src={user?.profilePicture ? `${user.profilePicture}?v=${Date.now()}` : "https://randomuser.me/api/portraits/women/44.jpg"}
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200"
                            alt="User"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                        />

                        {/* Dropdown menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border">
                                <ul className="py-2 text-sm text-gray-700">
                                    <div className="px-4 py-2 border-b">
                                        <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                    <Link to="/ProfileDetail">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                    </Link>
                                    <Link to="/UserSetting">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                                    </Link>
                                    <li className="border-t"></li>
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

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <IoMdClose className="text-2xl" />
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-100">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/students" className="block py-2 px-4 rounded bg-gray-100 font-medium">
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link to="/applications" className="block py-2 px-4 rounded hover:bg-gray-100">
                                Applications
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports" className="block py-2 px-4 rounded hover:bg-gray-100">
                                Reports
                            </Link>
                        </li>
                        <Link to="/UserSetting">
                            <li className="block py-2 px-4 rounded hover:bg-gray-100"></li>
                            Settings
                        </Link>

                    </ul>
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <img
                            src={user?.profilePicture ? `${user.profilePicture}?v=${Date.now()}` : "https://randomuser.me/api/portraits/women/44.jpg"}
                            className="w-8 h-8 rounded-full"
                            alt="User"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default NotificationsNavbar;