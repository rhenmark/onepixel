import {
  Button,
  Drawer,
  Input,
  InputNumber,
  Select,
  Switch,
  UploadProps,
} from "antd";
import { AddProductProps, ProductTableProps } from "../_types/product.types";
import { useMemo, useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import { Download, Upload } from "lucide-react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { useGetCategories } from "../_hooks/useProducts";

const { TextArea } = Input;

const AddProduct = ({ onClose, open, type }: AddProductProps) => {
  const drawerTitle = useMemo(() => {
    return type === "form" ? "Add New Product" : "Import Sheet";
  }, [type]);

  const formComponent = useMemo(() => {
    return type === "form" ? <Form /> : <ImportForm />;
  }, [type]);

  return (
    <Drawer
      title={drawerTitle}
      onClose={onClose}
      open={open}
      size="large"
      maskClosable={false}
      footer={<Footer onClose={onClose} />}
    >
      {formComponent}
    </Drawer>
  );
};

const Form = () => {
  const categoryOptions = useSelector(
    (state) => state.products.productCategories
  )?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const _ = useGetCategories();

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <span>Name</span>
        <Input size="large" placeholder="Product name" />
      </div>
      <div className="grid gap-2">
        <span>Description</span>
        <TextArea size="large" placeholder="Product Description" />
      </div>
      <div className="grid gap-2">
        <span>Category</span>
        <Select
          showSearch
          placeholder="Select category"
          optionFilterProp="label"
          // onChange={onChange}
          // onSearch={onSearch}
          size="large"
          options={categoryOptions}
        />
      </div>
      <div className="grid gap-2">
        <span>Price</span>
        <InputNumber size="large" className="!w-full" placeholder="Price" />
      </div>
      <div className="flex gap-2 mt-4">
        <span>Active</span>
        <Switch defaultChecked />
      </div>
    </div>
  );
};

const ImportForm = () => {
  const [sheet, setSheet] = useState({
    data: [],
    step: 0,
  });
  const handleFileUpload = (file: Blob) => {
    const reader = new FileReader();

    // Process file after reading
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const sheet = workbook.Sheets[sheetName];

      // Parse the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setSheet({
        data: jsonData,
        step: 1,
      });
      console.log("Parsed Data:", jsonData); // Handle your parsed data here
    };

    // Read file as binary string
    reader.readAsBinaryString(file);

    // Return false to prevent auto upload
    return false;
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    maxCount: 1,
    accept: ".csv,.xlsx",
    beforeUpload: handleFileUpload,
  };

  const handleBack = () => {
    setSheet(state => ({...state, step: 0}))
  }

  return (
    <div className="grid grid-rows-[auto_1fr] gap-6 h-full">
      {sheet.step === 0 ? (
        <>
          <div className="flex justify-end">
            <Button
              className="!bg-black !text-white"
              size="large"
              icon={<Download />}
            >
              Download sample file
            </Button>
          </div>
          <Dragger {...props} className="h-[80%]">
            <div className="grid place-items-center mb-4">
              <Upload size={80} />
            </div>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single Excel/CSV file upload. Please upload
              formatted file only.
            </p>
          </Dragger>
        </>
      ) : (
        <ProductTable onBack={handleBack} />
      )}
    </div>
  );
};

const ProductTable = ({onBack}: ProductTableProps) => {
  return (
    <div className="flex flex-col gap-4">
        <div>
            <Button onClick={onBack}>Back</Button>
        </div>
        <div>Table here</div>
    </div>
  )
};

const Footer = ({ onClose }: Pick<AddProductProps, "onClose">) => {
  return (
    <div className="flex justify-end gap-4 h-16 px-4">
      <Button size="large" onClick={onClose}>
        Cancel
      </Button>
      <Button size="large" type="primary">
        Submit
      </Button>
    </div>
  );
};
export default AddProduct;
