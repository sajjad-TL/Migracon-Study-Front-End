import React, { useState } from 'react';
import StudentForm from '../Model/StudentForm';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { CiGrid41 } from "react-icons/ci";

const students = [
    {
        name: "John Doe",
        email: "john@example.com",
        id: "STU001",
        education: "Bachelor's",
        applications: 5,
        status: "Active",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        name: "Alice Smith",
        email: "alice@example.com",
        id: "STU002",
        education: "Master's",
        applications: 3,
        status: "Pending",
        avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
        name: "Bob Johnson",
        email: "bob@example.com",
        id: "STU003",
        education: "PhD",
        applications: 7,
        status: "Inactive",
        avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
        name: "Emily Davis",
        email: "emily@example.com",
        id: "STU004",
        education: "Bachelor's",
        applications: 2,
        status: "Active",
        avatar: "https://i.pravatar.cc/150?img=4"
    },
    {
        name: "Michael Brown",
        email: "michael@example.com",
        id: "STU005",
        education: "Master's",
        applications: 6,
        status: "Pending",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        name: "Sarah Lee",
        email: "sarah@example.com",
        id: "STU006",
        education: "Diploma",
        applications: 1,
        status: "Active",
        avatar: "https://i.pravatar.cc/150?img=6"
    },
    {
        name: 'John Smith',
        email: 'john.smith@example.com',
        id: 'STU001',
        education: "Bachelor's Degree",
        applications: '3 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        id: 'STU002',
        education: "Master's Degree",
        applications: '2 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=2'
    },
    {
        name: 'Michael Chen',
        email: 'm.chen@example.com',
        id: 'STU003',
        education: 'PhD',
        applications: '1 Active',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/40?img=3'
    },
    {
        name: 'Maria Garcia',
        email: 'maria.g@example.com',
        id: 'STU004',
        education: "Bachelor's Degree",
        applications: '4 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=4'
    },
    {
        name: 'David Wilson',
        email: 'd.wilson@example.com',
        id: 'STU005',
        education: "Master's Degree",
        applications: '2 Active',
        status: 'Inactive',
        avatar: 'https://i.pravatar.cc/40?img=5'
    },
    {
        name: 'Emily Ahmed',
        email: 'e.ahmed@example.com',
        id: 'STU006',
        education: "Bachelor's Degree",
        applications: '1 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=6'
    },
    {
        name: 'Tom Holland',
        email: 'tom.h@example.com',
        id: 'STU007',
        education: "Bachelor's Degree",
        applications: '2 Active',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/40?img=7'
    },
    {
        name: 'Olivia Brown',
        email: 'olivia.b@example.com',
        id: 'STU008',
        education: "Master's Degree",
        applications: '3 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=8'
    },
    {
        name: 'Ethan Lee',
        email: 'ethan.lee@example.com',
        id: 'STU009',
        education: "PhD",
        applications: '1 Active',
        status: 'Inactive',
        avatar: 'https://i.pravatar.cc/40?img=9'
    },
    {
        name: 'Sophia Khan',
        email: 's.khan@example.com',
        id: 'STU010',
        education: "Bachelor's Degree",
        applications: '2 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=10'
    },
    {
        name: 'Liam Patel',
        email: 'liam.p@example.com',
        id: 'STU011',
        education: "Master's Degree",
        applications: '4 Active',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/40?img=11'
    },
    {
        name: 'Ava Walker',
        email: 'ava.w@example.com',
        id: 'STU012',
        education: "PhD",
        applications: '1 Active',
        status: 'Inactive',
        avatar: 'https://i.pravatar.cc/40?img=12'
    },
    {
        name: 'Noah Davis',
        email: 'noah.d@example.com',
        id: 'STU013',
        education: "Bachelor's Degree",
        applications: '3 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=13'
    },
    {
        name: 'Isabella King',
        email: 'isabella.k@example.com',
        id: 'STU014',
        education: "Master's Degree",
        applications: '2 Active',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/40?img=14'
    },
    {
        name: 'James Allen',
        email: 'james.a@example.com',
        id: 'STU015',
        education: "Bachelor's Degree",
        applications: '1 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=15'
    },
    {
        name: 'Mia Scott',
        email: 'mia.s@example.com',
        id: 'STU016',
        education: "PhD",
        applications: '2 Active',
        status: 'Inactive',
        avatar: 'https://i.pravatar.cc/40?img=16'
    },
    {
        name: 'Benjamin Young',
        email: 'ben.y@example.com',
        id: 'STU017',
        education: "Bachelor's Degree",
        applications: '4 Active',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/40?img=17'
    },
    {
        name: 'Charlotte Rivera',
        email: 'char.r@example.com',
        id: 'STU018',
        education: "Master's Degree",
        applications: '3 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=18'
    },
    {
        name: 'Alexander Wright',
        email: 'alex.w@example.com',
        id: 'STU019',
        education: "PhD",
        applications: '1 Active',
        status: 'Inactive',
        avatar: 'https://i.pravatar.cc/40?img=19'
    },
    {
        name: 'Amelia Lopez',
        email: 'amelia.l@example.com',
        id: 'STU020',
        education: "Bachelor's Degree",
        applications: '2 Active',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/40?img=20'
    }
];

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

    const studentsPerPage = 6;
    const openModal = () => setIsFormOpen(true);
    const closeModal = () => setIsFormOpen(false);

    const filteredStudents = students.filter((student) =>
        Object.values(student).some((value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
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

                    {isFormOpen && <StudentForm isOpen={isFormOpen} onClose={closeModal} />}

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

                {/* View Mode */}
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
                                            <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full" />
                                            <div>
                                                <div className="font-medium">{s.name}</div>
                                                <div className="text-gray-500 text-xs">{s.email}</div>
                                            </div>
                                        </td>
                                        <td className="p-2">{s.id}</td>
                                        <td className="p-2">{s.education}</td>
                                        <td className="p-2">{s.applications}</td>
                                        <td className="p-2"><StatusBadge status={s.status} /></td>
                                        <td className="p-2 text-indigo-600 font-medium cursor-pointer">Edit</td>
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
                                    <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <div className="font-medium">{s.name}</div>
                                        <div className="text-gray-500 text-xs">{s.email}</div>
                                    </div>
                                </div>
                                <div className="text-sm">ID: <strong>{s.id}</strong></div>
                                <div className="text-sm">Education: <strong>{s.education}</strong></div>
                                <div className="text-sm">Applications: <strong>{s.applications}</strong></div>
                                <div className="text-sm">Status: <StatusBadge status={s.status} /></div>
                                <div className="text-sm text-indigo-600 font-medium cursor-pointer mt-2">Edit</div>
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
