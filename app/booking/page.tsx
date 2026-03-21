'use client'

import { useEffect, useState } from "react"

type Room = {
  room_id: number
  room_number: string
  type: string
  price: number
}

const BookingPage = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch('/api/rooms')
      const data = await res.json()
      setRooms(data)
    }

    fetchRooms()
  }, [])

  const handleBooking = async () => {
    if (!selectedRoom || !checkIn || !checkOut) {
      setMessage("Please fill all fields")
      return
    }

    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1,
        room_id: selectedRoom,
        check_in: checkIn,
        check_out: checkOut
      })
    })

    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Book a Room
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Choose your room and stay dates
        </p>

        {/* Room Select */}
        <label className="text-sm font-medium text-gray-700">Select Room</label>
        <select
          className="w-full mt-1 mb-4 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setSelectedRoom(Number(e.target.value))}
        >
          <option value="">Choose a room</option>
          {rooms.map((room) => (
            <option key={room.room_id} value={room.room_id}>
              Room {room.room_number} • {room.type} • ₹{room.price}
            </option>
          ))}
        </select>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Check-in</label>
            <input
              type="date"
              className="w-full mt-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Check-out</label>
            <input
              type="date"
              className="w-full mt-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleBooking}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Book Now
        </button>

        {/* Message */}
        {message && (
          <div className="mt-4 text-center text-sm text-green-600">
            {message}
          </div>
        )}
      </div>
    </main>
  )
}

export default BookingPage
