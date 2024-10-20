import { formattedNumber } from "@/util/formatter/currency";
import { Drawer, Button, Divider, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, FocusEvent } from "react";
import SelectWithImage from "./payment_selection";
import { RootState } from "@/lib/duxs/store";
import { useDispatch, useSelector } from "react-redux";
import { tenderAmount } from "@/lib/duxs/feature/store-pos/store-pos";

const PaymentForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    totalQty,
    total,
    payment: { amountChange },
  } = useSelector((state: RootState) => state.storePOS);
  const dispatch = useDispatch();
  const [amountReceived, setAmountReceived] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const payEnabled = Boolean(searchParams.get("pay"));
    setIsOpen(payEnabled);
  }, [searchParams]);
  // const [selectedPayment, setSelectedPayment] = useState<FormOfPayment>("Cash");
  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    console.log("event ==>", Number(event.target.value).toFixed(2));
    dispatch(
      tenderAmount({
        // @TODO temporary set const value
        paymentMethod: "cash",
        tenderAmount: Number(event.target.value).toFixed(2),
      })
    );
  };

  const onChange = (event: FocusEvent<HTMLInputElement>) => {
    setAmountReceived(event.target.value.replace(/[^0-9.]/g, "  "));
  };

  const handleClose = () => {
    setIsOpen(false);
    const currentParams = new URLSearchParams(searchParams.toString());

    // Remove the 'pay' query param if it exists
    currentParams.delete("pay");

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <Drawer
      height="90%"
      placement="bottom"
      title={
        <div className="h-20 text-black flex justify-center items-center">
          Payment & Receipt
        </div>
      }
      open={isOpen}
      destroyOnClose
      maskClosable={false}
      onClose={handleClose}
      rootClassName="!p-0"
      classNames={{
        header: "!py-0 px-8 bg-white grid place-items-center",
      }}
      className="!bg-black !text-white !p-0"
      footer={
        <div>
          <Button size="large" type="primary" danger>
            Save and Print
          </Button>
        </div>
      }
    >
      <div className="grid grid-flow-rpow gap-2">
        <div className="bg-slate-200/10 w-2/4 text-white rounded-md mx-auto h-20 flex flex-row items-center justify-between p-4 ">
          <div className="flex flex-row gap-2 font-semibold">
            <SelectWithImage />
          </div>
          <span className="font-bold text-2xl">{formattedNumber(total)}</span>
        </div>
        <div className="bg-slate-200/10 w-2/4 text-white rounded-md mx-auto h-20 flex flex-row items-center justify-between p-4 ">
          <span className="font-semibold">Tendered Amount</span>
          <span className="font-bold text-2xl">
            <Input
              autoFocus={true}
              className="!h-14 w-72 bg-black/90 border-none outline-none text-white text-right text-2xl focus:bg-black/90 placeholder:text-white select-none"
              placeholder="0.00"
              onBlur={onBlur}
              pattern="^[0-9]*[.]?[0-9]+$"
              onChange={onChange}
              value={amountReceived}
            />
          </span>
        </div>
        <div className="bg-slate-200/10 w-2/4 text-white rounded-md mx-auto h-20 flex flex-row items-center justify-between p-4 ">
          <span>Change</span>
          <span className="font-bold text-2xl">
            {formattedNumber(amountChange)}
          </span>
        </div>
        <div className="bg-slate-200/10 w-2/4 text-white rounded-md mx-auto h-20 flex flex-row items-center justify-between p-4 ">
          <span>Add Discount</span>
          <div className="w-72">
            <Input
              classNames={{
                input: "text-left !bg-black/90 border-none outline-none !text-white text-left text-2xl focus:bg-black/90 placeholder:text-white select-none"
              }}
              className="!h-14 !bg-black/90 "
              
              size="large"
              placeholder="Discount Code"
              suffix={<Button loading>Apply</Button>}
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className="bg-slate-200/10 w-2/4 text-white rounded-md mx-auto h-20 flex flex-row items-center justify-between p-4 ">
        <span>Total Qty</span>
        <span className="font-bold text-2xl">{totalQty}</span>
      </div>
    </Drawer>
  );
};

export default PaymentForm;
