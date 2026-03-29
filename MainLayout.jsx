import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">

        <Navbar />

        <div className="mt-6">
          {children}
        </div>

      </div>

    </div>
  );
}