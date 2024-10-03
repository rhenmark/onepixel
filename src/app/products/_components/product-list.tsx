"use client"

import React, { useState } from "react";
import { Button, Image, Skeleton, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { FileSpreadsheet, Plus } from "lucide-react";
import AddProduct from "./add-product";
import {  DrawerType, ProductListDataType } from "../_types/product.types";
import { useGetProductList } from "../_hooks/useProducts";

const columns: TableColumnsType<ProductListDataType> = [
  {
    title: "Image",
    dataIndex: "imageUrl",
    render: (value) => {
      return value?.url ? <Image src={value?.url} alt="image" height={100} /> : <Skeleton.Image active />
    }
  },
  {
    title: "Name",
    dataIndex: "name",
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value as string),
    width: "30%",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Type",
    dataIndex: "itemType",
    filterSearch: true,
  },
  {
    title: "Price",
    dataIndex: "price",
    filterSearch: true,
  },
];


const onChange: TableProps<ProductListDataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};


const ProductList: React.FC = () => {
  const { data, loading } = useGetProductList()
  const [open, setOpen] = useState({
    show: false,
    type: ""
  });
 

  const onClick = (type: DrawerType) => setOpen((prev) => ({...prev, show: !prev.show, type}));
  const onClose = () => setOpen((prev) => ({...prev, show: !prev.show}));
  
  return (
    <div className="w-full">
      <div className="flex justify-end my-4 gap-4">
        <Button type="primary" size="large" icon={<Plus />} onClick={() => onClick("form")}>
          New Product
        </Button>
        <Button type="primary" size="large" icon={<FileSpreadsheet />} onClick={() => onClick("sheet")}>
          Import Sheet
        </Button>
      </div>

      <Table<ProductListDataType>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        loading={loading}
        key={"id"}
      />
      <AddProduct onClose={onClose} open={open.show} type={open.type} />
    </div>
  );
};

export default ProductList;
