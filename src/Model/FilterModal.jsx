import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const FilterModal = ({ isOpen, onClose, selectedFilters = [], setSelectedFilters }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [localFilters, setLocalFilters] = useState({});

  useEffect(() => {
    if (Array.isArray(selectedFilters)) {
      const filterObj = selectedFilters.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setLocalFilters(filterObj);
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    } else {
      setShouldRender(true);
    }
  }, [isOpen]);

  const handleCheckboxChange = (field) => {
    setLocalFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [field]: !prev[field],
      };

      // Automatically apply filters when a checkbox is changed
      const selected = Object.entries(updatedFilters)
        .filter(([_, checked]) => checked)
        .map(([field]) => field);
      setSelectedFilters(selected);

      return updatedFilters;
    });
  };

  const handleOutsideClick = (event) => {
    // Check if the click is outside the modal content
    if (event.target.classList.contains("modal-overlay")) {
      onClose(); // Close the modal if click outside
    }
  };

  // Define fields for checkbox-based filtering
  const filterFields = [
    "Active", "Pending", "In Active", // Status filter options
    "student", "firstName", "lastName", "id", "email" // Other fields you want to filter
  ];

  if (!shouldRender) return null;

  return (
    <div
      className={`modal-overlay fixed inset-0 z-50 flex items-start justify-start transition-opacity duration-300 ${
        isOpen ? "bg-black bg-opacity-50 opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOutsideClick} // Handle click outside the modal
    >
      <div
        className={`bg-white w-full max-w-md max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the overlay
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Filter</h2>
          <IoIosClose onClick={onClose} className="text-3xl cursor-pointer" />
        </div>

        <div className="space-y-4">
          {filterFields.map((field) => (
            <div key={field} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={field}
                checked={localFilters[field] || false}
                onChange={() => handleCheckboxChange(field)}
                className="accent-blue-600 w-5 h-5"
              />
              <label htmlFor={field} className="text-gray-700 font-medium">
                {field.replace(/([A-Z])/g, " $1").toUpperCase()} {/* Capitalize field names */}
              </label>
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
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
