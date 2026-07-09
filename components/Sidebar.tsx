import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Fashion Auto DM</h1>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block hover:text-blue-400">
          📊 Dashboard
        </Link>

        <Link href="/outfits" className="block hover:text-blue-400">
          👕 Outfits
        </Link>

        <Link href="/products" className="block hover:text-blue-400">
          📦 Products
        </Link>

        <Link href="/settings" className="block hover:text-blue-400">
          ⚙️ Settings
        </Link>
      </nav>
    </aside>
  );
}