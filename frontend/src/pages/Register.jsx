import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const nav = useNavigate();

  const [u, su] = useState("");
  const [p, sp] = useState("");
  const [e, se] = useState("");

  const register = async () => {
    try {
      await API.post("/auth/register", {
        username: u,
        password: p
      });

      nav("/login");
    } catch {
      se("User already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Create Account ✨
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
            onClick={register}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>

          {e && <p className="text-red-500 text-sm text-center">{e}</p>}
        </div>

        {/* 🔥 Navigation added */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
