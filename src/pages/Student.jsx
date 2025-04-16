import React, { useState } from 'react';
import StudentForm from './StudentForm';

const students = [
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
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="p-6 space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Students', value: '2,451', icon: '👥' },
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

            {/* Student Table */}
            <div className="bg-white shadow rounded-xl p-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-black text-white px-4 py-2 rounded-md font-medium"
                    >
                        + Add New Student
                    </button>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="border px-3 py-2 rounded-md w-full md:w-64"
                        />
                        <button className="border px-3 py-2 rounded-md">Filters</button>
                        <button className="border px-3 py-2 rounded-md">🔳</button>
                    </div>
                </div>

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
                            {students.map((s, i) => (
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
                                    <td className="p-2">
                                        <StatusBadge status={s.status} />
                                    </td>
                                    <td className="p-2 text-indigo-600 font-medium cursor-pointer">Edit</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 text-sm">
                    <div>Showing 1 to 6 of 97 results</div>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border rounded-md">Previous</button>
                        <button className="px-3 py-1 border rounded-md bg-black text-white">1</button>
                        <button className="px-3 py-1 border rounded-md">2</button>
                        <button className="px-3 py-1 border rounded-md">3</button>
                        <button className="px-3 py-1 border rounded-md">Next</button>
                    </div>
                </div>
                {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                  ✖
                </button>
                <StudentForm />
              </div>
            </div>
          )} 
            </div>
        </div>
                  
    );
}
