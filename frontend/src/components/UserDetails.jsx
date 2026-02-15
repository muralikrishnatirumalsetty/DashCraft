import { useParams } from "react-router-dom"

export default function UserDetails({ users }) {

  const { id } = useParams()

  const u = users.find(x => x.id === Number(id))

  if (!u) return <p>User not found.</p>

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold">{u.name}</h2>
      <p>Marks: {u.marks}</p>
    </div>
  )
}
