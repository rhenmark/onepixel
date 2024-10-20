import { MenuProps, Dropdown } from "antd";
import { Banknote, CreditCard } from "lucide-react";
import { useState } from "react";
import { Key } from "readline";

const options: MenuProps["items"] = [
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
  ];
  
  const SelectWithImage = () => {
    const [selectedPayment, setSelectedPayment] = useState(options[0]);
  
    const onClick = (item: { key: Key | undefined }) => {
      const selected = options.find((x) => x?.key === item.key);
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