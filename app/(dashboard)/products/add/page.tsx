import ProductForm from "@/components/products/ProductForm";

export default function AddProductPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <ProductForm mode="add" />
    </div>
  );
}