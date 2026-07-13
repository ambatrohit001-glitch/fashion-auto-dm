"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

import ProductToolbar from "@/components/products/ProductToolbar";
import ProductTable from "@/components/products/ProductTable";
import EmptyProducts from "@/components/products/EmptyProducts";

type Product = {
  id: string;
  name: string;
  image_url: string;
  affiliate_link: string;
  price: number;
  brand: string;
  category: string;
  currency: string;
  status: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
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

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesStatus =
        status === "All" || product.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sort) {
        case "Oldest":
          return a.name.localeCompare(b.name);

        case "Price ↑":
          return a.price - b.price;

        case "Price ↓":
          return b.price - a.price;

        case "A-Z":
          return a.name.localeCompare(b.name);

        case "Z-A":
          return b.name.localeCompare(a.name);

        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">

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
          className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
        >
          + Add Product
        </Link>

      </div>

      <ProductToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          Loading products...
        </div>
      ) : filteredProducts.length === 0 ? (
        <EmptyProducts />
      ) : (
        <ProductTable
          products={filteredProducts}
          onDelete={deleteProduct}
        />
      )}

    </div>
  );
}