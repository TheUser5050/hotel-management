'use client'

import { useEffect, useState } from "react"

type Room = {
  room_id: number
  room_number: string
  type: string
  price: number
}

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms')
        const data = await res.json()
        setRooms(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Available Rooms
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-500">No rooms found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.room_id}
              className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                Room {room.room_number}
              </h2>

              <p className="text-gray-600 mb-1">
                Type: <span className="font-medium">{room.type}</span>
              </p>

              <p className="text-gray-600 mb-4">
                Price: ₹{room.price} / night
              </p>

              <button
                onClick={() => window.location.href = "/booking"}
                className="w-full bg-black text-white py-2 rounded-xl hover:opacity-90"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default RoomsPage
