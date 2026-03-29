import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layout/MainLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import GenerateQR from "./pages/GenerateQR";
import ScanQR from "./pages/ScanQR";
import Admin from "./pages/Admin";
import FaceAttendance from "./pages/FaceAttendance";
import FaceRegister from "./pages/FaceRegister";

// 🔐 Protected Route
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        } />

        {/* Attendance */}
        <Route path="/attendance" element={
          <PrivateRoute>
            <MainLayout>
              <Attendance />
            </MainLayout>
          </PrivateRoute>
        } />

        {/* QR */}
        <Route path="/generate-qr" element={
          <PrivateRoute>
            <MainLayout>
              <GenerateQR />
            </MainLayout>
          </PrivateRoute>
        } />

        <Route path="/scan" element={
          <PrivateRoute>
            <MainLayout>
              <ScanQR />
            </MainLayout>
          </PrivateRoute>
        } />

        {/* Face */}
        <Route path="/face" element={
          <PrivateRoute>
            <MainLayout>
              <FaceAttendance />
            </MainLayout>
          </PrivateRoute>
        } />

        {/* Face Register */}
        <Route path="/register-face" element={
          <PrivateRoute>
            <MainLayout>
              <FaceRegister />
            </MainLayout>
          </PrivateRoute>
        } />

        {/* Admin */}
        <Route path="/admin" element={
          <PrivateRoute>
            <MainLayout>
              <Admin />
            </MainLayout>
          </PrivateRoute>
        } />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}