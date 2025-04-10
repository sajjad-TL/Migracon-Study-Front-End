import React from "react";
import { BsFillBagCheckFill, BsCalculatorFill } from "react-icons/bs";
import { IoDocumentText, IoPersonAdd } from "react-icons/io5";
import { FaSchool, FaArrowTrendUp, FaBuildingColumns } from "react-icons/fa6";
import { FaTasks, FaHandHoldingUsd } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { PiStudentFill, PiTestTubeFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";
import { RiDashboard3Fill } from "react-icons/ri";
import migracon from "../assets/Migracon.svg"
import img1 from "../assets/schoolgirl.jpg"
import { MdOutlineWhatsapp } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { MdLocalPhone } from "react-icons/md";




const getStatusClasses = (status) => {
  switch (status) {
    case "Under Review":
      return "bg-green-100 text-green-600";
    case "Pending Documents":
      return "bg-yellow-100 text-yellow-600";
    case "Offer Received":
      return "bg-blue-100 text-blue-600";
    case "Rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function Dashboard() {

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r p-4 flex flex-col">
        <div className="mb-6">

          <img src={migracon} alt="migracon" className="h-30" />

        </div>
        <nav className="flex-1 space-y-2 text-sm">
          <SidebarItem icon={<IoMdHome size={22} />} text="Home" />
          <SidebarItem icon={<FaSchool size={22} />} text="Programs & Schools" />
          <SidebarItem icon={<PiStudentFill size={22} />} text="Students" />
          <SidebarItem icon={<IoDocumentText size={22} />} text="Applications" />
          <SidebarItem icon={<FaTasks size={22} />} text="My Tasks" />
          <SidebarItem icon={<MdPayments size={22} />} text="Payments" />
          <SidebarItem icon={<HiAcademicCap size={22} />} text="TrainHub" />
          <SidebarItem icon={<FaArrowTrendUp size={22} />} text="Growth Hub" badge="New" />
          <SidebarItem icon={<PiTestTubeFill size={22} />} text="Test Solutions" />
          <SidebarItem icon={<RiDashboard3Fill size={22} />} text="Offers Dashboard" />
          <SidebarItem icon={<FaHandHoldingUsd size={22} />} text="Start Loan Application" />
          <SidebarItem icon={<FaBuildingColumns size={22} />} text="Start GIC Application" />
          <SidebarItem icon={<IoPersonAdd size={22} />} text="Add Student" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* TopNav */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Agent Dashboard</div>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Active Tasks" value="38" icon={<BsFillBagCheckFill className="text-[#1543a7] text-3xl" />
          } />
          <StatCard title="Approved Applications" value="156" icon="✅" />
          <StatCard title="Applications" value="48" icon={<IoDocumentText className="text-[#1a5ef0] text-3xl" />
          } />
          <StatCard title="Rejected Applications" value="2" icon="❌" />
        </div>

        {/* Recent Applications & Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Recent Applications" colSpan={2}>
            <AppRow
              image={img1}
              name="Sarah Chen"
              uni="University of Toronto - CS"
              status="Under Review"
            />
            <AppRow
              image={img1}
              name="Mohammed Al-Rashid"
              uni="McGill - Business Admin"
              status="Pending Documents"
            />
            <AppRow
              image={img1}
              name="Priya Patel"
              uni="UBC - Engineering"
              status="Offer Received"
            />
            <div className="mt-4 border border-gray-300 rounded p-3 flex justify-center">
              <button className="text-black font-semibold text-sm hover:underline">
                View all
              </button>
            </div>
          </Card>
          <Card title="Tasks Due Soon">
            <TaskRow title="Upload IELTS Results" due="Today" />
            <TaskRow title="Review SOP Draft" due="Tomorrow" />
            <TaskRow title="Submit Fee Payment" due="In 3 days" />
            <div className="mt-[6.5rem] border border-gray-300 rounded p-3 flex justify-center">
              <button className="text-black  font-semibold text-sm hover:underline">
                View all tasks
              </button>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <ActionButton label="Add New Student" />
          <ActionButton label="Search Programs" />
          <ActionButton label="Start Application" />
          <ActionButton label="View Reports" />
        </div>

        {/* Task Management Chart */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2">
            Application Statistics - Summer 2025
          </h3>
          <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500">
            [Chart Placeholder]
          </div>
          <div className="grid grid-cols-4 text-center text-sm mt-4">
            <div>
              <strong>45</strong>
              <div>Paid Applications</div>
            </div>
            <div>
              <strong>38</strong>
              <div>Final Offers</div>
            </div>
            <div>
              <strong>32</strong>
              <div>Visas</div>
            </div>
            <div>
              <strong>12</strong>
              <div>Promotions</div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-[40rem] hidden lg:block bg-gray-100 border-l p-4 space-y-4">
        {/* Your Balance Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-black mb-2 font-bold">Your balance</div>
          <input placeholder="CAD" className="border p-2 rounded  w-full" />
          <div className="mt-4 text-sm leading-[2] text-black ">
            Commissions <br /> ApplyCredits
          </div>
          <button className="mt-2 w-full bg-blue-100 text-black font-semibold py-2 rounded text-sm">
            Request commission withdrawal
          </button>
        </div>

        {/* Popular Links */}
        <div className="bg-white p-4 rounded-lg shadow ">
          <div className="text-sm font-medium mb-2">Popular links</div>
          <ul className="space-y-1 text-sm text-black leading-[4.5]">
            <li className="flex flex-row gap-2 items-center "><MdOutlineWhatsapp className="text-green-500" />
              WhatsApp chat</li>
            <li className="flex flex-row gap-2 items-center"><IoDocumentTextSharp />
              Assist - knowledge base</li>
            <li className="flex flex-row gap-2 items-center"><BsCalculatorFill />
              Canadian visa calculator</li>
          </ul>
        </div>

        {/* Account Manager */}
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center gap-4">

          <div>
            <div className="font-semibold mb-14">Your account manager</div>

            <div className="text-sm text-gray-500">
           <div className="flex flex-row gap-2 items-center">
           <TfiEmail />
           shakeel@migraconstudy.com
           </div>
              <div className="flex flex-row gap-2 items-center">
              <MdLocalPhone />
              +92 333 1234 567
           </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/31.jpg"
              className="w-12 h-12 rounded-full"
            />
            <div className="font-semibold">Shakeel</div>

          </div>
        </div>
      </aside>
    </div>
  );
}

// --- Helper Components --- //
const SidebarItem = ({ icon, text, badge }) => (
  <div className="flex items-center justify-between group px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
    <div className="flex items-center space-x-2">
      {icon}
      <span className="font-semibold text-[15px]">{text}</span>
    </div>
    {badge && (
      <span className="text-xs bg-green-100 text-green-600 px-2 rounded">
        {badge}
      </span>
    )}
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  </div>
);

const Card = ({ title, children, colSpan }) => (
  <div
    className={`bg-white rounded-lg p-4 shadow ${colSpan ? `md:col-span-${colSpan}` : ""}`}
  >
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);








const AppRow = ({ image, name, uni, status }) => (
  <div className="flex justify-between text-sm py-2 border-b last:border-b-0">
    <div className="flex flex-row gap-4">
      <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-gray-500">{uni}</div>
      </div>

    </div>
    <div className={`text-xs h-5 mt-3 px-2 rounded-full text-center font-semibold w-[120px] truncate ${getStatusClasses(status)}`}>
      {status}
    </div>

  </div>

);

const TaskRow = ({ title, due }) => (
  <div className="text-sm py-1 flex justify-between">
    <span>{title}</span>
    <span className="text-red-600">Due {due}</span>
  </div>
);

const ActionButton = ({ label }) => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
    {label}
    <div>
    </div>
  </button>
);

