import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    await axios.post("http://localhost:5000/api/users/add", {
      name,
      email,
      password: "123456",
      role: "student"
    });

    setName("");
    setEmail("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div>

      {/* ➕ ADD USER */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="mb-4 font-semibold">Add Student</h2>

        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="border p-2 mr-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      {/* 📋 USERS TABLE */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="mb-4 font-semibold">All Students</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}