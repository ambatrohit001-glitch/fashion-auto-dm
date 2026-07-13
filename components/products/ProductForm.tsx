"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { uploadImage } from "@/lib/storage/upload";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

type ProductFormProps = {
  mode: "add" | "edit";
  productId?: string;
};

export default function ProductForm({
  mode,
  productId,
}: ProductFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Fashion");

  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");

  const [affiliateLink, setAffiliateLink] = useState("");

  const [status, setStatus] = useState("active");

  const [file, setFile] = useState<File | null>(null);

  const categories = [
    "Fashion",
    "Beauty",
    "Electronics",
    "Footwear",
    "Accessories",
    "Digital Products",
    "Home",
    "Fitness",
    "Books",
    "Health",
    "Other",
  ];

  const currencies = [
    "INR",
    "USD",
    "EUR",
  ];

  const statuses = [
    "active",
    "draft",
    "archived",
  ];
const loadProduct = useCallback(async () => {
  if (!productId) return;

  setLoading(true);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    alert(error.message);
    setLoading(false);
    return;
  }

  setName(data.name ?? "");
  setDescription(data.description ?? "");
  setBrand(data.brand ?? "");
  setCategory(data.category ?? "Fashion");
  setPrice(String(data.price ?? ""));
  setCurrency(data.currency ?? "INR");
  setAffiliateLink(data.affiliate_link ?? "");
  setStatus(data.status ?? "active");

  setLoading(false);
}, [productId]);

useEffect(() => {
  if (mode === "edit") {
    loadProduct();
  }
}, [mode, loadProduct]);

const saveProduct = useCallback(async () => {
  if (!name.trim()) {
    alert("Please enter product name.");
    return;
  }

  if (!affiliateLink.trim()) {
    alert("Please enter affiliate link.");
    return;
  }

  setLoading(true);

  try {
    let imageUrl = "";

    if (file) {
      const uploaded = await uploadImage(file);

      if (!uploaded) {
        alert("Image upload failed.");
        setLoading(false);
        return;
      }

      imageUrl = uploaded;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let error;

    if (mode === "add") {
      ({ error } = await supabase
        .from("products")
        .insert([
          {
            user_id: user?.id,
            name,
            description,
            brand,
            category,
            price: Number(price),
            currency,
            affiliate_link: affiliateLink,
            image_url: imageUrl,
            status,
          },
        ]));
    } else {
      ({ error } = await supabase
        .from("products")
        .update({
          name,
          description,
          brand,
          category,
          price: Number(price),
          currency,
          affiliate_link: affiliateLink,
          status,
          ...(imageUrl && { image_url: imageUrl }),
        })
        .eq("id", productId));
    }

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert(
      mode === "add"
        ? "✅ Product added successfully!"
        : "✅ Product updated successfully!"
    );

    router.push("/products");
    router.refresh();
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
}, [
  affiliateLink,
  brand,
  category,
  currency,
  description,
  file,
  mode,
  name,
  price,
  productId,
  router,
  status,
]);

    
  return (
  <div className="mx-auto max-w-3xl">

    <button
      onClick={() => router.back()}
      className="mb-6 text-slate-400 transition hover:text-white"
    >
      ← Back to Products
    </button>

    <div className="rounded-xl border border-slate-800 bg-slate-900 p-8">

      <h1 className="text-3xl font-bold text-white">
        {mode === "add"
          ? "Add New Product"
          : "Edit Product"}
      </h1>

      <p className="mb-8 mt-2 text-slate-400">
        {mode === "add"
          ? "Add a new affiliate product to your catalog."
          : "Update your affiliate product."}
      </p>

      <div className="space-y-6">

        <Input
          label="Product Name"
          placeholder="Nike Air Max 270"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Textarea
          label="Description"
          placeholder="Write a short product description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          label="Brand"
          placeholder="Nike"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categories}
        />

        <Input
          label="Price"
          type="number"
          placeholder="4999"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          options={currencies}
        />

        <Input
          label="Affiliate Link"
          placeholder="https://amazon.in/..."
          value={affiliateLink}
          onChange={(e) => setAffiliateLink(e.target.value)}
          required
        />

        <div className="space-y-2">

          <label className="block text-sm font-medium text-slate-300">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.length) {
                setFile(e.target.files[0]);
              }
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          {file && (
            <p className="text-sm text-green-400">
              Selected: {file.name}
            </p>
          )}

        </div>
                  <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statuses}
        />

        <div className="pt-4">
          <Button
            onClick={saveProduct}
            disabled={loading}
          >
            {loading
              ? mode === "add"
                ? "Saving Product..."
                : "Updating Product..."
              : mode === "add"
                ? "Save Product"
                : "Update Product"}
          </Button>
        </div>

      </div>

    </div>

  </div>
);
}