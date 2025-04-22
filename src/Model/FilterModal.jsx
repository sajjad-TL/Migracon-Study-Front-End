import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const FilterModal = ({
  isOpen,
  onClose,
  selectedFilters = [],
  setSelectedFilters,
  filterValues = {},
  setFilterValues,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [localFilters, setLocalFilters] = useState({});
  const [localInputValues, setLocalInputValues] = useState({});

  const checkboxFilters = ["Active", "Pending", "In Active"];
  const inputFields = ["id", "student", "firstName", "lastName", "email"];

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    } else {
      setShouldRender(true);
    }
  }, [isOpen]);

  const handleCheckboxChange = (field) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (field, value) => {
    setLocalInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    const checkboxSelected = Object.entries(localFilters)
      .filter(([_, checked]) => checked)
      .map(([field]) => field);

    const inputSelected = Object.entries(localInputValues)
      .filter(([_, value]) => value.trim() !== "")
      .map(([field]) => field);

    const allSelected = [...new Set([...checkboxSelected, ...inputSelected])];

    setSelectedFilters(allSelected);
    setFilterValues(localInputValues);
    onClose();
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`modal-overlay fixed inset-0 z-50 flex items-start justify-start transition-opacity duration-300 ${
        isOpen ? "bg-black bg-opacity-50 opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-white w-full max-w-md max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Filter</h2>
          <IoIosClose onClick={onClose} className="text-3xl cursor-pointer" />
        </div>

        <div className="space-y-4">
          {/* Checkbox Filters */}
          {checkboxFilters.map((field) => (
            <div key={field} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={field}
                checked={localFilters[field] || false}
                onChange={() => handleCheckboxChange(field)}
                className="accent-blue-600 w-5 h-5"
              />
              <label htmlFor={field} className="text-gray-700 font-medium">
                {field}
              </label>
            </div>
          ))}

          {/* Input Filters */}
          {inputFields.map((field) => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="text-sm text-gray-600 mb-1">
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                type="text"
                id={field}
                value={localInputValues[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="border px-3 py-2 rounded-md text-sm"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
