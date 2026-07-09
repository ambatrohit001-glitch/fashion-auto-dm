import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2>Total Outfits</h2>
              <p className="text-3xl font-bold">0</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2>DMs Sent</h2>
              <p className="text-3xl font-bold">0</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2>Affiliate Clicks</h2>
              <p className="text-3xl font-bold">0</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2>Revenue</h2>
              <p className="text-3xl font-bold">₹0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}