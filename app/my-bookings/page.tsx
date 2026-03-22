'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Booking = {
  booking_id: number
  room_number: string
  type: string
  check_in: string
  check_out: string
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const router = useRouter()

  const fetchBookings = async (userId: number) => {
    const res = await fetch(`/api/my-bookings?user_id=${userId}`)
    const data = await res.json()
    // console.log(data)
    setBookings(data)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("id") || "{}")

    if (typeof user != "number") {
      router.push("/login")
      return
    }

    fetchBookings(user)
  }, [])

  const cancelBooking = async (id: number) => {
    const res = await fetch('/api/cancel-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking_id: id })
    })

    const data = await res.json()

    if (data.message) {
      // refresh list
      const user = JSON.parse(localStorage.getItem("id") || "{}")
      fetchBookings(user.id)
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b.booking_id}
              className="border rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-2">
                Room {b.room_number}
              </h2>

              <p className="text-gray-600">
                Type: {b.type}
              </p>

              <p className="text-gray-600">
                Check-in: {b.check_in}
              </p>

              <p className="text-gray-600 mb-4">
                Check-out: {b.check_out}
              </p>

              <button
                onClick={() => cancelBooking(b.booking_id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:opacity-90"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default MyBookings
