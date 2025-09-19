import React, { useState } from "react";
import axios from "axios";

export default function Create() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
     
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔹 Use correct API endpoint (controller is StudentsController → /api/students)
      await axios.post("https://localhost:7056/api/student",/*formData*/ {
        id: formData.id,
        name: formData.name,
        address: formData.address,
      });

      alert("✅ Student created successfully!");
      setFormData({ id: "", name: "", address: "" });
    } catch (error) {
      console.error("❌ Error creating student:", error);
      alert("Failed to create student. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Create Student
        </h2>

{/* ID Field */}
<div className="mb-3">
  <label className="block text-gray-700 font-medium mb-1">ID</label>
  <input
    type="number"
    name="id"
    value={formData.id}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
    placeholder="Enter ID"
    required
  />
</div>

{/* Name Field */}
<div className="mb-3">
  <label className="block text-gray-700 font-medium mb-1">Name</label>
  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
    placeholder="Enter Name"
    required
  />
</div>

{/* Address Field */}
<div className="mb-3">
  <label className="block text-gray-700 font-medium mb-1">Address</label>
  <input
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
    placeholder="Enter Address"
    required
  />
</div>


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Save Student
        </button>
      </form>
    </div>
  );
}
