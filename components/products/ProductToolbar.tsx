"use client";

import ProductSearch from "./ProductSearch";
import Select from "@/components/ui/Select";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
};

export default function ProductToolbar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  sort,
  setSort,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-4">

      <div className="flex-1 min-w-[250px]">
        <ProductSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      <div className="w-48">
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            "All",
            "Fashion",
            "Beauty",
            "Electronics",
            "Footwear",
            "Accessories",
            "Home",
            "Fitness",
            "Books",
            "Health",
            "Other",
          ]}
        />
      </div>

      <div className="w-40">
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            "All",
            "active",
            "draft",
            "archived",
          ]}
        />
      </div>

      <div className="w-44">
        <Select
          label="Sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          options={[
            "Newest",
            "Oldest",
            "Price ↑",
            "Price ↓",
            "A-Z",
            "Z-A",
          ]}
        />
      </div>

    </div>
  );
}