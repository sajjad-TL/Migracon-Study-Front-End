import React, { useEffect, useState } from "react";
import axios from "axios";
import { Filter, X, Plus } from 'lucide-react';
import ApplicationNavbar from '../layouts/ApplicationNavbar';
import ApplicationForm from '../Model/ApplicationForm';

export default function Application() {
  const [showBanner, setShowBanner] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalApplications, setOriginalApplications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [filters, setFilters] = useState({
    paymentDate: '',
    applicationId: '',
    studentId: '',
    firstName: '',
    lastName: '',
    applyDate: '',
    program: '',
    institute: '',
    startDate: '',
    requirementspartner: '',
    status: '',
    stage: '',
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleApplyFilters = () => {
    const filtered = originalApplications.filter((app) => {
      return (
        (!filters.paymentDate || formatDate(app.paymentDate) === formatDate(filters.paymentDate)) &&
        (!filters.applicationId || app.applicationId?.toLowerCase().includes(filters.applicationId.toLowerCase())) &&
        (!filters.studentId || app.studentId?.toLowerCase().includes(filters.studentId.toLowerCase())) &&
        (!filters.firstName || app.firstName?.toLowerCase().includes(filters.firstName.toLowerCase())) &&
        (!filters.lastName || app.lastName?.toLowerCase().includes(filters.lastName.toLowerCase())) &&
        (!filters.applyDate || formatDate(app.applyDate) === formatDate(filters.applyDate)) &&
        (!filters.program || app.program?.toLowerCase() === filters.program.toLowerCase()) &&
        (!filters.institute || app.institute?.toLowerCase() === filters.institute.toLowerCase()) &&
        (!filters.startDate || formatDate(app.startDate) === formatDate(filters.startDate)) &&
        (!filters.requirementspartner || app.requirementspartner?.toLowerCase() === filters.requirementspartner.toLowerCase()) &&
        (!filters.status || app.status?.toLowerCase() === filters.status.toLowerCase()) &&
        (!filters.stage || app.stage?.toLowerCase() === filters.stage.toLowerCase())
      );
    });
    setApplications(filtered);
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/student/getAllApplications");
      const apps = response.data.applications || [];

      // Sort applications by createdAt or applyDate DESC
      const sortedApps = apps.sort((a, b) =>
        new Date(b.createdAt || b.applyDate) - new Date(a.createdAt || a.applyDate)
      );

      setApplications(sortedApps);
      setOriginalApplications(sortedApps);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border border-green-300 rounded-full px-2 py-0.5 text-xs font-medium';
      case 'withdrawn':
        return 'bg-amber-100 text-amber-800 border border-amber-300 rounded-full px-2 py-0.5 text-xs font-medium';
      case 'not paid':
        return 'bg-gray-100 text-gray-800 border border-gray-300 rounded-full px-2 py-0.5 text-xs font-medium';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-full px-2 py-0.5 text-xs font-medium';
      case 'rejected':
        return 'bg-red-100 text-red-800 border border-red-300 rounded-full px-2 py-0.5 text-xs font-medium';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300 rounded-full px-2 py-0.5 text-xs font-medium';
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <ApplicationNavbar user={user} />

      {showBanner && (
        <div className="bg-green-100 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
              <span className="text-xs">✓</span>
            </div>
            <p className="text-sm text-green-700 pt-3">
              Exciting update! Announcing Task Management — a brand new way to conveniently manage all of your requirements in one place. Go ahead and give it a try!
            </p>
          </div>
          <div className="flex items-center">
            <button className="text-sm text-green-700 hover:underline mr-4">Try Task Management</button>
            <button onClick={() => setShowBanner(false)} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="px-6 py-4">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-xl font-medium mb-4">Applications</h1>
          <div className="flex space-x-2">
            <button onClick={handleApplyFilters} className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center">
              Apply Filters
            </button>
            <button onClick={() => setShowFilters(!showFilters)} className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center">
              <Filter size={16} className="mr-1" /> Filters
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm flex items-center"
            >
              <Plus size={16} className="mr-3" /> Add Application
            </button>
            {showModal && (
              <ApplicationForm
                onClose={() => setShowModal(false)}
                onApplicationCreated={(newApp) => {
                  const updatedApps = [newApp, ...applications];
                  setApplications(updatedApps);
                  setOriginalApplications(updatedApps);
                  setShowModal(false);
                }}
              />
            )}
          </div>
        </div>

        {/* Filter form omitted for brevity, keep as-is if already working */}

        {loading ? (
          <p>Loading applications...</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto bg-white border border-gray-200 text-sm rounded shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["PAYMENT DATE", "APP ID", "STUDENT ID", "APPLY DATE", "FIRST NAME", "LAST NAME", "PROGRAM", "SCHOOL", "START DATE", "RECRUITMENT PARTNER", "STATUS", "REQUIREMENTS", "CURRENT STAGE"].map((header) => (
                    <th key={header} className="py-2 px-2 text-left text-gray-600 text-xs font-semibold uppercase border-b whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((app, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-2 border-b">{app.paymentDate ? new Date(app.paymentDate).toLocaleDateString() : '-'}</td>
                      <td className="py-2 px-2 border-b text-blue-600">{app.applicationId}</td>
                      <td className="py-2 px-2 border-b">{app.studentId}</td>
                      <td className="py-2 px-2 border-b">{app.applyDate ? new Date(app.applyDate).toLocaleDateString() : '-'}</td>
                      <td className="py-2 px-2 border-b">{app.firstName}</td>
                      <td className="py-2 px-2 border-b">{app.lastName}</td>
                      <td className="py-2 px-2 border-b">{app.program}</td>
                      <td className="py-2 px-2 border-b whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <span className="text-red-500">⚑</span>
                          <span>{app.institute?.replace(/\s+/g, ' ').trim()}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 border-b">{app.startDate ? new Date(app.startDate).toLocaleDateString() : '-'}</td>
                      <td className="py-2 px-2 border-b">{app.requirementspartner}</td>
                      <td className="py-2 px-2 border-b">
                        <span className={getStatusStyle(app.status)}>{app.status || '—'}</span>
                      </td>
                      <td className="py-2 px-2 border-b">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full inline-block">
                          {app.requirements || '—'}
                        </span>
                      </td>
                      <td className="py-2 px-2 border-b">{app.currentStage}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center py-4 text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
