import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, QrCode } from "lucide-react";
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Attendance", path: "/attendance" },
    { name: "Generate QR", path: "/generate-qr" },
    { name: "Scan QR", path: "/scan" },
    { name: "Face Attendance", path: "/face" },
    { name: "Register Face", path: "/register-face" },
    { name: "Admin Panel", path: "/admin" }
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-black text-white p-5 flex flex-col justify-between">

      {/* 🔷 Logo */}
      <div>
        <h1 className="text-2xl font-bold mb-10">StudentCheck</h1>

        {/* 🔗 Menu */}
        <ul className="space-y-3">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`block p-2 rounded ${
                  location.pathname === item.path
                    ? "bg-white text-black"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 🚪 Logout */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 p-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}