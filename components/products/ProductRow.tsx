"use client";

import Link from "next/link";

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

type ProductRowProps = {
  product: Product;
  onDelete: (id: string) => void;
};

export default function ProductRow({
  product,
  onDelete,
}: ProductRowProps) {
  return (
    <div className="flex items-center justify-between p-5 hover:bg-slate-800/40">

      <div className="flex items-center gap-4">

        <img
          src={product.image_url}
          alt={product.name}
          className="h-20 w-20 rounded-lg object-cover"
        />

        <div>
          <h3 className="font-semibold text-white">
            {product.name}
          </h3>

          <p className="text-slate-400">
            {product.brand}
          </p>

          <p className="text-sm text-slate-500">
            {product.category}
          </p>

          <p className="mt-1 font-semibold text-white">
            {product.currency} {product.price}
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <Link
          href={`/products/edit/${product.id}`}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(product.id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Delete
        </button>

      </div>

    </div>
  );
}
