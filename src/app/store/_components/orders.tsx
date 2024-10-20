import { formattedNumber } from "@/util/formatter/currency";
import { List, Empty, Space, Button, InputNumber } from "antd";
import { MinusIcon, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ComponentProps } from "../_types/store-pos.types";
import { RootState } from "@/lib/duxs/store";
import { processPayment } from "@/lib/duxs/feature/store-pos/store-pos";

const OrdersList = ({ onAddItem, onRemoveItem }: ComponentProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch()
    const { orders, subTotal, totalQty } = useSelector((state: RootState) => state.storePOS);
  
    const handlePay = () => {
      const currentParams = new URLSearchParams(searchParams.toString());
      // Update or add new query params
      currentParams.set("pay", "true");
      router.push(`?${currentParams.toString()}`);
      dispatch(processPayment())

    };
  
    return (
      <div className="p-4 grid grid-rows-[1fr_auto] h-full max-h-full">
        <div className="h-full max-h-full overflow-y-auto">
          <List
            footer={
              <div className="text-white flex flex-col gap-2">
                <div className="font-semibold">Qty: {totalQty}</div>
                <div className="font-semibold">Less (Discount): 0</div>
              </div>
            }
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<span className="text-white">No transaction</span>}
                />
              ),
            }}
            dataSource={orders}
            className="grid grid-rows-[1fr_auto] h-full"
            renderItem={(order) => (
              <List.Item className="!px-0 select-none">
                <div className="grid grid-flow-row text-white w-full">
                  <span className="!text-white text-lg">
                    {order.item.name}{" "}
                    {order.item.itemType && `(${order.item.itemType})`}
                  </span>
                  <div className="flex justify-between">
                    <span className="font-bold">P {order.item.price}</span>
                    <span className="font-bold">
                      P {Number(order.subTotal).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="grid place-items-center grid-flow-col">
                  <Space.Compact style={{ width: "70%" }}>
                    <Button
                      size="large"
                      variant="solid"
                      icon={<MinusIcon />}
                      onClick={
                        onRemoveItem ? () => onRemoveItem(order.item) : () => null
                      }
                    />
                    <InputNumber
                      min={0}
                      value={order.qty}
                      max={100}
                      size="large"
                      readOnly
                    />
                    <Button
                      type="primary"
                      size="large"
                      icon={<Plus />}
                      onClick={() => onAddItem(order.item)}
                    />
                  </Space.Compact>
                </div>
              </List.Item>
            )}
            size="large"
          />
        </div>
        <div className="h-full">
          <span>QTY: </span>
          <Button
            onClick={handlePay}
            className="!h-20 flex flex-row justify-between items-center w-full bg-primary text-white px-4 rounded-md"
          >
            <span className="block float-left text-xl">Pay</span>
            <span className="block text-2xl font-bold">
              {formattedNumber(subTotal)}
            </span>
          </Button>
        </div>
      </div>
    );
  };
  
export default OrdersList