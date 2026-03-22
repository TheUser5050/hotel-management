'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const Login = () => {
  const [error, setError] = useState<null | String>(null)
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const email = formData.get("email")
    const password = formData.get("password")

    const res = await fetch('/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    const user_id = data.user.id
    console.log(user_id)
    if (data.error) {
      setError(data.error)
    } else {
      localStorage.setItem("id", JSON.stringify(user_id))
      if (data.user.role === "admin") {
        router.push('/admin')
      }
      else {
        router.push('/')
      }
    }
  }

  return <main className="min-h-screen flex items-center justify-center bg-white text-gray-900 px-4">
    <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm">{error}</div>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="mt-2 bg-black text-white py-2 rounded-xl hover:opacity-90"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
        Don’t have an account? <a className="text-black font-medium cursor-pointer" href="/signup">Sign up</a>
      </p>
    </div>
  </main>
}


export default Login;
