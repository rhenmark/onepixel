import { Dispatch, SetStateAction } from "react";

export type DrawerType = "form" | "sheet"

export interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

export type DrawerState = {
    show: boolean;
    type: DrawerType | ""
}

export type AddProductProps = {
    onClose: () => void;
    open: boolean;
    type: DrawerType | string;
  };

export type AddProductCategoryProps = Omit<AddProductProps, "type">

export type CategoryItems = {
    name: string
    active: boolean
}

export interface CategoryDataType {
    id: React.Key;
    name: string;
    isActive?: boolean;
  }

export interface AddProductCategoryFooterProps extends Pick<AddProductCategoryProps, "onClose"> {
    loading: boolean;
    onClickSave: () => void
}
  
export type CategoryFormStateProps = {
    categories: string[];
    setCategories: Dispatch<SetStateAction<string[]>>
}

export type ProductTableProps = {
    onBack: () => void
}