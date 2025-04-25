import { useState } from 'react';
import { ChevronLeft, Filter, ChevronDown, MoreVertical, Info, HelpCircle } from 'lucide-react';

export default function StudentTaskDashboard() {
  const [tasks] = useState([
    {
      id: 1,
      title: "Registered English Test Proof",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025752",
      student: "[128486] Armat Naseem",
      school: "St. Clair College - Downtown Campus",
      assignee: "Faisal Mahmood"
    },
    {
      id: 2,
      title: "Canadian Arrival Guide - COVID-19",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025752",
      student: "[128486] Armat Naseem",
      school: "St. Clair College - Downtown Campus",
      assignee: "Faisal Mahmood"
    },
    {
      id: 3,
      title: "Study Permit Submission Date",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025752",
      student: "[128486] Armat Naseem",
      school: "St. Clair College - Downtown Campus",
      assignee: "Faisal Mahmood"
    },
    {
      id: 4,
      title: "Study Permit Progress",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025752",
      student: "[128486] Armat Naseem",
      school: "St. Clair College - Downtown Campus",
      assignee: "Faisal Mahmood"
    },
    {
      id: 5,
      title: "Study Permit Outcome",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025752",
      student: "[128486] Armat Naseem",
      school: "St. Clair College - Downtown Campus",
      assignee: "Faisal Mahmood"
    },
    {
      id: 6,
      title: "Country-Specific Grade Point Average",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025752",
      student: "[128486] Armat Naseem",
      school: "St. Clair College - Downtown Campus",
      assignee: "Faisal Mahmood"
    },
    {
      id: 7,
      title: "Passport Copy",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025970",
      student: "[128486] Armat Naseem",
      school: "Langara College",
      assignee: "Faisal Mahmood"
    },
    {
      id: 8,
      title: "Proof of Visa Status",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025970",
      student: "[128486] Armat Naseem",
      school: "Langara College",
      assignee: "Faisal Mahmood"
    },
    {
      id: 9,
      title: "Passport Copy",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025970",
      student: "[128486] Armat Naseem",
      school: "Langara College",
      assignee: "Faisal Mahmood"
    },
    {
      id: 10,
      title: "Onshore Applicants Restrictions",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025970",
      student: "[128486] Armat Naseem",
      school: "Langara College",
      assignee: "Faisal Mahmood"
    },
    {
      id: 11,
      title: "No Academic Conditional Offer",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025970",
      student: "[128486] Armat Naseem",
      school: "Langara College",
      assignee: "Faisal Mahmood"
    },
    {
      id: 12,
      title: "Consortium Agreement Restrictions",
      dueDate: "coming soon",
      intake: "Jan 2021",
      appId: "#025970",
      student: "[128486] Armat Naseem",
      school: "Langara College",
      assignee: "Faisal Mahmood"
    }
  ]);

  const renderTaskCard = (task) => (
    <div key={task.id} className="bg-purple-50 rounded shadow-sm mb-4">
      <div className="bg-purple-100 p-3 flex justify-between items-center rounded-t">
        <div className="font-medium text-purple-900">App Requirement</div>
        <MoreVertical size={16} className="text-purple-500" />
      </div>
      <div className="p-3">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <span>Due date</span>
          <Info size={12} className="ml-1" />
        </div>
        <div className="text-xs text-gray-700 mb-3">Due date coming soon</div>

        <div className="text-sm font-medium text-blue-500 mb-4">{task.title}</div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-500">Intake:</div>
            <div>{task.intake}</div>
          </div>
          <div>
            <div className="text-gray-500">App ID:</div>
            <div>{task.appId}</div>
          </div>
          <div>
            <div className="text-gray-500">Student:</div>
            <div>{task.student}</div>
          </div>
          <div>
            <div className="text-gray-500">School:</div>
            <div>{task.school}</div>
          </div>
          <div>
            <div className="text-gray-500">Assignee:</div>
            <div>{task.assignee}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-3 flex items-center border-b">
        <div className="flex items-center text-gray-500">
          <ChevronLeft size={16} />
          <span className="ml-1">Home</span>
          <span className="mx-1">/</span>
          <span className="text-gray-700">Dashboard</span>
        </div>
        <div className="ml-auto flex items-center">
          <div className="mr-4 relative">
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white">
            U
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        <h1 className="text-xl font-medium mb-1">My tasks</h1>
        <p className="text-sm text-gray-600 mb-4">You have 20 uncompleted tasks</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex-1 min-w-[150px]">
            <div className="border rounded bg-white flex justify-between items-center p-2 text-sm">
              <span>Intake</span>
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="flex-1 min-w-[150px]">
            <div className="border rounded bg-white flex justify-between items-center p-2 text-sm">
              <span>Due date</span>
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="flex-1 min-w-[150px]">
            <div className="border rounded bg-white flex justify-between items-center p-2 text-sm">
              <span>App ID</span>
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="flex-1 min-w-[150px]">
            <div className="border rounded bg-white flex justify-between items-center p-2 text-sm">
              <span>App stage</span>
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="flex-1 min-w-[150px]">
            <div className="border rounded bg-white flex justify-between items-center p-2 text-sm">
              <span>Student</span>
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="flex-1 min-w-[150px]">
            <div className="border rounded bg-white flex justify-between items-center p-2 text-sm">
              <span>School name</span>
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="flex-1 min-w-[150px]">
            <div className="border rounded bg-white flex justify-between items-center p-2 text-sm">
              <span>School country</span>
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="flex-1 min-w-[150px]">
            <div className="border rounded bg-white flex justify-between items-center p-2 text-sm">
              <span>Assignee</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Status and task options */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            Showing 19 out of 19 uncompleted tasks
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-sm flex items-center">
              <span className="mr-2">Hide overdue tasks</span>
              <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="border rounded bg-white flex items-center p-2 text-sm">
                <span>Due date type</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
              <div className="border rounded bg-white flex items-center p-2 text-sm">
                <Filter size={16} className="mr-1" />
                <span>Uncompleted</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
              <div className="border rounded bg-white flex items-center p-2 text-sm">
                <span>Task type</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Task cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tasks.map(renderTaskCard)}
        </div>
      </div>

      {/* Help button */}
      <div className="fixed bottom-4 right-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <HelpCircle size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}