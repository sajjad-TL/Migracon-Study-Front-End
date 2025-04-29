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

  const [localFilters, setLocalFilters] = useState(() => {
    const initialFilters = {};
    ["Active", "Pending", "In Active"].forEach((status) => {
      initialFilters[status] = selectedFilters.includes(status);
    });
    return initialFilters;
  });

  const [localInputValues, setLocalInputValues] = useState(() => ({
    ...filterValues,
  }));

  useEffect(() => {
    if (isOpen) {
      const initialFilters = {};
      ["Active", "Pending", "In Active"].forEach((status) => {
        initialFilters[status] = selectedFilters.includes(status);
      });
      setLocalFilters(initialFilters);
      setLocalInputValues({ ...filterValues });
    }
  }, [isOpen, selectedFilters, filterValues]);

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
    setLocalFilters((prev) => {
      const updated = { ...prev, [field]: !prev[field] };
      const selected = Object.entries(updated)
        .filter(([_, checked]) => checked)
        .map(([field]) => field);
      setSelectedFilters(selected);
      return updated;
    });
  };

  const handleInputChange = (field, value) => {
    const updatedInputs = { ...localInputValues, [field]: value };
    setLocalInputValues(updatedInputs);

    if (value.trim() !== "") {
      setFilterValues({ ...filterValues, [field]: value });
      if (!selectedFilters.includes(field)) {
        setSelectedFilters([...selectedFilters, field]);
      }
    } else {
      const updatedSelected = selectedFilters.filter((f) => f !== field);
      const updatedFilterValues = { ...filterValues };
      delete updatedFilterValues[field];
      setFilterValues(updatedFilterValues);
      setSelectedFilters(updatedSelected);
    }
  };


  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`modal-overlay fixed inset-0 z-50 flex items-start justify-start transition-opacity duration-300 ${isOpen
        ? "bg-black bg-opacity-50 opacity-100"
        : "opacity-0 pointer-events-none"
        }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-white w-full max-w-md h-[80rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 p-6 shadow-lg transform transition-transform duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Filter</h2>
          <IoIosClose onClick={onClose} className="text-3xl cursor-pointer" />
        </div>

        <div className="space-y-4">
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


      </div>
    </div>
  );
};

export default FilterModal;
