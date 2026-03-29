import { useState } from "react";
import axios from "axios";

export default function Attendance() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const markAttendance = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:5000/api/attendance/mark", {
        studentId: user._id
      });

      setMessage("✅ Attendance marked successfully");

    } catch (err) {
      setMessage("❌ Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">

      <h1 className="text-xl font-bold mb-4 text-center">
        Mark Attendance
      </h1>

      <button
        onClick={markAttendance}
        disabled={loading}
        className={`w-full p-3 rounded text-white ${
          loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Processing..." : "Mark Attendance"}
      </button>

      {message && (
        <p className="mt-4 text-center font-semibold">
          {message}
        </p>
      )}

    </div>
  );
}