import Link from "next/link";
import { BRAND } from "@/lib/brand";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Products", href: "/products", icon: "📦" },
  { name: "Automations", href: "/automations", icon: "🤖" },
  { name: "Analytics", href: "/analytics", icon: "📈" },
  { name: "Profile", href: "/profile", icon: "👤" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white border-r border-slate-800 p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">{BRAND.name}</h1>
        <p className="text-slate-400 text-sm mt-1">
          {BRAND.slogan}
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 transition"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}