"use client";

import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginTop: 30,
        marginBottom: 40,
      }}
    >
      <input
        type="text"
        placeholder="Search products, outfits, brands..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 1,
          padding: "14px 18px",
          fontSize: 16,
          borderRadius: 10,
          border: "1px solid #374151",
          background: "#1f2937",
          color: "white",
          outline: "none",
        }}
      />

      <button
        style={{
          padding: "14px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🔍 Search
      </button>
    </div>
  );
}