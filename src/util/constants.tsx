import { QuickAccessLinkProps } from "@/components/ui/header/header.types";
import { LayoutDashboard, PackageOpen, PieChart, ScanBarcode } from "lucide-react";

export const quickAccessLinks: QuickAccessLinkProps[] = [
    { key: "1", label: "Dashboard", route: "/dashboard", icon: <LayoutDashboard /> },
    { key: "2", label: "Products", route: "/products", icon: <PackageOpen /> },
    { key: "3", label: "Inventory", route: "/inventory", icon: <ScanBarcode /> },
    { key: "4", label: "Reports", route: "/reports", icon: <PieChart /> },
];
  