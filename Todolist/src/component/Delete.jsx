import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Delete() {
  const [students, setStudents] = useState([]);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("https://localhost:7056/api/student");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle delete
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:7056/api/student/${id}`);
      alert("✅ Student deleted successfully!");
      fetchStudents(); // Refresh the list
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed!");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Delete Students</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">ID</th>
              <th className="text-left py-2 px-4 border-b">Name</th>
              <th className="text-left py-2 px-4 border-b">Address</th>
              <th className="text-center py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{student.id}</td>
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.address}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleDelete(student.id, student.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
