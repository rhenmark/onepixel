"use client"

import React, { useState } from "react";
import { Button, Switch, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Plus } from "lucide-react";
import AddCategory from "./add-category";
import { CategoryDataType } from "../_types/product.types";
import { useGetCategories } from "../_hooks/useProducts";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/duxs/store";


const columns: TableColumnsType<CategoryDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value as string),
  },
  {
    title: "Active",
    dataIndex: "isActive",
    sorter: (a, b) => Number(a?.isActive) - Number(b?.isActive),
    render: (_, value) => {
      return <Switch defaultChecked={value.isActive} disabled />;
    },
    width: "30%",
  },
  {
    title: "Actions",
    dataIndex: "id",
    render: () => <Button type="link">Edit</Button>,
    width: "10%",
  },
];


const onChange: TableProps<CategoryDataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ProductCategories: React.FC = () => {
  const [open, setOpen] = useState(false)
  const onOpenClose = () => setOpen((prev) => !prev)
  const { loading } = useGetCategories()
  const data = useSelector((state: RootState) => state.products.productCategories)
  
  return (
    <div>
      <div className="flex justify-end my-4 gap-4">
        <Button type="primary" size="large" icon={<Plus />} onClick={onOpenClose}>
          Add Category
        </Button>
      </div>
      <Table<CategoryDataType>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        loading={loading}
        rowKey={"id"}
      />
      {
        open && <AddCategory open={true} onClose={onOpenClose} />
      }
      
    </div>
  );
};

export default ProductCategories;
