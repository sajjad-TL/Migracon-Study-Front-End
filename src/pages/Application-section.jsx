import React from 'react';

function Application() {

  const applications = [
    {
      id: 1,
      paymentDate: '2023-01-27',
      appId: '2973001',
      studentId: '648146',
      applyDate: '2023-01-24',
      firstName: 'Haris',
      lastName: 'Naeem',
      program: 'Graduate Certificate - Business - Human Res',
      school: 'Trent University - Durham GTA',
      flag: 'CA',
      startDate: '2023-09-01',
      recruitmentPartner: 'haris@region.com',
      status: 'Accepted',
      requirements: [1, 2, 3, 4],
      currentStage: 'Pre-Arrival'
    },
    {
      id: 2,
      paymentDate: '2023-01-27',
      appId: '2977273',
      studentId: '648146',
      applyDate: '2023-01-24',
      firstName: 'Haris',
      lastName: 'Naeem',
      program: 'Post Degree Diploma - Business Administration',
      school: 'Cambrian College',
      flag: 'CA',
      startDate: '2023-09-01',
      recruitmentPartner: 'haris@region.com',
      status: 'Accepted',
      requirements: [1, 2, 3, 4],
      currentStage: 'Admission'
    },
    {
      id: 3,
      paymentDate: '2023-01-27',
      appId: '2975716',
      studentId: '648146',
      applyDate: '2023-01-24',
      firstName: 'Haris',
      lastName: 'Naeem',
      program: 'Master of Business Administration (MBA)',
      school: 'University Canada West (UCW)',
      flag: 'CA',
      startDate: '2023-07-01',
      recruitmentPartner: 'haris@region.com',
      status: 'Withdrawn',
      requirements: [],
      currentStage: 'Post-Submission'
    },
    {
      id: 4,
      paymentDate: '',
      appId: '2208406',
      studentId: '908106',
      applyDate: '2022-06-22',
      firstName: 'Syed Mohib',
      lastName: 'Hussain',
      program: 'College Diploma - Food and Beverage Mgmt',
      school: 'Conestoga College - Waterloo',
      flag: 'CA',
      startDate: '2022-09-01',
      recruitmentPartner: 'haris@region.com',
      status: 'Not Paid',
      requirements: [],
      currentStage: 'Pre-Payment'
    },
    {
      id: 5,
      paymentDate: '',
      appId: '2165512',
      studentId: '908106',
      applyDate: '2022-06-17',
      firstName: 'Syed Mohib',
      lastName: 'Hussain',
      program: 'College Diploma - Hospitality Hotel and Rest',
      school: 'Cambrian College',
      flag: 'CA',
      startDate: '2023-01-01',
      recruitmentPartner: 'haris@region.com',
      status: 'Not Paid',
      requirements: [],
      currentStage: 'Pre-Payment'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Withdrawn':
        return 'bg-amber-100 text-amber-800';
      case 'Not Paid':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Program Closed':
        return 'bg-orange-100 text-orange-800';
      case 'Refund in Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Enrollment Confirmed':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">


      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">New Application</button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500 text-sm">Total Applications</h3>
            <p className="text-2xl font-bold">{applications.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500 text-sm">Accepted</h3>
            <p className="text-2xl font-bold">{applications.filter(app => app.status === 'Accepted').length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500 text-sm">Not Paid</h3>
            <p className="text-2xl font-bold">{applications.filter(app => app.status === 'Not Paid').length}</p>
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3">App ID</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Program</th>
                  <th className="py-2 px-3">School</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Stage</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{app.appId}</td>
                    <td className="py-2 px-3">{app.firstName} {app.lastName}</td>
                    <td className="py-2 px-3">{app.program}</td>
                    <td className="py-2 px-3">{app.school}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">{app.currentStage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application;
