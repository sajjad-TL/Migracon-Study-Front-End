import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Search,
  ChevronDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import ProgramsNavbar from "../layouts/ProgramsNavbar";
import { UserContext } from "../context/userContext";

export default function ProgramSchool() {
  const [programs, setPrograms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 3;

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/programs/all");
        setPrograms(response.data.programs || []);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter((program) =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * programsPerPage,
    currentPage * programsPerPage
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <ProgramsNavbar user={user} />

      <div className="mx-auto p-4">
        {/* Search + Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="What would you like to study?"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {["Program level", "Field of study", "Intakes", "Destination", "Institution"].map(
              (label, idx) => (
                <div key={idx} className="relative">
                  <select className="w-full p-2 border rounded-md appearance-none">
                    <option>{label}</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-3 text-gray-400"
                    size={16}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Programs List */}
        <div className="bg-white shadow-sm rounded-md p-4 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="text-sm text-gray-600">{filteredPrograms.length} programs found</div>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort</span>
                <select className="w-40 p-1 pr-6 border rounded-md text-sm">
                  <option>Relevance</option>
                </select>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2">Compare</span>
                <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                  <div
                    className={`w-5 h-5 rounded-full absolute top-0 ${compareMode ? "bg-blue-600 right-0" : "bg-white left-0"} shadow`}
                    onClick={() => setCompareMode(!compareMode)}
                  ></div>
                </div>
              </div>
            </div>

            <button className="flex items-center text-sm border rounded-md px-3 py-1">
              <Filter size={14} className="mr-1" />
              Student eligibility filters
            </button>
          </div>

          {/* Display Paginated Programs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {paginatedPrograms.length > 0 ? (
              paginatedPrograms.map((program, index) => (
                <div key={index} className="bg-white rounded-lg border overflow-hidden">
                  <div className="p-2 border-b">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-teal-800 rounded-md flex items-center justify-center text-white mr-2">
                          {program.school?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">
                            {program.school?.name || "Unknown Institution"}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {program.school?.city}, {program.school?.country}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h2 className="text-base font-medium mb-0.5">{program.name}</h2>
                    <p className="text-xs text-gray-600">{program.duration}</p>
                  </div>

                  <div className="p-2 border-b grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Tuition (1st year)</p>
                      <p className="font-medium text-sm">${program.tuitionFee || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Application fee</p>
                      <p className="font-medium text-sm">-</p>
                    </div>
                  </div>

                  <div className="p-2 border-b">
                    <p className="text-xs text-gray-500 mb-0.5">Success prediction</p>
                    <span className="font-medium text-sm text-green-600">Very High</span>
                  </div>

                  <div className="p-2 border-b">
                    <span className="text-xs text-gray-600">
                      {program.applicationDeadline
                        ? new Date(program.applicationDeadline).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="p-2">
                    <button className="w-full bg-blue-600 text-white py-1.5 text-sm rounded hover:bg-blue-700">
                      Create application
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No programs found.</div>
            )}
          </div>

          {/* Pagination */}
          {filteredPrograms.length > programsPerPage && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1 px-3 border rounded disabled:opacity-50"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1 px-3 border rounded disabled:opacity-50"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Floating Help Button */}
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
