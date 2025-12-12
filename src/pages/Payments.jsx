import { useState, useContext } from "react";
import {
  ChevronDown,
  Info,
  Search,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { UserContext } from "../context/userContext";
import PaymentNavbar from "../layouts/PaymentNavbar";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("ApplyCredits");
  const [expandedTransaction, setExpandedTransaction] = useState(null);

  const { user } = useContext(UserContext);
  const purchasesData = [
    {
      date: "Jan 27, 2023",
      description:
        "Master of Business Administration (MBA), University Canada West (UCW) (+ 2 items)",
      amount: "$95.00 CAD",
      student: "Haris Naeem",
      id: "a156242e-9df6-4433-98c9-5fdee59fba32",
    },
    {
      date: "May 27, 2022",
      description:
        "Integrated Foundation - Bachelor of Science - Computer Networks and Security, Middlesex University (+ 2 items)",
      amount: "£0.00 GBP",
      student: "Uzair Khan",
    },
    {
      date: "Apr 11, 2022",
      description:
        "College Diploma - Early Childhood Education (ECE), Seneca College - King Campus (+ 3 items)",
      amount: "$145.00 CAD",
      student: "Laila Anwar",
      id: "bb6353de-9945-11eb-97e5-0276def11d31",
    },
    {
      date: "Mar 30, 2022",
      description:
        "Business - Direct Entry - UTP Stage II (Optional Co-op), International College of Manitoba (ICM)",
      amount: "$0.00 CAD",
      student: "Aziffa Baig",
    },
    {
      date: "Jan 13, 2022",
      description:
        "Post-Degree Diploma - Health, Safety, and Environmental Compliance, Langara College (+ 2 items)",
      amount: "$335.00 CAD",
      student: "Malik Umar Farooq Khan",
      id: "81b7f193-db3f-4195-b9e5-700dbc74ac7d",
    },
  ];

  const applyCreditsData = [
    {
      date: "Jan 27, 2023",
      description: "Payment for Order a156242e-9df6-4433-98c9-5fdee59fba32",
      credit: "$95.00 CAD",
      debit: "",
      details: {
        id: "B88C23A-7B97-488A-A2FA-C7C73A5ACE-OPE",
        description: "Payment for Order a156242e-9df6-4433-98c9-5fdee59fba32",
        amount: "$95.00 CAD",
      },
    },
    {
      date: "May 31, 2022",
      description:
        "College Diploma - Early Childhood Education (213), Mohawk College - Fennell - cancellation",
      credit: "$50.00 CAD",
      debit: "",
    },
    {
      date: "Apr 28, 2022",
      description:
        "College Diploma - Early Childhood Education (A003), Northern College - Timmins - cancellation",
      credit: "$50.00 CAD",
      debit: "",
    },
    {
      date: "Apr 20, 2022",
      description:
        "College Diploma - Early Childhood Education (ECE), Seneca College - King Campus - cancellation",
      credit: "$45.00 CAD",
      debit: "",
    },
    {
      date: "Apr 11, 2022",
      description: "Payment for Order bb6353de-9945-11eb-97e5-0276def11d31",
      credit: "$145.00 CAD",
      debit: "",
    },
  ];

  const toggleTransaction = (index) => {
    if (expandedTransaction === index) {
      setExpandedTransaction(null);
    } else {
      setExpandedTransaction(index);
    }
  };

  return (
    <div className="xl:max-w-10xl mx-auto bg-white">
      <div className="border-b border-gray-200 px-4 py-3 flex items-center">
        <PaymentNavbar user={user} />
      </div>

      <div className="px-4">
        <div className="flex border-b">
          <button
            className={`py-4 px-4 ${activeTab === "Purchases"
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("Purchases")}
          >
            Purchases
          </button>
          <button
            className={`py-4 px-4 ${activeTab === "ApplyCredits"
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("ApplyCredits")}
          >
            ApplyCredits
          </button>
        </div>
      </div>
      <div className="p-4">
        {activeTab === "Purchases" && (
          <>
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                  <span className="text-gray-500">$</span>
                </div>
                <div>
                  <div className="font-bold">$0.00</div>
                  <div className="text-gray-500 text-sm">USD</div>
                </div>
                <div className="ml-6">
                  <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                    <span className="text-gray-500">$</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold">$150.00</div>
                  <div className="text-gray-500 text-sm">CAD</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="font-medium">Order History</span>
                  <div className="ml-2 flex items-center text-blue-500 text-sm">
                    <Info className="w-4 h-4 mr-1" />
                    <span>
                      Not finding a transaction? Click here to go to your
                      Archived Transactions
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="relative flex-grow max-w-xs">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search for Student Name / Order ID"
                      className="pl-10 pr-4 py-2 border rounded w-full"
                    />
                  </div>
                  <div className="flex items-center border rounded px-2 py-2">
                    <Calendar className="w-6 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="yyyy-mm-dd"
                      className="w-20 outline-none"
                    />
                  </div>
                  <div className="flex items-center border rounded px-2 py-2">
                    <Calendar className="w-6 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="yyyy-mm-dd"
                      className="w-20 outline-none"
                    />
                  </div>
                  <div className="flex items-center border rounded px-10 py-2">
                    <input
                      type="text"
                      placeholder="Min"
                      className="w-16 outline-none"
                    />
                  </div>
                  <div className="flex items-center border rounded px-10 py-2">
                    <input
                      type="text"
                      placeholder="Max"
                      className="w-16 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="border rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchasesData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600">
                            {item.student}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {item.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <ChevronRight className="ml-auto w-5 h-5 text-gray-400" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "ApplyCredits" && (
          <>
            <div className="mb-6">
              <div className="flex items-center p-4 w-[10rem] bg-gray-50 rounded mb-4">
                <span className="text-sm flex items-center">
                  <Info className="w-4 h-4 text-blue-500 mr-2" />
                  ApplyCredits
                </span>
              </div>

              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                  <span className="text-gray-500">$</span>
                </div>
                <div>
                  <div className="font-bold">$150.00</div>
                  <div className="text-gray-500 text-sm">CAD</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="font-medium">Transaction History</span>
                  <div className="ml-2 flex items-center text-blue-500 text-sm">
                    <Info className="w-4 h-4 mr-1" />
                    <span>
                      Not finding a transaction? Click here to go to your
                      Archived Transactions
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="relative flex-grow max-w-xs">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search for Transaction ID / Description"
                      className="pl-10 pr-4 py-2 border rounded w-full"
                    />
                  </div>
                  <div className="flex items-center border rounded px-2 py-2">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="yyyy-mm-dd"
                      className="w-20 outline-none"
                    />
                  </div>
                  <div className="flex items-center border rounded px-2 py-2">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="yyyy-mm-dd"
                      className="w-20 outline-none"
                    />
                  </div>
                  <div className="border rounded px-2 py-2 flex items-center">
                    <span className="text-gray-500 text-sm mr-2">
                      Select...
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="border rounded px-4 py-2 flex items-center">
                    <span className="text-gray-700">Amount Range</span>
                  </button>
                </div>
              </div>

              <div className="border rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Debit
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applyCreditsData.map((item, index) => (
                      <>
                        <tr
                          key={index}
                          className="hover:bg-gray-50"
                          onClick={() => toggleTransaction(index)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.date}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {item.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.credit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.debit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {expandedTransaction === index ? (
                              <ChevronDown className="ml-auto w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="ml-auto w-5 h-5 text-gray-400" />
                            )}
                          </td>
                        </tr>
                        {expandedTransaction === index && (
                          <tr>
                            <td colSpan="5" className="px-6 py-4 bg-gray-50">
                              <div className="p-4 border rounded bg-white">
                                <div className="font-medium mb-2 text-gray-700">
                                  TRANSACTION DETAILS
                                </div>
                                <div className="text-xs text-gray-500 mb-4">
                                  TRANSACTION ID: {item.details.id}
                                </div>
                                <div className="mb-2">
                                  {item.details.description}
                                </div>
                                <div className="mb-2">
                                  {item.details.amount}
                                </div>
                                <div className="text-blue-500 text-sm">
                                  View your full receipt here
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <button className="bg-blue-600 text-white rounded-full px-4 py-2 flex items-center shadow-lg">
          <span className="mr-2">Help</span>
        </button>
      </div>
    </div>
  );
}
