import { useGetProductList } from "@/app/products/_hooks/useProducts";
import { Spin, List, Empty, Card, Input } from "antd";
import {  Flame, Snowflake } from "lucide-react";
import { ChangeEvent } from "react";
import { useFilter } from "../_hooks/useFilter";
import { ComponentProps } from "../_types/store-pos.types";

const { Search } = Input;

const ProductList = ({ onAddItem }: ComponentProps) => {
    const { data, loading } = useGetProductList();
    const {
      data: filteredData,
      searchQuery,
      setSearchQuery,
    } = useFilter({ items: data });
  
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    if (loading) {
      return (
        <div className="bg-white/20 rounded-sm grid h-full w-full place-items-center">
          <Spin size="large" spinning />
        </div>
      );
    }
  
    return (
      <div className="w-full">
        <div className="mb-4">
          <Search
            size="large"
            enterButton
            placeholder="Search here"
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>
        <div className="overflow-y-auto">
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={filteredData}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<span className="text-white">Empty</span>}
                />
              ),
            }}
            renderItem={(item) => (
              <List.Item>
                <Card
                  key={item.id}
                  className="h-[200px] w-full shadow-md transform transition-all duration-200 active:scale-95 active:bg-primary active:shadow-lg active:opacity-90"
                  onClick={() => onAddItem(item)}
                >
                  <div className="grid grid-flow-col items-center justify-between select-none	">
                    <div>
                      <span className="text-lg block">{item.name}</span>
                      <span className="font-bold text-2xl">
                        ₱ {Number(item.price).toFixed(2)}
                      </span>
                    </div>
                    {item.itemType && (
                      <div>
                        <span className="font-bold text-lg">
                          {item.itemType}
                          {item.itemType === "hot" && <Flame color="red" />}
                          {item.itemType === "cold" && <Snowflake color="blue" />}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  };

export default ProductList