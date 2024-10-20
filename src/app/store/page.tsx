"use client";

import Header from "@/components/ui/header/header";
import {
  Splitter,
} from "antd";
import { ProductStateProps } from "@/lib/duxs/feature/product/product";
import { useDispatch } from "react-redux";
import { addOrder, removeOrder } from "@/lib/duxs/feature/store-pos/store-pos";
import OrdersList from "./_components/orders";
import ProductList from "./_components/product_list";
import CategoryList from "./_components/category_list";
import PaymentForm from "./_components/payment_form";

function StorePOS() {
  const dispatch = useDispatch();

  const onAddItem = (item: ProductStateProps) => {
    dispatch(addOrder(item));
  };

  const onRemoveItem = (item: ProductStateProps) => {
    dispatch(removeOrder(item));
  };

  return (
    <div className="grid grid-rows-[80px_1fr] text-white box-border h-dvh max-h-dvh overflow-hidden">
      <Header showNav />
      <main className="p-4 m-auto w-full h-full overflow-y-auto">
        <Splitter
          style={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
          className="w-full"
        >
          <Splitter.Panel
            defaultSize="10%"
            min="10%"
            max="10%"
            className="overflow-y-auto overflow-x-hidden"
          >
            <CategoryList />
          </Splitter.Panel>
          <Splitter.Panel
            defaultSize="60%"
            min="60%"
            max="60%"
            className="overflow-y-auto px-10"
          >
            <ProductList onAddItem={onAddItem} />
          </Splitter.Panel>
          <Splitter.Panel>
            <OrdersList onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
          </Splitter.Panel>
        </Splitter>
      </main>
      <PaymentForm />
    </div>
  );
}

export default StorePOS;
