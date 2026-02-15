import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

export default function Navbar() {
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <div className="bg-slate-900 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold">DashCraft</h1>

      <button
        onClick={handleLogout}
        className="text-sm bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
