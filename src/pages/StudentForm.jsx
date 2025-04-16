import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // ⬅️ Step 1: Import this
import "../App.css";

const StudentForm = () => {
    const [isOpen, setIsOpen] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const navigate = useNavigate(); // ⬅️ Step 2

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
        navigate("/students"); // ⬅️ Step 3: Redirect to student page
      }, 300); // Should match transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen, navigate]);

  if (!shouldRender) return null;
  return (
    <div
    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
      isOpen
        ? ""
        : ""
    }`}
  >
  
  <div className="bg-white w-full max-w-2xl max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 p-6 rounded-lg shadow-lg">
        <div className="flex flex-row justify-between items-center">
          <div className=" bg-white z-10 px-6 pt-6 pb-2 border-b">
            <h2 className="text-xl font-semibold">Add new student</h2>
          </div>
          <IoIosClose
            onClick={() => setIsOpen(false)} // ⬅️ Close & redirect handled in useEffect
            className="text-3xl cursor-pointer"
          />
        </div>

        <div className="px-6 pb-6 pt-2">
          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Personal information</h3>
            <button className="mb-3 px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded flex items-center hover:bg-blue-200 transition">
              <span className="mr-2">🔍</span> Autofill with passport
            </button>
            <p className="text-sm text-gray-500 mb-4">
              Auto-complete this section by uploading the student’s passport. This is optional, but strongly recommended.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="font-semibold">First name</label>
                <input id="firstName" type="text" className="border rounded px-3 py-2" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="font-semibold">Last name</label>
                <input id="lastName" type="text" className="border rounded px-3 py-2" />
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="middleName" className="font-semibold">Middle name</label>
              <input id="middleName" type="text" className="border rounded px-3 py-2" />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="dob" className="font-semibold">Date of birth</label>
              <input id="dob" type="date" className="border rounded px-3 py-2" />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="citizenship" className="font-semibold">Country of citizenship *</label>
              <select id="citizenship" className="border bg-blue-100 rounded px-3 py-2">
                <option>Please choose a country</option>
              </select>
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="passportNumber" className="font-semibold">Passport number *</label>
              <input id="passportNumber" type="text" className="border rounded px-3 py-2" />
              <p className="text-sm text-gray-500 mt-1">Passport number is optional, but strongly recommended.</p>
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="passportExpiry" className="font-semibold">Passport expiry date</label>
              <input id="passportExpiry" type="date" className="border rounded px-3 py-2" />
            </div>

            <p className="mt-4 font-semibold">Gender</p>
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" /> Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" /> Female
              </label>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact information</h3>
            <div className="flex flex-col pt-2">
              <label htmlFor="email" className="font-semibold">Email *</label>
              <input id="email" type="email" className="border rounded px-3 py-2" />
              <p className="text-sm text-gray-500 mt-1">
                Please provide a valid and actively monitored email address for the student.
              </p>
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="phone" className="font-semibold">Phone number *</label>
              <input id="phone" type="tel" className="border rounded px-3 py-2" />
            </div>
          </div>

          {/* Lead Management */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Lead management</h3>
            <div className="flex flex-col pt-2">
              <label htmlFor="status" className="font-semibold">Status *</label>
              <select id="status" className="border bg-blue-100 rounded px-3 py-2">
                <option>Please choose a status</option>
              </select>
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="referral" className="font-semibold">Referral Source</label>
              <select id="referral" className="border bg-blue-100 rounded px-3 py-2">
                <option>Please choose a referral source</option>
              </select>
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="interestCountry" className="font-semibold">Country of interest</label>
              <select id="interestCountry" className="border rounded px-3 py-2">
                <option>🔍</option>
              </select>
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="services" className="font-semibold">Services of interest</label>
              <select id="services" className="border rounded px-3 py-2 mt-1">
                <option>🔍</option>
              </select>
            </div>

            <label className="flex items-start gap-2 mt-4">
              <input type="checkbox" className="mt-1" />
              <span className="text-sm text-gray-600">
                I confirm that I have received express written consent from the student and I can provide proof of their consent upon request. <a href="#" className="text-blue-600 underline">Learn more</a>.
              </span>
            </label>

            <p className="text-sm mt-4">
              <span className="text-red-500">*</span> Required information.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Add student</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
