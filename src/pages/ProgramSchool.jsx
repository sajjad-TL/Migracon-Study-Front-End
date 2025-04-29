import { useState, useContext } from "react";
import {
  Search,
  ChevronDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import ProgramsNavbar from "../layouts/ProgramsNavbar";
import { UserContext } from "../context/userContext";

export default function ProgramSchool() {
  const [programs] = useState([
    {
      university: "University of Toronto",
      location: "Toronto, Canada",
      program: "Computer Science",
      duration: "4-Year Bachelor's Degree",
      tuition: "$45,900 CAD",
      applicationFee: "$180 CAD",
      successRate: "Very High",
      popular: true,
      highDemand: false,
      intakes: ["Sep 2024", "Jan 2025", "May 2025"],
    },
    {
      university: "McGill University",
      location: "Montreal, Canada",
      program: "Business Administration",
      duration: "4-Year Bachelor's Degree",
      tuition: "$41,500 CAD",
      applicationFee: "$150 CAD",
      successRate: "High",
      popular: false,
      highDemand: true,
      intakes: ["Sep 2024", "Jan 2025"],
    },
    {
      university: "University of British Columbia",
      location: "Vancouver, Canada",
      program: "Engineering",
      duration: "4-Year Bachelor's Degree",
      tuition: "$48,800 CAD",
      applicationFee: "$170 CAD",
      successRate: "Very High",
      popular: true,
      highDemand: false,
      intakes: ["Sep 2024", "Jan 2025", "May 2025"],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ProgramsNavbar user={user} />

      <div className=" mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="What would you like to study?"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            <div className="relative">
              <select className="w-full p-2 border rounded-md appearance-none">
                <option>Program level</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-gray-400"
                size={16}
              />
            </div>

            <div className="relative">
              <select className="w-full p-2 border rounded-md appearance-none">
                <option>Field of study</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-gray-400"
                size={16}
              />
            </div>

            <div className="relative">
              <select className="w-full p-2 border rounded-md appearance-none">
                <option>Intakes</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-gray-400"
                size={16}
              />
            </div>

            <div className="relative">
              <select className="w-full p-2 border rounded-md appearance-none">
                <option>Destination</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-gray-400"
                size={16}
              />
            </div>

            <div className="relative">
              <select className="w-full p-2 border rounded-md appearance-none">
                <option>Institution</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-gray-400"
                size={16}
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-md p-4  mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="text-sm text-gray-600">2000+ programs found</div>

              <div className="flex items-center">
                <span className="text-sm mr-2">Sort</span>
                <div className="relative">
                  <select className="w-40 p-1 pr-6 border rounded-md text-sm appearance-none">
                    <option>Relevance</option>
                  </select>
                  <ChevronDown
                    className="absolute right-1 top-2 text-gray-400"
                    size={12}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm mr-2">Compare</span>
                <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                  <div
                    className={`w-5 h-5 rounded-full absolute top-0 ${
                      compareMode ? "bg-blue-600 right-0" : "bg-white left-0"
                    } shadow`}
                    onClick={() => setCompareMode(!compareMode)}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center text-sm border rounded-md px-3 py-1">
                <Filter size={14} className="mr-1" />
                Student eligibility filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border overflow-hidden"
              >
                <div className="p-2 border-b">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-teal-800 rounded-md flex items-center justify-center text-white mr-2">
                        {program.university.substring(0, 1)}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">
                          {program.university}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {program.location}
                        </p>
                      </div>
                    </div>

                    {program.popular && (
                      <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                        Popular
                      </span>
                    )}

                    {program.highDemand && (
                      <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                        High Demand
                      </span>
                    )}
                  </div>

                  <h2 className="text-base font-medium mb-0.5">
                    {program.program}
                  </h2>
                  <p className="text-xs text-gray-600">{program.duration}</p>
                </div>

                <div className="p-2 border-b grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Tuition (1st year)</p>
                    <p className="font-medium text-sm">{program.tuition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Application fee</p>
                    <p className="font-medium text-sm">
                      {program.applicationFee}
                    </p>
                  </div>
                </div>

                <div className="p-2 border-b">
                  <p className="text-xs text-gray-500 mb-0.5">
                    Success prediction
                  </p>
                  <div className="flex items-center">
                    <span
                      className={`font-medium text-sm ${
                        program.successRate === "Very High"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {program.successRate}
                    </span>
                  </div>
                </div>

                <div className="p-2 border-b">
                  <div className="flex space-x-2">
                    {program.intakes.map((intake, i) => (
                      <span key={i} className="text-xs text-gray-600">
                        {intake}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2">
                  <button className="w-full bg-blue-600 text-white py-1.5 text-sm rounded hover:bg-blue-700">
                    Create application
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <span className="text-xs mr-1">Items per page</span>
              <div className="relative">
                <select className="p-0.5 pr-5 border rounded text-xs appearance-none">
                  <option>12</option>
                </select>
                <ChevronDown
                  className="absolute right-1 top-1.5 text-gray-400"
                  size={10}
                />
              </div>
            </div>

            <div className="text-xs">1 - 12 of 2000+ items</div>

            <div className="flex space-x-1">
              <button className="p-0.5 border rounded">
                <ChevronLeft size={14} />
              </button>
              <button className="p-0.5 border rounded">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="fixed bottom-4 right-4">
            <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
              <HelpCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
