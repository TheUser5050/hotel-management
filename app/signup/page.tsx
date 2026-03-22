'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

const Signup = () => {
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError(null)
    setMessage(null)

    const formData = new FormData(e.currentTarget)

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    const data = await res.json()

    if (data.error) {
      setError(data.error)
    } else {
      setMessage(data.message)

      // redirect to login
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
        <p className="text-center text-black mb-6">Sign up to continue</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 text-green-600 px-4 py-2 rounded-xl text-sm">
              {message}
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="text-black border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="text-black border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="text-black border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="mt-2 bg-black text-white py-2 rounded-xl hover:opacity-90"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-black font-medium cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </main>
  )
}

export default Signup
