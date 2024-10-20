import { ProductStateProps } from "@/lib/duxs/feature/product/product";

export type ComponentProps = {
    onAddItem: (item: ProductStateProps) => void;
    onRemoveItem?: (item: ProductStateProps) => void;
  };