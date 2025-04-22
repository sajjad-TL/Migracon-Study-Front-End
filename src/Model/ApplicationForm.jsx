import { XCircle } from 'lucide-react';

export default function ApplicationForm({onClose}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl max-h-screen overflow-y-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="px-0 pt-0 pb-2 border-b">
            <h2 className="text-xl font-semibold">Add new student</h2>
          </div>
          <XCircle 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer h-6 w-6" 
          />
        </div>

        <div className="pt-2">
          {/* Personal Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Personal information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="font-semibold mb-1">First name *</label>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  className="border rounded px-3 py-2" 
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="font-semibold mb-1">Last name *</label>
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  className="border rounded px-3 py-2" 
                />
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="middleName" className="font-semibold mb-1">Middle name</label>
              <input 
                id="middleName" 
                name="middleName" 
                type="text" 
                className="border rounded px-3 py-2" 
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="dateOfBirth" className="font-semibold mb-1">Date of birth</label>
              <input 
                id="dateOfBirth" 
                name="dateOfBirth" 
                type="date" 
                className="border rounded px-3 py-2" 
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="citizenOf" className="font-semibold mb-1">Country of citizenship *</label>
              <select 
                id="citizenOf"
                name="citizenOf" 
                className="border bg-blue-100 rounded px-3 py-2" 
              >
                <option value="">Please choose a country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
              </select>
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="passportNumber" className="font-semibold mb-1">Passport number</label>
              <input 
                id="passportNumber" 
                name="passportNumber" 
                type="text" 
                className="border rounded px-3 py-2" 
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="passportExpiryDate" className="font-semibold mb-1">Passport expiry date</label>
              <input 
                id="passportExpiryDate" 
                name="passportExpiryDate" 
                type="date" 
                className="border rounded px-3 py-2" 
              />
            </div>

            <p className="mt-4 font-semibold">Gender</p>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="Male" /> Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="Female" /> Female
              </label>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact information</h3>
            <div className="flex flex-col mt-2">
              <label htmlFor="email" className="font-semibold mb-1">Email *</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                className="border rounded px-3 py-2" 
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="phoneNumber" className="font-semibold mb-1">Phone number *</label>
              <input 
                id="phoneNumber" 
                name="phoneNumber" 
                type="text" 
                className="border rounded px-3 py-2" 
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <div className="flex flex-col mt-4">
              <label htmlFor="status" className="font-semibold mb-1">Status *</label>
              <select 
                id="status"
                name="status" 
                className="border bg-blue-100 rounded px-3 py-2" 
              >
                <option value="">Please choose a status</option>
                <option value="Active">Active</option>
                <option value="In Active">In Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="referralSource" className="font-semibold mb-1">Referral Source</label>
              <select 
                id="referralSource"
                name="referralSource" 
                className="border bg-blue-100 rounded px-3 py-2" 
              >
                <option value="">Choose source</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Friend">Friend</option>
                <option value="Google">Google</option>
              </select>
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="countryOfInterest" className="font-semibold mb-1">Country of interest</label>
              <input 
                id="countryOfInterest" 
                name="countryOfInterest" 
                type="text" 
                className="border rounded px-3 py-2" 
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="serviceOfInterest" className="font-semibold mb-1">Services of interest</label>
              <input 
                id="serviceOfInterest" 
                name="serviceOfInterest" 
                type="text" 
                className="border rounded px-3 py-2" 
              />
            </div>

            <label className="flex items-start gap-2 mt-4">
              <input type="checkbox" name="conditionsAccepted" className="mt-1" />
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
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Add student</button>
          </div>
        </div>
      </div>
    </div>
  );
}