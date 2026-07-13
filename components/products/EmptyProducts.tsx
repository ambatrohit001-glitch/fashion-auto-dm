import Link from "next/link";

export default function EmptyProducts() {
  return (
    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

      <h2 className="text-2xl font-semibold text-white">
        No Products Yet
      </h2>

      <p className="mt-3 text-slate-400">
        Add your first affiliate product to get started.
      </p>

      <Link
        href="/products/add"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
      >
        + Add Product
      </Link>

    </div>
  );
}