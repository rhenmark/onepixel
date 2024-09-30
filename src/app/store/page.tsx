"use client";

import Header from "@/components/ui/header/header";
import { Button, Card, InputNumber, List, Space, Splitter, Typography } from "antd";
import { Minus, MinusIcon, Plus } from "lucide-react";
import Link from "next/link";

const mockProductList = Array.from(Array(14), (x, i) => i + 1);
const mockPurchaseList = Array.from(Array(5), (x, i) => i + 1);

function Store() {
  return (
    <div className="grid grid-rows-[80px_1fr] text-white box-border h-dvh max-h-dvh overflow-hidden">
        <Header showNav/>
      <main className="p-4 m-auto w-full h-full overflow-y-auto">
      <Splitter
        style={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        className="w-full"
      >
        <Splitter.Panel defaultSize="70%" min="70%" max="70%" className="overflow-y-auto px-10">
          <div className="grid grid-cols-3 gap-4 overflow-y-auto">
            {mockProductList.map((item) => (
                <Card key={item} className="h-[200px]">{item}</Card>
            ))}
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
            <div className="p-4 grid grid-rows-[1fr_auto] h-full"> 
                <div>
                    {/* <Empty /> */}
                    <List
                        header={<div className="text-white text-right">Qty: 0</div>}
                        // bordered
                        dataSource={mockPurchaseList}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text className="!text-white">Item {item}</Typography.Text> 
                                <div className="grid place-items-center grid-flow-col">
                                <Space.Compact style={{ width: '100%' }}>
                                    <Button size="large" variant="solid" icon={<MinusIcon />} />
                                        <InputNumber min={0} max={100} size="large" />
                                    <Button type="primary" size="large" icon={<Plus />} />
                                </Space.Compact>
                                </div>
                            </List.Item>
                        )}
                        size="large"
                        />
                </div>
                <div className="h-full">
                    <Link href="/store/pay" className="!h-20 flex flex-row justify-between items-center w-full bg-primary text-white px-4 rounded-md" >
                        <span className="block float-left text-xl">Pay</span>
                        <span className="block text-2xl font-bold">PHP 0.00</span>
                    </Link>
                </div>
            </div>
        </Splitter.Panel>
      </Splitter>
      </main>
    </div>
  );
}

export default Store;
