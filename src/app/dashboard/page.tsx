"use client";

import Header from "@/components/ui/header/header";
import { Card } from "antd";
import { Airplay, PackageOpen, Percent, PieChart, PrinterCheck, ScanBarcode } from "lucide-react";
import { useRouter } from "next/navigation";

const mockRoutesList = [
  { name: "Store POS", route: "/store", icon: <Airplay size={80} /> },
  { name: "Online Orders", route: "/products", icon: <PrinterCheck size={80} /> },
  { name: "Products", route: "/products", icon: <PackageOpen size={80} /> },
  { name: "Inventory", route: "/inventory", icon: <ScanBarcode size={80} /> },
  { name: "Reports", route: "/reports", icon: <PieChart size={80} /> },
  { name: "Discounts", route: "/discount", icon: <Percent size={80} /> },
];

const Dashboard = () => {
  const router = useRouter();
  const onClick = (route: string) => {
    router.push(route);
  };
  return (
    <div className="w-screen h-dvh grid grid-rows-[80px_auto]">
      <Header />
      <main className="w-full h-auto max-w-screen-lg mx-auto pt-20 ">
          <div className=" grid grid-cols-4 gap-8 gap-y-24">
          {mockRoutesList.map((item) => (
            <Card
              className="h-[200px] w-[200px] grid grid-flow-row justify-center items-center gap-4"
              onClick={() => onClick(item.route)}
              key={item.name}
            >
              <div>{item.icon}</div>
              <span className="text-center block">{item.name}</span>
            </Card>
          ))}
          </div>
      </main>
    </div>
  );
};

export default Dashboard;
