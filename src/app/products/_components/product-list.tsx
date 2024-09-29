import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { FileSpreadsheet, Plus } from "lucide-react";
import AddProduct from "./add-product";
import { DataType, DrawerType } from "../_types/product.types";
import { productListData } from "../_mock-data/mockdata";

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value as string),
    width: "30%",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value as string),
    filterSearch: true,
    width: "40%",
  },
];


const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};


const ProductList: React.FC = () => {
  const [open, setOpen] = useState({
    show: false,
    type: ""
  });

  const onClick = (type: DrawerType) => setOpen((prev) => ({...prev, show: !prev.show, type}));
  const onClose = () => setOpen((prev) => ({...prev, show: !prev.show}));
  
  return (
    <div>
      <div className="flex justify-end my-4 gap-4">
        <Button type="primary" size="large" icon={<Plus />} onClick={() => onClick("form")}>
          New Product
        </Button>
        <Button type="primary" size="large" icon={<FileSpreadsheet />} onClick={() => onClick("sheet")}>
          Import Sheet
        </Button>
      </div>

      <Table<DataType>
        columns={columns}
        dataSource={productListData}
        onChange={onChange}
      />
      <AddProduct onClose={onClose} open={open.show} type={open.type} />
    </div>
  );
};

export default ProductList;
