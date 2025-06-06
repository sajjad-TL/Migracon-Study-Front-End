import React, { useState, useEffect } from "react";

const EditProfileModal = ({ isOpen, onClose, agentData, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState(null); // ✅ Added state for preview

  useEffect(() => {
    if (agentData) {
      setFormData({
        firstName: agentData.firstName || "",
        lastName: agentData.lastName || "",
        email: agentData.email || "",
        phone: agentData.phone || "",
        password: "",
        profilePicture: null,
      });

      // Reset preview image
      setPreviewImage(null);
    }
  }, [agentData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture" && files && files[0]) {
      const file = files[0];
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, profilePicture: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 opacity-100 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Profile Photo</label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded border"
              />
            )}
            <input
              name="profilePicture"
              type="file"
              onChange={handleChange}
              className="mt-1 block w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
            <label className="block text-sm font-medium">Mobile</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                handleChange({ target: { name: "phone", value: onlyNumbers } });
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
