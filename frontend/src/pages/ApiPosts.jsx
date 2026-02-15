import { useEffect, useState } from "react"
import API from "../services/api"

export default function ApiPosts() {

  const [p, setP] = useState([])
  const [e, se] = useState(null)
  const [l, sl] = useState(true)


  useEffect(() => {

    const f = async () => {
      try {
        // ✅ direct API call
        // if you don’t have posts endpoint, change to "/students"
        const r = await API.get("/posts")
        setP(r.data)

      } catch {
        se("Failed to load posts.")

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
    <div className="max-w-4xl mx-auto p-6 space-y-4">

      {p.map(x => (
        <div
          key={x.id}
          className="bg-white p-4 rounded shadow hover:shadow-lg transition"
        >
          <h3 className="font-semibold">{x.title}</h3>
          <p className="text-gray-500 text-sm">{x.body}</p>
        </div>
      ))}

    </div>
  )
}
