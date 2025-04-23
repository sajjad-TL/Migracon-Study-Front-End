import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose, agentData, onStudentUpdated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePicture: null
  });

  useEffect(() => {
    if (agentData) {
      setFormData({
        firstName: agentData.firstName || "",
        lastName: agentData.lastName || "",
        email: agentData.email || "",
        phone: agentData.phone || "",
        profilePicture: null,
        status: agentData.status || "Pending",
      });
    }
  }, [agentData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/student/update-student", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: agentData._id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          status: formData.status,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update student.");
      }

      const result = await response.json();

      toast.success("Student updated successfully!");

      if (onStudentUpdated) {
        onStudentUpdated(result.student);
      }

      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed: " + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl font-bold">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Profile Photo</label>
            <input
              name="profilePicture"
              type="file"
              onChange={handleChange}
              className="mt-1 block w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="Active">Active</option>
              <option value="In Active">In Active</option>
              <option value="Pending">Pending</option>
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium">Mobile</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
