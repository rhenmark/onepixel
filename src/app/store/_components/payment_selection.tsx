"use client";

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dropdown } from "antd";
import { Banknote, CreditCard, Wallet } from "lucide-react";
import { ReactNode, useState } from "react";

interface MenuOptions {
  icon: ReactNode
  key: string
  label: string
}

const options: MenuOptions[] = [
    {
      key: "cash",
      label: "Cash",
      icon: <Banknote />,
    },
    {
      key: "card",
      label: "Card",
      icon: <CreditCard />,
    },
    {
      key: "gcash",
      label: "GCash",
      icon: <Wallet />,
    },
    {
      key: "maya",
      label: "Maya",
      icon: <Wallet />,
    },
  ];
  
  const SelectWithImage = () => {
    const [selectedPayment, setSelectedPayment] = useState<MenuOptions>(options[0]);
  
    const onClick = (item: unknown ) => {
      // @ts-ignore eslint-ignore-next-line 
      const selected: unknown = options.find((x) => x?.key === item.key);
       // @ts-ignore eslint-ignore-next-line 
      if (selected) setSelectedPayment(selected);
    };

    return (
      <Dropdown
        menu={{
          items: options,
          selectable: true,
          defaultSelectedKeys: ["cash"],
          onClick,
        }}
        className="py-4 px-6 bg-black/20"
        overlayClassName="w-[240px]"
        openClassName="p-8"
      >
        <div className="flex flex-row gap-2">
          {selectedPayment?.icon}
          <span>{selectedPayment?.label}</span>
        </div>
      </Dropdown>
    );
  };
  
export default SelectWithImage