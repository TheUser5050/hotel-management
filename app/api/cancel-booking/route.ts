import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { booking_id } = await req.json()

    // ✅ get room_id first
    const [rows]: any = await db.query(
      "SELECT room_id FROM booking WHERE booking_id = ?",
      [booking_id]
    )

    if (rows.length === 0) {
      return Response.json({ error: "Booking not found" })
    }

    const room_id = rows[0].room_id

    // ✅ delete booking
    await db.query(
      "DELETE FROM booking WHERE booking_id = ?",
      [booking_id]
    )

    // ✅ make room available again
    await db.query(
      "UPDATE rooms SET status = 'available' WHERE room_id = ?",
      [room_id]
    )

    return Response.json({ message: "Booking cancelled & room available" })

  } catch (err) {
    console.log(err)
    return Response.json({ error: "Failed to cancel booking" })
  }
}
