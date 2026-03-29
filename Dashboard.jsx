import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

// 🔌 Socket connection
const socket = io("http://localhost:5000");

export default function Dashboard() {
  const [attendance, setAttendance] = useState([]);

  // 🔄 Fetch + realtime
  useEffect(() => {
    fetchData();

    socket.on("attendanceMarked", (newData) => {
      setAttendance(prev => [...prev, newData]);
    });

    return () => socket.off("attendanceMarked");
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance");
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 📊 Stats
  const total = attendance.length;
  const present = attendance.filter(a => a.status === "present").length;
  const absent = total - present;

  const chartData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent }
  ];

  return (
    <div>

      {/* 🔥 PREMIUM STAT CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow">
          <h3 className="text-gray-300">Total Records</h3>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-green-500/20 p-6 rounded-xl shadow">
          <h3 className="text-green-300">Present</h3>
          <p className="text-3xl font-bold text-green-400">{present}</p>
        </div>

        <div className="bg-red-500/20 p-6 rounded-xl shadow">
          <h3 className="text-red-300">Absent</h3>
          <p className="text-3xl font-bold text-red-400">{absent}</p>
        </div>

      </div>

      {/* 📊 CHARTS */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* PIE CHART */}
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl shadow flex flex-col items-center">
          <h2 className="mb-4 font-semibold text-gray-200">
            Attendance Distribution
          </h2>

          <PieChart width={300} height={250}>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={80}
              label
            >
              <Cell fill="#22c55e" />
              <Cell fill="#ef4444" />
            </Pie>
          </PieChart>
        </div>

        {/* BAR CHART */}
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl shadow flex flex-col items-center">
          <h2 className="mb-4 font-semibold text-gray-200">
            Attendance Overview
          </h2>

          <BarChart width={300} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </div>

      </div>

      {/* 📋 TABLE */}
      <div className="bg-white/10 backdrop-blur-lg p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">
          Attendance Records
        </h2>

        <table className="w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-2 border border-gray-700">Student ID</th>
              <th className="p-2 border border-gray-700">Status</th>
              <th className="p-2 border border-gray-700">Date</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length > 0 ? (
              attendance.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border border-gray-700">
                    {item.studentId}
                  </td>

                  <td className="p-2 border border-gray-700 text-green-400">
                    {item.status}
                  </td>

                  <td className="p-2 border border-gray-700 text-gray-300">
                    {new Date(item.date).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </div>
  );
}