import { useState } from 'react';
import { Filter, ChevronDown, X, Plus } from 'lucide-react';
import { FaFlag } from "react-icons/fa";
import ApplicationNavbar from '../layouts/ApplicationNavbar';

export default function ApplicationManagementInterface() {
  const [showBanner, setShowBanner] = useState(true);
  const user = JSON.parse(localStorage.getItem('user')) || {}; // Make sure to retrieve 'user' from localStorage


  const applications = [
    {
      paymentDate: '2023-07-12',
      appId: '2307001',
      studentId: '6385746',
      applyDate: '2022-07-24',
      firstName: 'Harry',
      lastName: 'Peterson',
      program: 'Graduate Certificate - Business System Dev',
      school: 'RWTH University - Aachen (DE)',
      startDate: '2023-09-01',
      recruitmentPartner: 'help@rguide.com',
      status: 'Accepted',
      requirements: 4,
      currentStage: 'Pre-Arrival'
    },
    {
      paymentDate: '2023-02-17',
      appId: '2307223',
      studentId: '6485148',
      applyDate: '2022-05-24',
      firstName: 'Haris',
      lastName: 'Peterson',
      program: 'Post Diploma Diploma - Business Administration',
      school: 'Carleton College',
      startDate: '2023-09-01',
      recruitmentPartner: 'help@rguide.com',
      status: 'Accepted',
      requirements: 4,
      currentStage: 'Admission'
    },
    {
      paymentDate: '2017-02-17',
      appId: '2307316',
      studentId: '6485746',
      applyDate: '2022-04-24',
      firstName: 'Liam',
      lastName: 'Peterson',
      program: 'Master of Education Administration (MEd)',
      school: 'University Canada West (UCW)',
      startDate: '2023-04-01',
      recruitmentPartner: 'help@rguide.com',
      status: 'Withdrawn',
      requirements: 0,
      currentStage: 'Pending Admission'
    },
    {
      paymentDate: '',
      appId: '2304636',
      studentId: '8565106',
      applyDate: '2022-08-22',
      firstName: 'Syed Mohib',
      lastName: 'Hussain',
      program: 'College Diploma - Food and Beverage Mgmt',
      school: 'Conestoga College - Waterloo',
      startDate: '2022-05-01',
      recruitmentPartner: 'help@rguide.com',
      status: 'Not Paid',
      requirements: 0,
      currentStage: 'Pre-Payment'
    },
    {
      paymentDate: '',
      appId: '2305512',
      studentId: '8565106',
      applyDate: '2022-06-17',
      firstName: 'Syed Mohib',
      lastName: 'Hussain',
      program: 'College Diploma - Hospitality Hotel Law Serv',
      school: 'Centennial College',
      startDate: '2023-01-01',
      recruitmentPartner: 'help@rguide.com',
      status: 'Not Paid',
      requirements: 0,
      currentStage: 'Pre-Payment'
    }
  ];

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

      {/* Banner */}
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

      {/* Main Content */}
      <div className="px-6 py-4">
        <div className="flex flex-row items-center justify-between mb-4">

          <h1 className="text-xl font-medium mb-4">Applications</h1>

          {/* Filters */}
          <div className="flex space-x-2">

            <button className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center">
              Apply Filters
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded text-sm flex items-center">
              <Filter size={16} className="mr-1" />  Filters
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm flex items-center">
              <Plus size={16} className="mr-3" /> Add Application
            </button>
          </div>

        </div>

        {/* Filter Form */}
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

        {/* Table */}
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
              {applications.map((app, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-b">{app.paymentDate || '-'}</td>
                  <td className="py-2 px-3 border-b text-blue-600">{app.appId}</td>
                  <td className="py-2 px-3 border-b">{app.studentId}</td>
                  <td className="py-2 px-3 border-b">{app.applyDate}</td>
                  <td className="py-2 px-3 border-b">{app.firstName}</td>
                  <td className="py-2 px-3 border-b">{app.lastName}</td>
                  <td className="py-2 px-3 border-b">{app.program}</td>
                  <td className="py-2 px-3 border-b">
                    <div className="flex items-center">
                      {app.school.includes('RWTH') || app.school.includes('Conestoga') || app.school.includes('Centennial') || app.school.includes('Carleton') || app.school.includes('University') ? (
                        <div className="w-3 h-3 rounded-full mr-2">
                          <FaFlag className='text-red-500' />

                        </div>
                      ) : null}
                      {app.school}
                    </div>
                  </td>
                  <td className="py-2 px-3 border-b">{app.startDate}</td>
                  <td className="py-2 px-3 border-b text-blue-600">{app.recruitmentPartner}</td>
                  <td className={`py-2 px-3 border-b ${getStatusColor(app.status)}`}>{app.status}</td>
                  <td className="py-2 px-3 border-b">
                    <div className="flex items-center space-x-1">
                      {app.status === 'Accepted' && (
                        <>
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-4 h-4 rounded-sm border border-gray-300 flex items-center justify-center bg-green-50">
                              <div className="w-2 h-2 rounded-sm bg-green-500"></div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-3 border-b">{app.currentStage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}