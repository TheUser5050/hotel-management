import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get("user_id")
    console.log(user_id)

    const [rows]: any = await db.query(
      `SELECT b.*, r.room_number, r.type 
       FROM booking b
       JOIN rooms r ON b.room_id = r.room_id
       WHERE b.user_id = ?`,
      [user_id]
    )

    return Response.json(rows)
  } catch (err) {
    console.log("DB ERROR:", err)
    return Response.json({ error: "Failed to fetch bookings" })
  }
}
