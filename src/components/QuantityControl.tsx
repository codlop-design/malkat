"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";

type QuantityControlProps = {
  quantity: number;
};

const QuantityControl = ({ quantity }: QuantityControlProps) => {
  const [value, setValue] = useState<number>(quantity);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  return (
    <div className="flex items-center gap-2 border p-1 rounded-full">
      <Button
        size={"icon"}
        className="rounded-full bg-primary/90 text-white flex items-center justify-center"
        onClick={handleIncrement}
      >
        <Plus className="size-3" />
        <span className="sr-only">زيادة</span>
      </Button>
      <input
        type="number"
        value={value}
        className="text-center w-10"
        min={1}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <Button
        size={"icon"}
        className="rounded-full bg-primary/90 text-white flex items-center justify-center"
        onClick={handleDecrement}
      >
        <Minus className="size-3" />
        <span className="sr-only">تقليل</span>
      </Button>
    </div>
  );
};

export default QuantityControl;
