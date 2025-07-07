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

  const [levels, setLevels] = useState([]);
  const [fields, setFields] = useState([]);
  const [intakes, setIntakes] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [institutions, setInstitutions] = useState([]);
const [sortOption, setSortOption] = useState("relevance");

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedIntake, setSelectedIntake] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/programs/all");
        const data = response.data.programs || [];

        setPrograms(data);

        setLevels([...new Set(data.map((p) => p.level).filter(Boolean))]);
        setFields([...new Set(data.map((p) => p.fieldOfStudy).filter(Boolean))]);
        setIntakes([...new Set(data.map((p) => p.intake).filter(Boolean))]);
        setDestinations([...new Set(data.map((p) => p.school?.country).filter(Boolean))]);
        setInstitutions([...new Set(data.map((p) => p.school?.name).filter(Boolean))]);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter((program) => {
    const matchSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchLevel = selectedLevel ? program.level === selectedLevel : true;
    const matchField = selectedField ? program.fieldOfStudy === selectedField : true;
    const matchIntake = selectedIntake ? program.intake === selectedIntake : true;
    const matchDestination = selectedDestination
      ? program.school?.country === selectedDestination
      : true;
    const matchInstitution = selectedInstitution
      ? program.school?.name === selectedInstitution
      : true;

    return matchSearch && matchLevel && matchField && matchIntake && matchDestination && matchInstitution;
  });

  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
  switch (sortOption) {
    case "nameAsc":
      return a.name.localeCompare(b.name);
    case "nameDesc":
      return b.name.localeCompare(a.name);
    case "tuitionLowHigh":
      return (a.tuitionFee || 0) - (b.tuitionFee || 0);
    case "tuitionHighLow":
      return (b.tuitionFee || 0) - (a.tuitionFee || 0);
    default:
      return 0; // relevance (default order)
  }
});

const paginatedPrograms = sortedPrograms.slice(
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
                setCurrentPage(1);
              }}
            />
          </div>

         

          {showFilters && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Program Level */}
              <div>
                <label className="text-xs text-gray-600">Program Level</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All</option>
                  {levels.map((level, idx) => (
                    <option key={idx} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field of Study */}
              <div>
                <label className="text-xs text-gray-600">Field of Study</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedField}
                  onChange={(e) => {
                    setSelectedField(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All</option>
                  {fields.map((field, idx) => (
                    <option key={idx} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
              </div>

              {/* Intakes */}
              <div>
                <label className="text-xs text-gray-600">Intake</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedIntake}
                  onChange={(e) => {
                    setSelectedIntake(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All</option>
                  {intakes.map((intake, idx) => (
                    <option key={idx} value={intake}>
                      {intake}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className="text-xs text-gray-600">Destination</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedDestination}
                  onChange={(e) => {
                    setSelectedDestination(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All</option>
                  {destinations.map((dest, idx) => (
                    <option key={idx} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Institution */}
              <div>
                <label className="text-xs text-gray-600">Institution</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedInstitution}
                  onChange={(e) => {
                    setSelectedInstitution(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All</option>
                  {institutions.map((inst, idx) => (
                    <option key={idx} value={inst}>
                      {inst}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {showFilters && (
            <div className="mt-2">
              <button
                onClick={() => {
                  setSelectedLevel("");
                  setSelectedField("");
                  setSelectedIntake("");
                  setSelectedDestination("");
                  setSelectedInstitution("");
                  setCurrentPage(1);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Programs List */}
        <div className="bg-white shadow-sm rounded-md p-4 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="text-sm text-gray-600">
                {filteredPrograms.length} programs found
              </div>
             <div className="flex items-center gap-4">
  {/* Sort Dropdown */}
  <div className="flex items-center">
    <span className="text-sm mr-2">Sort</span>
    <select
      className="w-40 p-1 pr-6 border rounded-md text-sm"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="relevance">Relevance</option>
      <option value="nameAsc">Program Name (A-Z)</option>
      <option value="nameDesc">Program Name (Z-A)</option>
      <option value="tuitionLowHigh">Tuition Low → High</option>
      <option value="tuitionHighLow">Tuition High → Low</option>
    </select>
  </div>

  {/* Compare Toggle */}
  <div className="flex items-center">
    <span className="text-sm mr-2">Compare</span>
    <div
      className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer"
      onClick={() => setCompareMode(!compareMode)}
    >
      <div
        className={`w-5 h-5 rounded-full absolute top-0 transition-all duration-200 ${
          compareMode ? "bg-blue-600 right-0" : "bg-white left-0"
        } shadow`}
      ></div>
    </div>
  </div>
</div>

            </div>

             <div className="flex justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm border rounded-md px-3 py-1"
            >
              <Filter size={14} className="mr-1" />
              Student eligibility filters
            </button>
          </div>
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
