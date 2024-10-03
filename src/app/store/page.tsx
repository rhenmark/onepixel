"use client";

import Header from "@/components/ui/header/header";
import {
  Button,
  Card,
  InputNumber,
  List,
  Space,
  Spin,
  Splitter,
  Input,
} from "antd";
import { Flame, MinusIcon, Plus, Snowflake } from "lucide-react";
import Link from "next/link";
import { useGetProductList } from "../products/_hooks/useProducts";
import { ProductStateProps } from "@/lib/duxs/feature/product/product";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "@/lib/duxs/feature/store/store";
import { RootState } from "@/lib/duxs/store";

const { Search } = Input;

const mockPurchaseList = Array.from(Array(5), (x, i) => i + 1);

function Store() {
  const dispatch = useDispatch()

  const onAddItem = (item: ProductStateProps) => {
    dispatch(addOrder(item))
  }

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
            className="overflow-y-auto px-10"
          >
            <div>Categories here</div>
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
            <OrdersList onAddItem={onAddItem} />
          </Splitter.Panel>
        </Splitter>
      </main>
    </div>
  );
}

type ComponentProps = {
  onAddItem: (item: ProductStateProps) => void
}

const ProductList = ({onAddItem}: ComponentProps) => {
  const { data, loading } = useGetProductList();
 
  
  if (loading) {
    return (
      <div className="bg-white/20 rounded-sm grid h-full w-full place-items-center">
        <Spin size="large" spinning />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <Search size="large" enterButton placeholder="Search here"/>
      </div>
      <div className="grid grid-cols-3 gap-4 overflow-y-auto">
        {data.map((item) => (
          <Card key={item.id} className="h-[200px]" onClick={() => onAddItem(item)}>
            <div className="grid grid-flow-col items-center justify-between">
              <div>
                <span className="text-lg block">{item.name}</span>
                <span className="font-bold text-2xl">
                  ₱ {Number(item.price).toFixed(2)}
                </span>
              </div>
              {item.itemType && (
                <div>
                  <span className="font-bold text-lg">
                    {item.itemType}
                    {item.itemType === "hot" && <Flame color="red" />}
                    {item.itemType === "cold" && <Snowflake color="blue" />}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};


const OrdersList = ({onAddItem}: ComponentProps) => {
  const orders = useSelector((state: RootState) => state.store.orders)
  const subTotal = useSelector((state: RootState) => state.store.subTotal)
  const totalQty = useSelector((state: RootState) => state.store.totalQty)
  
  return (
    <div className="p-4 grid grid-rows-[1fr_auto] h-full">
      <div className="h-full">
        {/* <Empty /> */}
        <List
          footer={<div className="text-white flex flex-col gap-2">
            <div>
              Qty: {totalQty}
            </div>
            <div>
              Less: Discount: 0
            </div>
          </div>}
          // bordered
          dataSource={orders}
          className="grid grid-rows-[1fr_auto] h-full"
          renderItem={(order) => (
            <List.Item className="!px-0">
              <div className="grid grid-flow-row text-white w-full">
              <span className="!text-white text-lg">
                 {order.item.name} {order.item.itemType && `(${order.item.itemType})`}
              </span>
              <div className="flex justify-between">
                <span className="font-bold">P {order.item.price}</span>
                <span className="font-bold">P {Number(order.subTotal).toFixed(2)}</span>
              </div>
              </div>
              <div className="grid place-items-center grid-flow-col">
                <Space.Compact style={{ width: "70%" }}>
                  <Button
                    size="large"
                    variant="solid"
                    icon={<MinusIcon />}
                  />
                  <InputNumber min={0} value={order.qty} max={100} size="large" readOnly />
                  <Button type="primary" size="large" icon={<Plus />} onClick={() => onAddItem(order.item)}/>
                </Space.Compact>
              </div>
            </List.Item>
          )}
          size="large"
        />
      </div>
      <div className="h-full">
        <span>QTY: </span>
        <Link
          href="/store/pay"
          className="!h-20 flex flex-row justify-between items-center w-full bg-primary text-white px-4 rounded-md"
        >
          <span className="block float-left text-xl">Pay</span>
          <span className="block text-2xl font-bold">PHP {Number(subTotal).toFixed(2)}</span>
        </Link>
      </div>
    </div>
  )
}
export default Store;
