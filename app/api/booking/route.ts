import db from "@/lib/db";

export async function POST(req: Request) {
  const { user_id, room_id, check_in, check_out } = await req.json()

  await db.query(
    "INSERT INTO booking (user_id, room_id, check_in, check_out) VALUES (?, ?, ?, ?)",
    [user_id, room_id, check_in, check_out]
  )

  // update room status
  await db.query(
    "UPDATE rooms SET status='occupied' WHERE room_id=?",
    [room_id]
  )

  return Response.json({ message: "Booking successful" })
}
