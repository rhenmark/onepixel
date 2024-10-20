import { mockCategories } from "@/app/products/_constants/product-constants";
import { List, Tooltip, Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";


const CategoryList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category");
  
    const handleFilter = (category: string) => {
      const currentParams = new URLSearchParams(searchParams.toString());
  
      // Update or add new query params
      currentParams.set("category", category);
      router.push(`?${currentParams.toString()}`);
    };
  
    return (
      <div className="text-white">
        <List
          dataSource={["All", ...mockCategories]}
          renderItem={(value) => {
            return (
              <Tooltip title={value} placement="right">
                <Button
                  onClick={() => handleFilter(value)}
                  className={`w-full bg-slate-300 mb-2 px-2 rounded-sm h-14 truncate ${
                    activeCategory === value ? "bg-white text-blue-500" : ""
                  }`}
                >
                  <span className="truncate">{value}</span>
                </Button>
              </Tooltip>
            );
          }}
        />
      </div>
    );
  };

export default CategoryList;