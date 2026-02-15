import { useEffect, useState, useMemo } from "react";
import API from "../services/api";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const nav = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(0);
  const size = 5;

  const [toast, setToast] = useState(null);


  /* ================= TOAST ================= */
  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };


  /* ================= FETCH ================= */
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const r = await API.get(`/students?page=${page}&size=${size}`);

      setStudents(r.data.data.content);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);


  /* ================= PROFESSIONAL NAME SEARCH ONLY ================= */

  // smooth typing (debounce)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(t);
  }, [search]);

  // name only filter
  const filtered = useMemo(() => {
    if (!debouncedSearch) return students;

    return students.filter(s =>
      s.name.toLowerCase().includes(debouncedSearch)
    );
  }, [students, debouncedSearch]);


  /* ================= CRUD ================= */

  const addStudent = async () => {
    await API.post("/students", { name, marks });
    closeModal();
    notify("Student Added ✔");
    fetchStudents();
  };

  const updateStudent = async () => {
    await API.put(`/students/${editId}`, { name, marks });
    closeModal();
    notify("Student Updated ✔");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await API.delete(`/students/${id}`);
    notify("Deleted ✔");
    fetchStudents();
  };


  /* ================= HELPERS ================= */

  const openAdd = () => {
    setEditId(null);
    setName("");
    setMarks("");
    setShow(true);
  };

  const openEdit = (s) => {
    setEditId(s.id);
    setName(s.name);
    setMarks(s.marks);
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const handleLogout = () => {
    logout();
    nav("/login");
  };


  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">

      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-xl">
          {toast}
        </div>
      )}

      <div className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b shadow-sm px-10 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">DashCraft</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Logout
        </button>
      </div>



      <div className="p-10 max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="flex justify-between mb-6">

            <input
              placeholder="Search student..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border p-3 rounded-xl w-72 focus:ring-2 focus:ring-indigo-400"
            />

            <button
              onClick={openAdd}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition shadow-md"
            >
              + Add Student
            </button>

          </div>



          {loading ? (
            <p className="text-center py-10 text-gray-500">Loading...</p>
          ) : (
            <table className="w-full">

              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3">ID</th>
                  <th>Name</th>
                  <th>Marks</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-b hover:bg-indigo-50 transition">
                    <td className="py-3">{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.marks}</td>

                    <td className="flex gap-3 justify-center py-3">
                      <button
                        onClick={() => openEdit(s)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:scale-105"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}



          <div className="flex justify-center gap-6 mt-6">

            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
            >
              Prev
            </button>

            <span className="font-semibold">Page {page + 1}</span>

            <button
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Next
            </button>

          </div>

        </div>
      </div>



      {show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 space-y-4">

            <h2 className="text-xl font-bold text-indigo-600 text-center">
              {editId ? "Edit Student" : "Add Student"}
            </h2>

            <input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border p-3 rounded-xl"
            />

            <input
              type="number"
              placeholder="Marks"
              value={marks}
              onChange={e => setMarks(e.target.value)}
              className="w-full border p-3 rounded-xl"
            />

            <div className="flex gap-3">

              <button
                onClick={editId ? updateStudent : addStudent}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-xl"
              >
                Save
              </button>

              <button
                onClick={closeModal}
                className="flex-1 bg-gray-300 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
