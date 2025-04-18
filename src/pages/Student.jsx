import React, { useState, useEffect, useContext } from 'react';
import StudentForm from '../Model/StudentForm';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { CiGrid41 } from "react-icons/ci";
import { UserContext } from '../context/userContext';
import EditStudent from '../Model/EditStudent';

const StatusBadge = ({ status }) => {
    const colors = {
        Active: 'bg-green-100 text-green-700',
        Pending: 'bg-yellow-100 text-yellow-800',
        Inactive: 'bg-red-100 text-red-700',
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || ''}`}>{status}</span>
    );
};

export default function StudentDashboard() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('table');
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: "Ali Khan",
        email: "ali@example.com",
    });

    const handleSave = (updatedData) => {
        setUserData(updatedData);
        console.log("Updated User Data:", updatedData);
    };

    const { user } = useContext(UserContext);
    const agentId = user?.agentId;

    const studentsPerPage = 6;

    const openModal = () => setIsFormOpen(true);
    const closeModal = () => setIsFormOpen(false);

    const handleStudentAdded = (newStudent) => {
        // Add the new student to the state directly
        setStudents((prev) => [newStudent, ...prev]);
        setIsFormOpen(false);
    };

    // ✅ Fetch data from backend API
    useEffect(() => {
        if (!agentId || students.length > 0) return;  // Only fetch if no students are present

        const fetchStudents = async () => {
            try {
                const res = await fetch(`http://localhost:5000/agent/all-students/${agentId}`);
                const data = await res.json();
                setStudents(data?.students || []);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

    useEffect(() => {
        fetchStudents();
    }, [agentId, students]);  // Fetch only when agentId changes or students array is empty


    const handleStudentAdded = () => {
        fetchStudents(); // Fetch again after new student is added
    };

    const filteredStudents = students.filter((student) =>
        Object.values(student).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, endIndex);




    return (
        <div className="p-6 space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Students', value: students.length, icon: '👥' },
                    { label: 'Active Applications', value: '1,234', icon: '📄' },
                    { label: 'Completed', value: '892', icon: '✅' },
                    { label: 'New This Month', value: '325', icon: '➕' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white shadow rounded-xl p-4 flex items-center gap-4">
                        <div className="text-3xl">{stat.icon}</div>
                        <div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                            <div className="text-xl font-semibold">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Students Section */}
            <div className="bg-white shadow rounded-xl p-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                    <button onClick={openModal} className="bg-black text-white px-4 py-2 rounded-md font-medium">
                        + Add New Student
                    </button>
                    <StudentForm
                        isOpen={isFormOpen}
                        onClose={closeModal}
                        onStudentAdded={handleStudentAdded}
                    />

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border px-3 py-2 rounded-md w-full md:w-64"
                        />
                        <button className="border px-3 py-2 rounded-md">Filters</button>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`border px-3 py-2 rounded-md ${viewMode === 'table' ? 'bg-black text-white' : ''}`}
                            >
                                <BsReverseLayoutTextSidebarReverse />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`border px-3 py-2 rounded-md ${viewMode === 'grid' ? 'bg-black text-white' : ''}`}
                            >
                                <CiGrid41 />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Display Students */}
                {viewMode === 'table' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="p-2">Student</th>
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Education</th>
                                    <th className="p-2">Applications</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStudents.map((s, i) => (
                                    <tr key={i} className="border-t">
                                        <td className="p-2 flex items-center gap-3">
                                            <img src={s.avatar || `https://i.pravatar.cc/40?img=${i + 1}`} alt={s.firstName} className="w-8 h-8 rounded-full" />
                                            <div>
                                                <div className="font-medium">{s.firstName} {s.lastName}</div>
                                                <div className="text-gray-500 text-xs">{s.email}</div>
                                            </div>
                                        </td>
                                        <td className="p-2">{s._id}</td>
                                        <td className="p-2">{s.education || "N/A"}</td>
                                        <td className="p-2">{s.applications || "0"}</td>
                                        <td className="p-2"><StatusBadge status={s.status} /></td>
                                        <td className="p-4">
                                            <div
                                                className="text-sm text-indigo-600 font-medium cursor-pointer mt-2"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                Edit
                                            </div>
                                            <EditStudent
                                                isOpen={isModalOpen}
                                                onClose={() => setIsModalOpen(false)}
                                                userData={userData}
                                                onSave={handleSave}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentStudents.map((s, i) => (
                            <div key={i} className="border rounded-xl p-4 shadow flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <img src={s.avatar || `https://i.pravatar.cc/40?img=${i + 1}`} alt={s.firstName} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <div className="font-medium">{s.firstName} {s.lastName}</div>
                                        <div className="text-gray-500 text-xs">{s.email}</div>
                                    </div>
                                </div>
                                <div className="text-sm">ID: <strong>{s._id}</strong></div>
                                <div className="text-sm">Education: <strong>{s.education || "N/A"}</strong></div>
                                <div className="text-sm">Applications: <strong>{s.applications || "0"}</strong></div>
                                <div className="text-sm">Status: <StatusBadge status={s.status} /></div>
                                <div className="p-4">
                                    <p>Name: {userData.name}</p>
                                    <p>Email: {userData.email}</p>

                                    <div
                                        className="text-sm text-indigo-600 font-medium cursor-pointer mt-2"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Edit
                                    </div>

                                    <EditStudent
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        userData={userData}
                                        onSave={handleSave}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 text-sm">
                    <div>
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} results
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => handlePageClick(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageClick(i + 1)}
                                className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'bg-black text-white' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageClick(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
