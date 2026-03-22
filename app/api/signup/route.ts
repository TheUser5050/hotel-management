import db from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    // check if email already exists
    const [existing]: any = await db.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return Response.json({ error: "User already exists" });
    }

    // insert user (no user_id, no role)
    await db.query(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return Response.json({ message: "Signup successful" });

  } catch (err) {
    console.log(err);
    return Response.json({ error: "Server error" });
  }
}
