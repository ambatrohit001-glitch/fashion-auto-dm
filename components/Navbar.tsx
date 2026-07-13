import { BRAND } from "@/lib/brand";

export default function Navbar() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
      <div>
        <h2 className="text-xl font-semibold text-white">
          {BRAND.name}
        </h2>
      </div>

      <div className="flex items-center gap-6 text-white">
        <button className="text-xl">🔔</button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
            R
          </div>

          <div>
            <p className="font-medium">Rohit</p>
            <p className="text-xs text-slate-400">
              Creator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}