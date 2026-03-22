'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AdminPage = () => {
  const [data, setData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role") || '""')
    console.log(role == "admin")
    if (role !== "admin") {
      router.push("/login")
      return
    }

    const fetchData = async () => {
      const res = await fetch('/api/admin')
      const d = await res.json()
      setData(d)
    }

    fetchData()
  }, [])

  if (!data) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 space-y-10">

      {/* USERS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {data.users.map((u: any) => (
            <div key={u.user_id} className="border p-4 rounded-xl">
              <p className="font-medium">{u.name}</p>
              <p className="text-gray-500">{u.email}</p>
              <p className="text-sm text-gray-400">{u.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROOMS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {data.rooms.map((r: any) => (
            <div key={r.room_id} className="border p-4 rounded-xl">
              <p className="font-medium">Room {r.room_number}</p>
              <p className="text-gray-500">{r.type}</p>
              <p className="text-gray-700">₹{r.price}</p>
              <p className={`text-sm ${r.room_status === "occupied"
                ? "text-red-500"
                : "text-green-500"
                }`}>
                {r.room_status}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKINGS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full border rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Email</th>
                <th className="p-2">Room</th>
                <th className="p-2">Type</th>
                <th className="p-2">Check-in</th>
                <th className="p-2">Check-out</th>
              </tr>
            </thead>
            <tbody>
              {data.bookings.map((b: any) => (
                <tr key={b.booking_id} className="text-center border-t">
                  <td className="p-2">{b.name}</td>
                  <td className="p-2">{b.email}</td>
                  <td className="p-2">{b.room_number}</td>
                  <td className="p-2">{b.type}</td>
                  <td className="p-2">{b.check_in}</td>
                  <td className="p-2">{b.check_out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  )
}

export default AdminPage
