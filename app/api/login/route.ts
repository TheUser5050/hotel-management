import db from "@/lib/db";


type User = {
  email: String,
  password: String
}
export async function POST(req: Request) {
  const user: User = await req.json();
  console.log(user)
  const [rows]: any = await db.query("SELECT * FROM user WHERE email=? AND password=?", [user.email, user.password])

  if (rows.length === 0) {
    return Response.json({ error: "Username or password is incorrect" })
  }
  const users = rows[0]
  console.log({
    message: "Login Success",
    user: {
      id: users.user_id,
      role: users.role,
      name: users.name
    }
  })
  return Response.json({
    message: "Login Success",
    user: {
      id: users.user_id,
      role: users.role,
      name: users.name
    }
  })
}
