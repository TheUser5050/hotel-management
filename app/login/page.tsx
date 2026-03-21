const Login = () => {
  return <main className="min-h-screen flex items-center justify-center bg-white text-gray-900 px-4">
    <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form className="flex flex-col gap-4" method="POST" action="/api/login">
        <input
          type="email"
          placeholder="Email"
          className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          placeholder="Password"
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
        Don’t have an account? <span className="text-black font-medium cursor-pointer">Sign up</span>
      </p>
    </div>
  </main>
}

export default Login;
