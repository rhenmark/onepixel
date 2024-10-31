import {
  Button,
  Drawer,
  Input,
  InputNumber,
  Select,
  UploadProps,
} from "antd";
import { AddProductProps, ProductTableProps } from "../_types/product.types";
import { useMemo, useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import { Download, Upload } from "lucide-react";
import { useSelector } from "react-redux";
import {read, utils} from "xlsx";
import {
  ProductCategoryStateProps,
} from "@/lib/duxs/feature/product/product";
import { RootState } from "@/lib/duxs/store";
import { useForm } from "react-hook-form";

const { TextArea } = Input;

const AddProduct = ({ onClose, open, type }: AddProductProps) => {
    const {
        // register,
        handleSubmit,
        // watch,
        // formState: { errors },
      } = useForm<FormInputs>()

  const drawerTitle = useMemo(() => {
    return type === "form" ? "Add New Product" : "Import Sheet";
  }, [type]);

  const formComponent = useMemo(() => {
    return type === "form" ? <Form /> : <ImportForm />;
  }, [type]);

  const obSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={obSubmit}>
        <Drawer
        title={drawerTitle}
        onClose={onClose}
        open={open}
        size="large"
        maskClosable={false}
        footer={<Footer onClose={onClose}  />}
        >
        {formComponent}
        </Drawer>
    </form>
  );
};

type FormInputs = {
    name: string;
    description: string;
    // id reference to category
    category: string;
    price: number;
}

const Form = () => {
  const categoryOptions =
    useSelector((state: RootState) => state.products.productCategories) || [];
  const options = categoryOptions?.map((item: ProductCategoryStateProps) => ({
    value: item.id,
    label: item.name,
  }));

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
          options={options}
        />
      </div>
      <div className="grid gap-2">
        <span>Price</span>
        <InputNumber size="large" className="!w-full" placeholder="Price" />
      </div>
      {/* <div className="flex gap-2 mt-4">
        <span>Active</span>
        <Switch defaultChecked />
      </div> */}
    </div>
  );
};

const ImportForm = () => {
  const [sheet, setSheet] = useState<{data: unknown[], step: number}>({
    data: [],
    step: 0,
  });
  const handleFileUpload = (file: Blob) => {
    const reader = new FileReader();

    // Process file after reading
    reader.onload = (event) => {
      const data = event?.target?.result;
      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const sheet = workbook.Sheets[sheetName];

      // Parse the sheet to JSON
      const jsonData = utils.sheet_to_json(sheet) || [];
      setSheet({
        data: jsonData || [],
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
    setSheet((state) => ({ ...state, step: 0 }));
  };

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

const ProductTable = ({ onBack }: ProductTableProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button onClick={onBack}>Back</Button>
      </div>
      <div>Table here</div>
    </div>
  );
};


type FooterProps = Pick<AddProductProps, "onClose"> & {
    onSubmit?: () => void
}

const Footer = ({ onClose }: FooterProps) => {
  return (
    <div className="flex justify-end gap-4 h-16 px-4">
      <Button size="large" onClick={onClose}>
        Cancel
      </Button>
      <Button size="large" type="primary" htmlType="submit">
        Submit
      </Button>
    </div>
  );
};
export default AddProduct;
