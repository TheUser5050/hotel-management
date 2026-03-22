import db from "@/lib/db";

export async function GET() {
  try {
    // 👥 users
    const [users]: any = await db.query("SELECT * FROM user")

    // 🏨 rooms
    const [rooms]: any = await db.query("SELECT * FROM rooms")

    // 📅 bookings with JOIN
    const [bookings]: any = await db.query(`
      SELECT 
        b.booking_id,
        u.name,
        u.email,
        r.room_number,
        r.type,
        b.check_in,
        b.check_out
      FROM booking b
      JOIN user u ON b.user_id = u.user_id
      JOIN rooms r ON b.room_id = r.room_id
      ORDER BY b.check_in DESC
    `)

    return Response.json({
      users,
      rooms,
      bookings
    })

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Failed to fetch admin data" })
  }
}
