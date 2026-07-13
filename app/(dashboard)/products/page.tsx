"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  image_url: string;
  affiliate_link: string;
  price: number;
  brand: string;
  category: string;
  status: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadProducts();
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Products
          </h1>

          <p className="text-slate-400">
            Manage all your affiliate products.
          </p>
        </div>

        <Link
          href="/products/add"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Search Placeholder */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

        <input
          placeholder="🔍 Search products... (Coming Soon)"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
          disabled
        />

      </div>

      {/* Products */}

      {products.length === 0 ? (

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">

          <h2 className="text-xl font-semibold text-white">
            No Products Found
          </h2>

          <p className="mt-2 text-slate-400">
            Click "Add Product" to create your first product.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {products.map((product) => (

            <div
              key={product.id}
              className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden"
            >

              <img
                src={product.image_url}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="space-y-3 p-5">

                <h2 className="text-xl font-semibold text-white">
                  {product.name}
                </h2>

                <p className="text-slate-400">
                  <strong>Brand:</strong> {product.brand}
                </p>

                <p className="text-slate-400">
                  <strong>Category:</strong> {product.category}
                </p>

                <p className="text-slate-400">
                  <strong>Price:</strong> ₹{product.price}
                </p>

                <div className="flex gap-3 pt-3">

                  <a
                    href={product.affiliate_link}
                    target="_blank"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                  >
                    Buy Now
                  </a>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}