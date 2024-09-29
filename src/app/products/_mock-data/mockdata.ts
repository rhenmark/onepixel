import { CategoryDataType, DataType } from "../_types/product.types";

export const productListData: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

export const productCategoryData: CategoryDataType[] = [
  {
    key: "1",
    name: "John Brown",
    active: true,
  },
  {
    key: "2",
    name: "Jim Green",
    active: true,
  },
  {
    key: "3",
    name: "Joe Black",
    active: false,
  },
  {
    key: "4",
    name: "Jim Red",
    active: false,
  },
  {
    key: "5",
    name: "Jim Green",
    active: false,
  },
  {
    key: "6",
    name: "Joe Black",
    active: false,
  },
  {
    key: "7",
    name: "Jim Red",
    active: false,
  },
];