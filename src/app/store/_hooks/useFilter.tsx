import { ProductStateProps } from "@/lib/duxs/feature/product/product";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type UseFilterProps = {
  items: ProductStateProps[];
};

export const useFilter = ({ items }: UseFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category") || "All";

  if (!categoryFilter || categoryFilter !== "All") {
    items = items.filter((item) => item.category === categoryFilter);
  }

  const filteredData = searchQuery
    ? items.filter((item) =>
        item.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
    : items;

  return {
    data: filteredData,
    setSearchQuery,
    searchQuery,
  };
};
