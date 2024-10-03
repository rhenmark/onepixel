import { ProductStateProps } from "@/lib/duxs/feature/product/product";
import { useState } from "react";

type UseFilterProps = {
  items: ProductStateProps[];
};

export const useFilter = ({ items }: UseFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  let filteredData = searchQuery
    ? items.filter((item) =>
        item.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
    : items;

  return {
    data: filteredData,
    setSearchQuery,
    searchQuery
  };
};
