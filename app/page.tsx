import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">HotelSys</h1>

        <div className="space-x-6">
          <Link href="/customers" className="hover:text-blue-600">
            Customers
          </Link>
          <Link href="/rooms" className="hover:text-blue-600">
            Rooms
          </Link>
          <Link href="/bookings" className="hover:text-blue-600">
            Bookings
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h2 className="text-5xl font-bold mb-4">
          Hotel Management System
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Manage customers, rooms, and bookings efficiently
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/customers"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View Customers
          </Link>

          <Link
            href="/bookings"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Manage Bookings
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-10 pb-16">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">Customers</h3>
          <p className="text-gray-600">
            Store and manage guest details easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">Rooms</h3>
          <p className="text-gray-600">
            Track room availability and pricing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">Bookings</h3>
          <p className="text-gray-600">
            Handle reservations and check-ins smoothly.
          </p>
        </div>
      </section>

    </main>
  );
}
