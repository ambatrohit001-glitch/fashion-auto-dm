"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

type CampaignFormProps = {
  mode: "add" | "edit";
  campaignId?: string;
};

type Product = {
  id: string;
  name: string;
  brand: string;
};

export default function CampaignForm({
  mode,
  campaignId,
}: CampaignFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  const [status, setStatus] = useState("active");

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const statuses = [
    "active",
    "draft",
    "paused",
    "completed",
  ];

  const loadProducts = useCallback(async () => {
    const {
      data,
      error,
    } = await supabase
      .from("products")
      .select("id,name,brand")
      .order("name");

    if (error) {
      alert(error.message);
      return;
    }

    setProducts(data || []);
  }, []);
    const loadCampaign = useCallback(async () => {
    if (!campaignId) return;

    setLoading(true);

    const {
      data,
      error,
    } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", campaignId)
      .single();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setName(data.name ?? "");
    setDescription(data.description ?? "");
    setInstagramUrl(data.instagram_url ?? "");
    setStatus(data.status ?? "active");

    const {
      data: mappedProducts,
    } = await supabase
      .from("campaign_products")
      .select("product_id")
      .eq("campaign_id", campaignId);

    if (mappedProducts) {
      setSelectedProducts(
        mappedProducts.map((item) => item.product_id)
      );
    }

    setLoading(false);
  }, [campaignId]);
    useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (mode === "edit") {
      loadCampaign();
    }
  }, [mode, loadCampaign]);

  function toggleProduct(productId: string) {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }

      return [...prev, productId];
    });
  } const saveCampaign = useCallback(async () => {
  if (!name.trim()) {
    alert("Please enter campaign name.");
    return;
  }

  setLoading(true);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login again.");
      setLoading(false);
      return;
    }

    let campaignIdValue = campaignId;

    if (mode === "add") {
      const { data, error } = await supabase
        .from("campaigns")
        .insert([
          {
            user_id: user.id,
            name,
            description,
            instagram_url: instagramUrl,
            status,
            clicks: 0,
            sales: 0,
            earnings: 0,
          },
        ])
        .select()
        .single();

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      campaignIdValue = data.id;
    } else {
      const { error } = await supabase
        .from("campaigns")
        .update({
          name,
          description,
          instagram_url: instagramUrl,
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", campaignId);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      await supabase
        .from("campaign_products")
        .delete()
        .eq("campaign_id", campaignId);
    }

    if (selectedProducts.length > 0) {
      const rows = selectedProducts.map((productId) => ({
        campaign_id: campaignIdValue,
        product_id: productId,
      }));

      const { error } = await supabase
        .from("campaign_products")
        .insert(rows);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
    }

    alert(
      mode === "add"
        ? "✅ Campaign created successfully!"
        : "✅ Campaign updated successfully!"
    );

    router.push("/campaigns");
    router.refresh();
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
}, [
  campaignId,
  description,
  instagramUrl,
  mode,
  name,
  router,
  selectedProducts,
  status,
]);
return (
  <div className="mx-auto max-w-4xl">

    <button
      onClick={() => router.back()}
      className="mb-6 text-slate-400 transition hover:text-white"
    >
      ← Back to Campaigns
    </button>

    <div className="rounded-xl border border-slate-800 bg-slate-900 p-8">

      <h1 className="text-3xl font-bold text-white">
        {mode === "add"
          ? "Create Campaign"
          : "Edit Campaign"}
      </h1>

      <p className="mb-8 mt-2 text-slate-400">
        Connect Instagram campaigns with affiliate products.
      </p>

      <div className="space-y-6">

        <Input
          label="Campaign Name"
          placeholder="Summer Sale 2026"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Textarea
          label="Description"
          placeholder="Describe this campaign..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          label="Instagram Reel URL"
          placeholder="https://instagram.com/reel/..."
          value={instagramUrl}
          onChange={(e) => setInstagramUrl(e.target.value)}
        />

        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statuses}
        />

        <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">

          <h2 className="mb-4 text-lg font-semibold text-white">
            Select Products
          </h2>

          {products.length === 0 ? (
            <p className="text-slate-400">
              No products available.
            </p>
          ) : (
            <div className="space-y-3">

              {products.map((product) => (
                <label
                  key={product.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 p-3 hover:border-indigo-500"
                >
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProduct(product.id)}
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-medium text-white">
                      {product.name}
                    </p>

                    <p className="text-sm text-slate-400">
                      {product.brand}
                    </p>
                  </div>

                </label>
              ))}

            </div>
          )}

        </div>

        <Button
          onClick={saveCampaign}
          disabled={loading}
        >
          {loading
            ? mode === "add"
              ? "Creating Campaign..."
              : "Updating Campaign..."
            : mode === "add"
              ? "Create Campaign"
              : "Update Campaign"}
        </Button>

      </div>

    </div>

  </div>
);
}