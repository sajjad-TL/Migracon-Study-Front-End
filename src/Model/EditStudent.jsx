// import React, { useState, useEffect, useContext } from "react";
// import { IoIosClose } from "react-icons/io";
// import "../App.css";
// import { UserContext } from "../context/userContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditStudent = ({ isOpen, onClose, studentData, onStudentUpdated }) => {
//   const [shouldRender, setShouldRender] = useState(isOpen);
//   const { user } = useContext(UserContext);
//   const [formData, setFormData] = useState(studentData || {});

//   useEffect(() => {
//     if (!isOpen) {
//       const timeout = setTimeout(() => setShouldRender(false), 300);
//       return () => clearTimeout(timeout);
//     } else {
//       setShouldRender(true);
//       setFormData(studentData || {});
//       console.log("Student data received:", studentData); // ✅ log
//     }
//   }, [isOpen, studentData]);
  

//   if (!shouldRender) return null;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const requiredFields = [
//       "firstName",
//       "lastName",
//       "email",
//       "phoneNumber",
//       "status",
//       "citizenOf",
//     ];
  
//     const emptyFields = requiredFields.filter((field) => !formData[field]);
  
//     if (emptyFields.length > 0) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }
  
//     if (!formData._id) {
//       toast.error("Student ID is missing.");
//       console.error("Missing _id in formData:", formData);
//       return;
//     }
  
//     try {
//       const response = await fetch("http://localhost:5000/student/update-student", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           studentId: formData._id,  // ✅ Required for backend
//           ...formData,              // ✅ Updated fields
//         }),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         throw new Error(data?.message || "Failed to update student");
//       }
  
//       toast.success("Student updated successfully!");
//       onStudentUpdated(data.student);
//       onClose();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update student!");
//     }
//   };
  

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
//         isOpen ? "bg-black bg-opacity-50 opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div
//         className={`bg-white w-full max-w-2xl max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
//           isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
//         }`}
//       >
//         <div className="flex flex-row justify-between items-center">
//           <div className=" bg-white z-10 px-6 pt-6 pb-2 border-b">
//             <h2 className="text-xl font-semibold">Edit student</h2>
//           </div>
//           <IoIosClose onClick={onClose} className="text-3xl cursor-pointer" />
//         </div>

//         <div className="px-6 pb-6 pt-2">
//           {/* ... SAME FORM FIELDS ... */}
//           {/* Use same form inputs like in StudentForm — keeping JSX same as original, just bind values from formData */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Personal information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col">
//                 <label htmlFor="firstName" className="font-semibold">First name</label>
//                 <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="border rounded px-3 py-2" />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="lastName" className="font-semibold">Last name</label>
//                 <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="border rounded px-3 py-2" />
//               </div>
//             </div>

//             <div className="flex flex-col pt-4">
//               <label htmlFor="middleName" className="font-semibold">Middle name</label>
//               <input id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} type="text" className="border rounded px-3 py-2" />
//             </div>

//             <div className="flex flex-col pt-4">
//               <label htmlFor="dob" className="font-semibold">Date of birth</label>
//               <input id="dob" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" className="border rounded px-3 py-2" />
//             </div>

//             <div className="flex flex-col pt-4">
//               <label htmlFor="citizenOf" className="font-semibold">Country of citizenship *</label>
//               <select name="citizenOf" value={formData.citizenOf} onChange={handleChange} className="border bg-blue-100 rounded px-3 py-2">
//                 <option value="">Please choose a country</option>
//                 <option value="USA">USA</option>
//                 <option value="Canada">Canada</option>
//               </select>
//             </div>

//             <div className="flex flex-col pt-4">
//               <label htmlFor="passportNumber" className="font-semibold">Passport number *</label>
//               <input id="passportNumber" name="passportNumber" value={formData.passportNumber} onChange={handleChange} type="text" className="border rounded px-3 py-2" />
//               <p className="text-sm text-gray-500 mt-1">Passport number is optional, but strongly recommended.</p>
//             </div>

//             <div className="flex flex-col pt-4">
//               <label htmlFor="passportExpiry" className="font-semibold">Passport expiry date</label>
//               <input id="passportExpiry" name="passportExpiryDate" value={formData.passportExpiryDate} onChange={handleChange} type="date" className="border rounded px-3 py-2" />
//             </div>

//             <p className="mt-4 font-semibold">Gender</p>
//             <div className="flex items-center gap-4 pt-2">
//               <label className="flex items-center gap-2">
//                 <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
//               </label>
//               <label className="flex items-center gap-2">
//                 <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
//               </label>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Contact information</h3>
//             <div className="flex flex-col pt-2">
//               <label htmlFor="email" className="font-semibold">Email *</label>
//               <input id="email" name="email" value={formData.email} onChange={handleChange} type="email" className="border rounded px-3 py-2" />
//             </div>

//             <div className="flex flex-col pt-2">
//               <label htmlFor="phone" className="font-semibold">Phone number *</label>
//               <input id="phone" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" className="border rounded px-3 py-2" />
//             </div>
//           </div>

//           {/* Lead Management */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Lead management</h3>
//             <div className="flex flex-col pt-2">
//               <label htmlFor="status" className="font-semibold">Status *</label>
//               <select name="status" value={formData.status} onChange={handleChange} className="border bg-blue-100 rounded px-3 py-2">
//                 <option value="">Please choose a status</option>
//                 <option value="Active">Active</option>
//                 <option value="In Active">In Active</option>
//                 <option value="Pending">Pending</option>
//               </select>
//             </div>

//             <div className="flex flex-col pt-4">
//               <label htmlFor="referral" className="font-semibold">Referral Source</label>
//               <select id="referral" name="referralSource" value={formData.referralSource} onChange={handleChange} className="border bg-blue-100 rounded px-3 py-2">
//                 <option value="">Please choose a referral source</option>
//                 <option value="Facebook">Facebook</option>
//                 <option value="Instagram">Instagram</option>
//               </select>
//             </div>

//             <div className="flex flex-col pt-4">
//               <label htmlFor="interestCountry" className="font-semibold">Country of interest</label>
//               <input type="text" name="countryOfInterest" value={formData.countryOfInterest} onChange={handleChange} placeholder="Country of interest" className="border rounded px-3 py-2 mt-4" />
//             </div>

//             <div className="flex flex-col pt-4">
//               <label htmlFor="services" className="font-semibold">Services of interest</label>
//               <input type="text" name="serviceOfInterest" value={formData.serviceOfInterest} onChange={handleChange} placeholder="Service of interest" className="border rounded px-3 py-2 mt-4" />
//             </div>

//             <label className="flex items-start gap-2 mt-4">
//               <input type="checkbox" name="conditionsAccepted" checked={formData.conditionsAccepted} onChange={handleChange} className="mt-1" />
//               <span className="text-sm text-gray-600">
//                 I confirm that I have received express written consent from the student and I can provide proof of their consent upon request. <a href="#" className="text-blue-600 underline">Learn more</a>.
//               </span>
//             </label>

//             <p className="text-sm mt-4">
//               <span className="text-red-500">*</span> Required information.
//             </p>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4 mt-6">
//             <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
//               Cancel
//             </button>
//             <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
//               Update student
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditStudent;




import React, { useState, useEffect, useContext } from "react";
import { IoIosClose } from "react-icons/io";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const EditStudent = ({ isOpen, onClose, studentData, onStudentUpdated }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(studentData || {
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    citizenOf: '',
    passportNumber: '',
    passportExpiryDate: '',
    gender: '',
    email: '',
    phoneNumber: '',
    status: '',
    referralSource: '',
    countryOfInterest: '',
    serviceOfInterest: '',
    conditionsAccepted: false
  });
  
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setFormData(studentData || {});
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, studentData]);

  if (!shouldRender) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const requiredFields = ["firstName", "lastName", "email", "phoneNumber", "status", "citizenOf"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!formData._id) {
      toast.error("Student ID is missing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/student/update-student", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: formData._id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update student");
      }

      toast.success("Student updated successfully!");
      onStudentUpdated(data.student);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update student!");
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "bg-black bg-opacity-50 opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className={`bg-white w-full max-w-2xl max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">Edit student</h2>
          <IoIosClose onClick={onClose} className="text-3xl cursor-pointer" />
        </div>

        {/* Modal Content */}
        <div className="py-4 space-y-6">

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First name" name="firstName" value={formData.firstName} onChange={handleChange} required />
              <Input label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} required />
              <Input label="Middle name" name="middleName" value={formData.middleName} onChange={handleChange} />
              <Input label="Date of birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" />
            </div>

            <Select label="Country of citizenship *" name="citizenOf" value={formData.citizenOf} onChange={handleChange} required options={["USA", "Canada"]} />

            <Input label="Passport number" name="passportNumber" value={formData.passportNumber} onChange={handleChange} />
            <Input label="Passport expiry date" name="passportExpiryDate" value={formData.passportExpiryDate} onChange={handleChange} type="date" />

            <div className="pt-4">
              <label className="font-semibold block mb-1">Gender</label>
              <div className="flex gap-4">
                <Radio name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
                <Radio name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact information</h3>
            <Input label="Email *" name="email" value={formData.email} onChange={handleChange} type="email" required />
            <Input label="Phone number *" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" required />
          </div>

          {/* Lead Management */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Lead management</h3>
            <Select label="Status *" name="status" value={formData.status} onChange={handleChange} required options={["Active", "In Active", "Pending"]} />
            <Select label="Referral Source" name="referralSource" value={formData.referralSource} onChange={handleChange} options={["Facebook", "Instagram"]} />
            <Input label="Country of interest" name="countryOfInterest" value={formData.countryOfInterest} onChange={handleChange} />
            <Input label="Services of interest" name="serviceOfInterest" value={formData.serviceOfInterest} onChange={handleChange} />

            <label className="flex items-start gap-2 mt-4">
              <input type="checkbox" name="conditionsAccepted" checked={formData.conditionsAccepted} onChange={handleChange} className="mt-1" />
              <span className="text-sm text-gray-600">
                I confirm that I have received express written consent from the student. <a href="#" className="text-blue-600 underline">Learn more</a>.
              </span>
            </label>

            <p className="text-sm mt-4"><span className="text-red-500">*</span> Required information.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Update student</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div className="flex flex-col pt-2">
    <label htmlFor={name} className="font-semibold">{label}</label>
    <input id={name} name={name} value={value || ""} onChange={onChange} type={type} className="border rounded px-3 py-2" required={required} />
  </div>
);

// Reusable Select Component
const Select = ({ label, name, value, onChange, options = [], required = false }) => (
  <div className="flex flex-col pt-2">
    <label htmlFor={name} className="font-semibold">{label}</label>
    <select id={name} name={name} value={value || ""} onChange={onChange} className="border bg-blue-100 rounded px-3 py-2" required={required}>
      <option value="">Please choose</option>
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

// Reusable Radio Button
const Radio = ({ name, value, checked, onChange }) => (
  <label className="flex items-center gap-2">
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
    {value}
  </label>
);

export default EditStudent;
