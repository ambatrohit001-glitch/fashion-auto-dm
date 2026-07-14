"use client";

export type ProductItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  status: string;
};

type Props = {
  products: ProductItem[];
};

export default function TopProducts({
  products,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Top Products
      </h2>

      {products.length === 0 ? (
        <p className="text-slate-400">
          No products yet.
        </p>
      ) : (
        <div className="space-y-4">

          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800 p-4"
            >
              <div>
                <p className="font-semibold text-white">
                  {product.name}
                </p>

                <p className="text-sm text-slate-400">
                  {product.brand}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-indigo-400">
                  ₹{product.price.toLocaleString()}
                </p>

                <p className="text-sm text-slate-400">
                  {product.status}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}