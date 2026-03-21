import db from "@/lib/db";

export async function GET(req: Request) {
  const [rows] = await db.query("SELECT * FROM rooms WHERE status='available'")
  console.log(rows)
  return Response.json(rows)
}
