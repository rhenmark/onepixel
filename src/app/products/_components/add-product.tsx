import {
  Button,
  Drawer,
  Input,
  InputNumber,
  message,
  Select,
  Switch,
  UploadProps,
} from "antd";
import { AddProductProps } from "../_types/product.types";
import { useMemo } from "react";
import Dragger from "antd/es/upload/Dragger";
import { Download, Upload } from "lucide-react";
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
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
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

const props: UploadProps = {
  name: "file",
  multiple: false,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  maxCount: 1
};

const ImportForm = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-6 h-full">
      <div className="flex justify-end">
        <Button className="!bg-black !text-white" size="large" icon={<Download />}>
          Download sample file
        </Button>
      </div>
      <Dragger {...props} className="!h-full">
        <div className="grid place-items-center mb-4">
          <Upload size={80} />
        </div>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single Excel/CSV file upload. Please upload formatted
          file only.
        </p>
      </Dragger>
    </div>
  );
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
