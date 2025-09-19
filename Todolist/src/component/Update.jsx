import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Update() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    name: "",
    address: "",
  });

  // Fetch students to show in dropdown/table
  useEffect(() => {
    axios.get("https://localhost:7056/api/student")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setSelectedStudent({ 
      ...selectedStudent, 
      [e.target.name]: e.target.value 
    });
  };

  // Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7056/api/student/${selectedStudent.id}`,
        selectedStudent
      );
      alert("✅ Student updated successfully!");
      // Refresh the list
      const res = await axios.get("https://localhost:7056/api/student");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Update failed!");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Student</h1>

      {/* Select student to update */}
      <select
        className="w-full border rounded p-2 mb-4"
        value={selectedStudent.id}
        onChange={(e) => {
          const student = students.find(s => s.id === parseInt(e.target.value));
          setSelectedStudent(student || { id: "", name: "", address: "" });
        }}
      >
        <option value="">Select Student BY Id</option>
        {students.map(student => (
          <option key={student.id} value={student.id}>
            {student.id}-{student.name}
          </option>
        ))}
      </select>

      {/* Update form */}

  <form onSubmit={handleSubmit} className="space-y-4">
    
      {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={selectedStudent.name || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={selectedStudent.address || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}

