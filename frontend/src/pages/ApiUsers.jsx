import { useEffect, useState } from "react"
import API from "../services/api"

export default function ApiUsers() {

  const [u, s] = useState([])
  const [l, sl] = useState(true)
  const [e, se] = useState(null)


  useEffect(() => {

    const f = async () => {
      try {
        // ✅ direct API call (JWT auto attached)
        const r = await API.get("/students")
        s(r.data)

      } catch {
        se("Failed to load users.")

      } finally {
        sl(false)
      }
    }

    f()

  }, [])


  if (l)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )

  if (e)
    return <p className="p-6 text-red-500">{e}</p>


  return (
    <div className="grid gap-4 p-6">

      {u.map(x => (
        <div
          key={x.id}
          className="p-4 bg-white rounded shadow hover:shadow-lg transition"
        >
          <h3 className="font-semibold">{x.name}</h3>
          <p className="text-gray-500 text-sm">{x.role}</p>
        </div>
      ))}

    </div>
  )
}
