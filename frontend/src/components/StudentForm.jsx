import { useState } from "react";
import API from "../services/api";

export default function StudentForm({ onClose, onSuccess }) {
  const [n, sn] = useState("");
  const [m, sm] = useState("");

  const save = async () => {
    if (!n || !m) return;

    await API.post("/students", {
      name: n,
      marks: Number(m)
    });

    onSuccess(); // refresh table
    onClose();   // close modal
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-2xl shadow-2xl p-6 animate-fadeIn">

        <h2 className="text-xl font-semibold mb-5 text-gray-800">
          Add Student
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Student name"
            value={n}
            onChange={e => sn(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            placeholder="Marks"
            value={m}
            onChange={e => sm(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
