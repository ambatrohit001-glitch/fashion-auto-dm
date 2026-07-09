export default function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span>🔔</span>
        <span>👤 Rohit</span>
      </div>
    </header>
  );
}