import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const nav = useNavigate();

  const [u, su] = useState("");
  const [p, sp] = useState("");
  const [e, se] = useState("");

  const handleLogin = async () => {
    try {
      await login(u, p);
      nav("/dashboard");
    } catch {
      se("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          DashCraft
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Username"
            value={u}
            onChange={e => su(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={p}
            onChange={e => sp(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>

          {e && <p className="text-red-500 text-sm text-center">{e}</p>}
        </div>

        {/* 🔥 Navigation added */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
