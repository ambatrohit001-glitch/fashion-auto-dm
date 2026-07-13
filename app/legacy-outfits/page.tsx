"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadImage } from "@/lib/storage/upload";

type Outfit = {
  id: string;
  title: string;
  image_url: string;
  affiliate_link: string;
  category: string;
  brand: string;
};

export default function OutfitsPage() {
  const [title, setTitle] = useState("");
  const [affiliate, setAffiliate] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  async function fetchOutfits() {
    const { data } = await supabase
      .from("outfits")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setOutfits(data);
  }

  useEffect(() => {
    fetchOutfits();
  }, []);

  async function addOutfit() {
    if (!file) {
      alert("Choose an image first");
      return;
    }

    const imageUrl = await uploadImage(file);

    if (!imageUrl) return;

    const { error } = await supabase.from("outfits").insert([
      {
        title,
        image_url: imageUrl,
        affiliate_link: affiliate,
        category,
        brand,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Outfit Added!");

    setTitle("");
    setAffiliate("");
    setCategory("");
    setBrand("");
    setFile(null);

    fetchOutfits();
  }

  async function deleteOutfit(id: string) {
    await supabase.from("outfits").delete().eq("id", id);
    fetchOutfits();
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Outfits</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Affiliate Link"
        value={affiliate}
        onChange={(e) => setAffiliate(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <br />
      <br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) setFile(e.target.files[0]);
        }}
      />
      <br />
      <br />

      <button onClick={addOutfit}>Add Outfit</button>

      <hr />
      <br />

      <h2>All Outfits</h2>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {outfits.map((item) => (
          <div
            key={item.id}
            style={{
              width: 250,
              border: "1px solid gray",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <img
              src={item.image_url}
              width="230"
              height="230"
              style={{ objectFit: "cover" }}
            />

            <h3>{item.title}</h3>

            <p>
              <b>Brand:</b> {item.brand}
            </p>

            <p>
              <b>Category:</b> {item.category}
            </p>

            <a
              href={item.affiliate_link}
              target="_blank"
            >
              Buy Now
            </a>

            <br />
            <br />

            <button
              onClick={() => deleteOutfit(item.id)}
              style={{
                background: "red",
                color: "white",
                padding: "8px 15px",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}