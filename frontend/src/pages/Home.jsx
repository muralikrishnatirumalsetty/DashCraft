import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">

      <h1 className="text-4xl font-bold">DashCraft</h1>

      <Link
        to="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Go to Login
      </Link>

    </div>
  )
}
