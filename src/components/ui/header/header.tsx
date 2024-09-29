import { Drawer, Button, Menu as MenuList, MenuProps } from "antd";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeaderProps } from "./header.types";
import { quickAccessLinks } from "@/util/constants";


const Header = ({ showNav }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  

  const onClick: MenuProps['onClick'] = (e: unknown) => {
   // @ts-expect-error: Should set the correct prop type
    router.push(e.item.props.route)
  };

  return (
    <header className="p-4 box-border bg-white text-black grid grid-cols-[auto_1fr] gap-2 items-center">
      {showNav && <Button type="text" icon={<Menu />} onClick={showDrawer} />}
      <h4 className="text-xl">OnePixel</h4>
      <Drawer
        title="Menu"
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"key"}
      >
        <MenuList
            defaultSelectedKeys={[]}
            defaultOpenKeys={[]}
            mode="inline"
            items={quickAccessLinks}
            onClick={onClick}
      />
      </Drawer>
    </header>
  );
};

export default Header;
