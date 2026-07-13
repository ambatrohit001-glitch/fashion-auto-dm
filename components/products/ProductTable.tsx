
"use client";

import ProductRow from "./ProductRow";

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

type ProductTableProps = {
  products: Product[];
  onDelete: (id: string) => void;
};

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="divide-y divide-slate-800">
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}