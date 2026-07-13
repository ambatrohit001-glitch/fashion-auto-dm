"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { uploadImage } from "@/lib/storage/upload";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function ProductForm() {
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
    async function saveProduct() {
    if (!name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    if (!affiliateLink.trim()) {
      alert("Please enter an affiliate link.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      // Upload image
      if (file) {
        const uploaded = await uploadImage(file);

        if (!uploaded) {
          alert("Image upload failed.");
          setLoading(false);
          return;
        }

        imageUrl = uploaded;
      }

      // Get logged in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Insert product
      const { error } = await supabase
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
        ]);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      alert("✅ Product added successfully!");

      router.push("/products");
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
   return (
    <div className="mx-auto max-w-3xl">

      <button
        onClick={() => router.back()}
        className="mb-6 text-slate-400 hover:text-white"
      >
        ← Back to Products
      </button>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8">

       <h1 className="text-3xl font-bold text-white">
  {mode === "add" ? "Add New Product" : "Edit Product"}
</h1>
        <p className="mt-2 mb-8 text-slate-400">
          Add a new affiliate product to your catalog.
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
            placeholder="Write a short description..."
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
  );
} }