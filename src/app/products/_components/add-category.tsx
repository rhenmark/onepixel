import { Button, Divider, Drawer, Input, List, notification } from "antd";
import { AddProductCategoryFooterProps, AddProductCategoryProps } from "../_types/product.types";
import { BetweenHorizontalStart, Minus, Plus } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { cafeProductCategories } from "../_constants/product-constants";
import { useAddCategories } from "../_hooks/useProducts";

const AddCategory = ({ onClose, open }: AddProductCategoryProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const {loading, doAddCategory} = useAddCategories()
  const [isPopulated, setIsPopulated] = useState(false);
  const [inputCategory, setInputCategory] = useState("")
  const [notificationApi, contextHolder] = notification.useNotification();;
  
  const onPopulate = () => {
    setCategories((prev: string[]) => [...prev, ...cafeProductCategories]);
    setIsPopulated(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> ) => {
    setInputCategory(e?.target?.value)
  }

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    setCategories((prev) => {
      const isExist = prev?.filter((item) => item.toLocaleLowerCase() === inputCategory.toLocaleLowerCase()).length
      
      if (!isExist) {
        setInputCategory("")
        return [...prev, inputCategory]
      }

      notificationApi.error({
        message: "Failed to add",
        description: `Category [ ${inputCategory} ] - already exist in the list`,
      });

      return prev
    })
  }

  const handleRemove = (item: string) => {
    setCategories((prev) => {
      const newList = prev.filter(listItem => listItem !== item)
      return newList
    })
  }

  const saveSuccessfully = () => {
    onClose()
    notification.success({
      message: "Success",
      description: "Added successfully"
    })
  }

  const handleSave = () => {
    doAddCategory(categories, saveSuccessfully)
  }
  
  return (
    <Drawer
      title={"Add Category"}
      onClose={onClose}
      open={open}
      size="large"
      maskClosable={false}
      footer={<Footer onClose={onClose} onClickSave={handleSave} loading={loading}/>}
    >
      <div>
      {contextHolder}
      <form className="grid gap-4 grid-cols-[1fr_auto] justify-center items-center" onSubmit={handleAdd}>
        <div className="grid gap-2">
          <span>Category Name</span>
          <Input size="large" placeholder="Category name" required minLength={4} onChange={handleInputChange} value={inputCategory}/>
        </div>
        <div className="h-full flex justify-center items-end w-20">
          <Button
            icon={<Plus color="#fff" />}
            size="large"
            className="!bg-black"
            htmlType="submit"
          />
        </div>
        </form>
      <Divider />
      {!isPopulated && (
        <div>
          <Button
            type="primary"
            icon={<BetweenHorizontalStart />}
            onClick={onPopulate}
          >
            Insert System{`'`}s default categories
          </Button>
        </div>
      )}
      <div>
        <List
          itemLayout="horizontal"
          dataSource={categories}
          renderItem={(item) => (
            <List.Item actions={[<Button key="list-loadmore-edit" danger icon={<Minus />} onClick={() => handleRemove(item)} />]}>
              <List.Item.Meta
                title={<span className="text-lg font-semibold">{item}</span>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>

    </Drawer>
  );
};


const Footer = ({ onClose, loading, onClickSave }: AddProductCategoryFooterProps) => {
  return (
    <div className="flex justify-end gap-4 h-16 px-4">
      <Button size="large" onClick={onClose}>
        Cancel
      </Button>
      <Button size="large" type="primary" onClick={onClickSave} loading={loading}>
        Save
      </Button>
    </div>
  );
};

export default AddCategory;
