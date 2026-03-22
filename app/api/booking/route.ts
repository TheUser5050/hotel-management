import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { user_id, room_id, check_in, check_out } = await req.json()

    if (!user_id) {
      return Response.json({ error: "User not logged in" })
    }

    // 🔍 Check availability
    const [existing]: any = await db.query(
      `SELECT * FROM booking 
       WHERE room_id = ? 
       AND NOT (check_out <= ? OR check_in >= ?)`,
      [room_id, check_in, check_out]
    )

    if (existing.length > 0) {
      return Response.json({ error: "Room not available ❌" })
    }

    // ✅ Insert booking
    await db.query(
      "INSERT INTO booking (user_id, room_id, check_in, check_out) VALUES (?, ?, ?, ?)",
      [user_id, room_id, check_in, check_out]
    )

    // 🔥 OPTIONAL: mark as occupied
    await db.query(
      "UPDATE rooms SET status = 'occupied' WHERE room_id = ?",
      [room_id]
    )

    return Response.json({ message: "Booking successful ✅" })

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Booking failed" })
  }
}
