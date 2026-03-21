import db from "@/lib/db";


type User = {
  email: String,
  password: String
}
export async function POST(req: Request) {
  const user: User = await req.json();

  const [rows] = await db.query("SELECT * FROM USER WHERE email=? AND password=?", [user.email, user.password])
}
