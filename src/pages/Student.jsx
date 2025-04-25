import React, { useState, useContext, useEffect } from 'react';
import StudentForm from '../Model/StudentForm';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { CiGrid41 } from "react-icons/ci";
import { UserContext } from '../context/userContext';
import StudentNavbar from '../layouts/StudentNavbar';
import FilterModal from '../Model/FilterModal';
import EditStudent from '../Model/EditStudent'

const StatusBadge = ({ status }) => {
  const colors = {
    Active: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Active': 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || ''}`}>
      {status}
    </span>
  );
};



export default function StudentDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  
  const [studentData, setStudentData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const { user } = useContext(UserContext);
  const agentId = user?.agentId;
  const studentsPerPage = 6;

  const openModal = () => setIsFormOpen(true);
  const closeModal = () => setIsFormOpen(false);

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleStudentAdded = () => {
    fetchStudents();
    setIsFormOpen(false);
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudentData(updatedStudent);
    setStudents(prev =>
      prev.map(s =>
        s._id === updatedStudent._id
          ? {
            ...s,
            ...updatedStudent,
            name: `${updatedStudent.firstName} ${updatedStudent.lastName}`,
            avatar: s.avatar || `https://i.pravatar.cc/40?u=${s._id}`,
          }
          : s
      )
    );
    setIsEditModalOpen(false);
  };

  
  const fetchStudents = async () => {
    try {
      const res = await fetch(`http://localhost:5000/agent/all-students/${agentId}`);
      const data = await res.json();
  
      console.log("Raw student data:", data);
      const normalized = (data?.students || []).map(s => ({
        _id: s._id,
        name: `${s.firstName} ${s.lastName}`,
        firstName: s.firstName,
        lastName: s.lastName, 
        avatar: `https://i.pravatar.cc/40?u=${s._id}`,
        email: s.email,
        education: s.applications?.map(app => app.program).join(', ') || "N/A",
        status: s.status,
        applicationCount: s.applicationCount || 0,
        applications: s.applications || [], // 👈 Add this line
      }));
      
  
      setStudents(normalized);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  

  useEffect(() => {
    if (agentId) fetchStudents();
  }, [agentId]);
  
  const filteredStudents = students.filter((student) => {
    // Match text search
    const matchesSearch = Object.values(student).some((value) =>
      typeof value === 'string' &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const matchesStatusFilter =
      selectedFilters.length === 0 || 
      !selectedFilters.includes("Active") && 
      !selectedFilters.includes("Pending") && 
      !selectedFilters.includes("In Active") || 
      selectedFilters.includes(student.status);
  


      


    // Match input field filters
    const matchesInputFilters = Object.entries(filterValues).every(([field, value]) => {
      if (!value || value.trim() === "") return true;
      
      // Handle different field types
      switch(field) {
        case 'id':
          return student._id && student._id.toLowerCase().includes(value.toLowerCase());
        case 'firstName':
          return student.firstName && student.firstName.toLowerCase().includes(value.toLowerCase());
        case 'lastName':
          return student.lastName && student.lastName.toLowerCase().includes(value.toLowerCase());
        case 'email':
          return student.email && student.email.toLowerCase().includes(value.toLowerCase());
        case 'student':
          return student.name && student.name.toLowerCase().includes(value.toLowerCase());
        default:
          return true;
      }
    });
  
    return matchesSearch && matchesStatusFilter && matchesInputFilters;
  });
  const activeApplicationsCount = students.reduce((count, student) => {
    const activeApps = (student.applications || []).filter(app => app.status?.toLowerCase() === 'accepted');
    return count + activeApps.length;
  }, 0);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="p-6 space-y-6">
        <StudentNavbar user={user} />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ label: 'Total Students', value: students.length, icon: '👥' }, {label: 'Active Applications', value: activeApplicationsCount, icon: '📄' }, { label: 'Completed', value: '892', icon: '✅' }, { label: 'New This Month', value: '325', icon: '➕' }].map((stat, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-4 flex items-center gap-4">
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
              <div className="text-xl font-semibold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Students */}
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex flex-col md:flex-row items-center mb-4 gap-2">
          <button onClick={openModal} className="bg-black text-white px-4 py-2 rounded-md font-medium">
            + Add New Student
          </button>
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

          {isFormOpen && (
            <StudentForm
              isOpen={isFormOpen}
              onClose={closeModal}
              onStudentAdded={handleStudentAdded}
            />
          )}

          <div className="flex items-center gap-2 w-full md:w-auto ms-auto">
            <button
              className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-funnel mr-1"
              >
                <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
              </svg>
              Filters
            </button>

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

        {/* Table or Grid View */}
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
                    <td className="p-2">{s._id}</td>
             <td className="p-2">
  {s.education && s.education !== "N/A" ? (
    s.education
  ) : (
    <span className="text-gray-500 italic">No education info</span>
  )}
</td>
                  <td className="p-2">{s.applicationCount}</td>
                    <td className="p-2"><StatusBadge status={s.status} /></td>
                    <td className="p-2 text-indigo-600 font-medium cursor-pointer" onClick={() => openEditModal(s)}>Edit</td>
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
                <div className="text-sm">ID: <strong>{s._id}</strong></div>
                <div className="text-sm">Education: <strong>{s.education}</strong></div>
                <div className="text-sm">Applications: <strong>{s.applicationCount}</strong></div>
                <div className="text-sm">Status: <StatusBadge status={s.status} /></div>
                <div className="text-sm text-indigo-600 font-medium cursor-pointer mt-2" onClick={() => openEditModal(s)}>Edit</div>
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
            <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded-md disabled:opacity-50">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageClick(i + 1)}
                className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'bg-black text-white' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditStudent
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        agentData={selectedStudent}
        onStudentUpdated={handleUpdateStudent}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
    </div>
  );
}
