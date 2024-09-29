"use client";

import Header from "@/components/ui/header/header";
import { Tabs, TabsProps } from "antd";
import ProductList from "./_components/product-list";
import ProductCategories from "./_components/product-categories";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ProductsContent = () => {
  const [activeKey, setActiveKey] = useState("1");
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTabKey = searchParams.get("activeTabKey");

  useEffect(() => {
    if (activeTabKey && activeTabKey !== activeKey) {
      setActiveKey(activeTabKey);
    }
  }, [searchParams, activeTabKey, activeKey]);

  const handleClick = (key: string) => {
    setActiveKey(key);
    router.push(`/products?activeTabKey=${key}`);
  };

  return (
    <div className="grid grid-rows-[80px_1fr] h-dvh">
      <Header showNav />
      <main className="bg-white px-8">
        <Tabs
          defaultActiveKey={activeKey}
          activeKey={activeKey}
          items={items}
          onTabClick={handleClick}
        />
      </main>
    </div>
  );
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Products",
    children: <ProductList />,
  },
  {
    key: "2",
    label: "Categories",
    children: <ProductCategories />,
  },
  {
    key: "3",
    label: "Help",
    children: "Content Help",
  },
];

const Products = () => {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
};

export default Products;
