import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const EditStudent = ({ isOpen, onClose, agentData, onStudentUpdated }) => {
  const { user } = useContext(UserContext);
  const agentId = user?.agentId;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: null,
<<<<<<< HEAD
    status: "Pending",
    education: "",
    program: "",
    institute: "",
    startDate: "",
    appStatus: "",
=======
    status: "Pending"
>>>>>>> e828a3f262fe88860362eab7e37457129447bf17
  });

  const [applicationId, setApplicationId] = useState("");

  useEffect(() => {
    if (agentData) {
<<<<<<< HEAD
      const application = agentData.applications?.[0]; // Assuming you want the first application
=======
      console.log("Incoming agentData:", agentData);

>>>>>>> e828a3f262fe88860362eab7e37457129447bf17
      setFormData({
        firstName: agentData.firstName || "",
        lastName: agentData.lastName || "",
        email: agentData.email || "",
        profilePicture: null,
        status: agentData.status || "Pending",
<<<<<<< HEAD
        education: agentData.education || "",
        program: application?.program || "",
        institute: application?.institute || "",
        startDate: application?.startDate?.slice(0, 10) || "",
        appStatus: application?.status || "",
=======
        education: Array.isArray(agentData.education)
          ? agentData.education
          : [
            {
              institute: "",
              degree: "",
              passingYear: "",
            },
          ],
>>>>>>> e828a3f262fe88860362eab7e37457129447bf17
      });
  
      setApplicationId(application?.applicationId || "");
    }
  }, [agentData]);
<<<<<<< HEAD
  
=======


>>>>>>> e828a3f262fe88860362eab7e37457129447bf17
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
    
    // Prepare the payload
    const payload = {
      studentId: agentData._id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      education: formData.education,
      status: formData.status
    };
    
    // Add application data if we have an applicationId
    if (applicationId) {
      payload.updatedApplication = {
        applicationId: applicationId,
        program: formData.program,
        institute: formData.institute,
        startDate: formData.startDate,
        status: formData.appStatus,
      };
    }
    
    console.log("Submitting payload:", payload);

    try {
      const response = await fetch("http://localhost:5000/student/update-student", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
          <h2 className="text-xl font-semibold">Edit Student</h2>
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

<<<<<<< HEAD
          <div>
            <label className="block text-sm font-medium">Education</label>
            <input
              name="education"
              type="text"
              value={formData.education}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
=======
>>>>>>> e828a3f262fe88860362eab7e37457129447bf17

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

          {applicationId && (
            <>
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium">Application Details</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium">Program</label>
                <input
                  name="program"
                  type="text"
                  value={formData.program}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium">Institute</label>
                <input
                  name="institute"
                  type="text"
                  value={formData.institute}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium">Application Status</label>
                <select
                  name="appStatus"
                  value={formData.appStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Withdrawn">Withdrawn</option>
                </select>
              </div>
            </>
          )}

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

<<<<<<< HEAD
export default EditStudent;
=======
export default EditProfileModal;
>>>>>>> e828a3f262fe88860362eab7e37457129447bf17
