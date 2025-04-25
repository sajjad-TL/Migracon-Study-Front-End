import React, { useEffect, useState } from "react";
import axios from "axios";
import { Filter, ChevronDown, X, Plus } from 'lucide-react';
import ApplicationNavbar from '../layouts/ApplicationNavbar';
import ApplicationForm from '../Model/ApplicationForm';

export default function Application() {
  const [showBanner, setShowBanner] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [showFilters, setShowFilters] = useState(false);



  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/student/getAllApplications");
      console.log(response,"adss")
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'text-green-600';
      case 'Withdrawn': return 'text-amber-600';
      case 'Not Paid': return 'text-gray-600';
      default: return 'text-gray-600';
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
            <button className="text-sm text-green-700 hover:underline mr-4">
              Try Task Management
            </button>
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
            <button className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center">
              Apply Filters
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center"
            >
              <Filter size={16} className="mr-1" /> Filters
            </button>
            <div>
              <button
                onClick={() => setShowModal(true)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm flex items-center"
              >
                <Plus size={16} className="mr-3" /> Add Application
              </button>
              {showModal && (
                <ApplicationForm
                  onClose={() => {
                    setShowModal(false);
                    fetchApplications();
                  }}
                />
              )}
            </div>
          </div>
        </div>


        {/* Filter Form */}
        {showFilters && (

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">Payment Date</label>
              <div className="flex">
                <input type="date" placeholder="mm/dd/yyyy" className="border border-gray-300 rounded-3 p-2 text-sm w-full" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">App ID</label>
              <input type="text" className="border border-gray-300 rounded p-2 text-sm" />
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">Student ID</label>
              <input type="text" className="border border-gray-300 rounded p-2 text-sm" />
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">First Name</label>
              <input type="text" className="border border-gray-300 rounded p-2 text-sm" />
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">Last Name</label>
              <input type="text" className="border border-gray-300 rounded p-2 text-sm" />
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">Apply Date</label>
              <div className="flex">
                <input type="date" placeholder="mm/dd/yyyy" className="border border-gray-300 rounded-3 p-2 text-sm w-full" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">Program</label>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded p-2 pr-8 text-sm w-full bg-white">
                  <option>Select Program</option>
                </select>
                <div className="absolute right-2 top-2.5 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">School</label>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded p-2 pr-8 text-sm w-full bg-white">
                  <option>Select School</option>
                </select>
                <div className="absolute right-2 top-2.5 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">Start Date</label>
              <div className="flex">
                <input type="date" placeholder="mm/dd/yyyy" className="border border-gray-300 rounded-3 p-2 text-sm w-full" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">Recruitment Partner</label>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded p-2 pr-8 text-sm w-full bg-white">
                  <option>Select Partner</option>
                </select>
                <div className="absolute right-2 top-2.5 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">Status</label>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded p-2 pr-8 text-sm w-full bg-white">
                  <option>Select Status</option>
                </select>
                <div className="absolute right-2 top-2.5 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase text-gray-500 mb-1">Current Stage</label>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded p-2 pr-8 text-sm w-full bg-white">
                  <option>Select Stage</option>
                </select>
                <div className="absolute right-2 top-2.5 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p>Loading applications...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-3 text-[15px] text-left font-medium text-gray-500 uppercase tracking-wider border-b">Payment Date</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">App ID</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">Student ID</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">Apply Date</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">First Name</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">Last Name</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">Program</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">School</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">Start Date</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">Recruitment Partner</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">Status</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">Requirements</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b">Current Stage</th>
                </tr>
              </thead>
              <tbody>

                {Array.isArray(applications) && applications.length > 0 ? (
                  applications.map((app, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-3 border-b">{app.paymentDate ? new Date(app.paymentDate).toLocaleDateString() : '-'}</td>

                      <td className="py-2 px-3 border-b text-blue-600">{app.applicationId}</td>
                      <td className="py-2 px-3 border-b">{app.studentId}</td>
                      <td className="py-2 px-3 border-b">{app.applyDate ? new Date(app.applyDate).toLocaleDateString() : '-'}</td>
                      <td className="py-2 px-3 border-b">{app.firstName}</td>
                      <td className="py-2 px-3 border-b">{app.lastName}</td>
                      <td className="py-2 px-3 border-b">{app.program}</td>
                      <td className="py-2 px-3 border-b">{app.institute}</td>

                      <td className="py-2 px-3 border-b">{app.startDate}</td>
                      <td className="py-2 px-3 border-b text-blue-600">
                        {app.requirementspartner}</td>
                      <td className={`py-2 px-3 border-b ${getStatusColor(app.status)}`}>{app.status}</td>
                      <td className="py-2 px-3 border-b">{app.requirements}</td>


                      <td className="py-2 px-3 border-b">{app.currentStage}</td>
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
