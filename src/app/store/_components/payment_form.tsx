"use client";

import { formattedNumber } from "@/util/formatter/currency";
import { Drawer, Button, Divider, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, FocusEvent, useMemo, Suspense } from "react";
// import SelectWithImage from "./payment_selection";
import { RootState } from "@/lib/duxs/store";
import { useDispatch, useSelector } from "react-redux";
import {
  applyDiscount,
  cancelPayment,
  tenderAmount,
} from "@/lib/duxs/feature/store-pos/store-pos";
import { mockDiscountList } from "@/util/mocks/discount.mocks";

const PaymentForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    totalQty,
    total,
    subTotal,
    discount,
    payment: { amountChange },
  } = useSelector((state: RootState) => state.storePOS);
  const dispatch = useDispatch();
  const [amountReceived, setAmountReceived] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState({
    value: "",
    loading: false,
  });

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

  const handleChangeDiscount = (event: FocusEvent<HTMLInputElement>) => {
    setDiscountCode((prev) => ({
      ...prev,
      value: event.target.value,
    }));
  };

  const handleApplyCode = () => {
    setDiscountCode((prev) => ({
      ...prev,
      loading: true,
    }));
    const res = mockDiscountList.find(
      (item) => item.code === discountCode.value
    );
    setDiscountCode((prev) => ({
      ...prev,
      loading: false,
    }));

    if (res) {
      dispatch(
        applyDiscount({
          discount: res,
        })
      );
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    const currentParams = new URLSearchParams(searchParams.toString());

    // Remove the 'pay' query param if it exists
    currentParams.delete("pay");

    router.push(`?${currentParams.toString()}`);
    dispatch(cancelPayment())
  };

  const lessDiscount = useMemo(() => {
    return subTotal - total;
  }, [total, subTotal]);

  return (
    <Drawer
      height="100%"
      placement="bottom"
      title={
        <div className="h-20 text-black flex justify-center items-center">
          Checkout & Payment
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
        <div className="h-20">
          <Button
            size="large"
            type="primary"
            block
            className="h-20 text-2xl font-bold"
            loading
          >
            Place Order
          </Button>
        </div>
      }
    >
      <div className="grid grid-flow-row gap-2">
        <div className="bg-slate-200/10 w-2/4 text-white rounded-md mx-auto h-20 flex flex-row items-center justify-between p-4 ">
          <div className="flex flex-row gap-2 font-semibold">
            {/* <SelectWithImage /> */}
            <span>Subtotal</span>
          </div>
          <span className="font-bold text-2xl">
            {formattedNumber(subTotal)}
          </span>
        </div>
        <div className="bg-slate-200/10 w-2/4 text-white rounded-md mx-auto h-20 flex flex-row items-center justify-between p-4 ">
          <span className="font-bold">Total Qty</span>
          <span className="font-bold text-2xl">{totalQty}</span>
        </div>

        <div className="bg-slate-200/10 w-2/4 text-white rounded-md mx-auto h-20 flex flex-row items-center justify-between p-4 ">
          <span className="font-bold">Discount</span>
          <div className="w-72">
            {discount && discount?.code ? (
              <span className="text-right font-semibold text-lg block italic">
                Less: {formattedNumber(lessDiscount)}
              </span>
            ) : (
              <Input
                classNames={{
                  input:
                    "text-left !bg-black/90 border-none outline-none !text-white text-left text-2xl focus:bg-black/90 placeholder:text-white select-none",
                }}
                className="!h-14 !bg-black/90 "
                size="large"
                placeholder="Discount Code"
                value={discountCode.value}
                onChange={handleChangeDiscount}
                suffix={
                  <Button
                    loading={discountCode.loading}
                    onClick={handleApplyCode}
                  >
                    Apply
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>
      <Divider />
      <div className="grid grid-flow-row gap-2">
        <div className="bg-slate-200/10 w-2/4 text-white rounded-md mx-auto h-20 flex flex-row items-center justify-between p-4 ">
          <span className="font-bold">Amount Due</span>
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
      </div>
    </Drawer>
  );
};
const PaymentFormMain = () => {
  return (<Suspense>
    <PaymentForm />
  </Suspense>)
}

export default PaymentFormMain;
