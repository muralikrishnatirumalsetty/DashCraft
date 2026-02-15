export default function Users({ users, deleteUser }) {

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full text-sm">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Marks</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map(u => (
            <tr key={u.id} className="border-t hover:bg-gray-50">

              <td className="p-3">{u.id}</td>
              <td className="p-3 font-medium">{u.name}</td>
              <td className="p-3">{u.marks}</td>

              <td className="p-3">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}
