"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";

type QuantityControlProps = {
  quantity: number;
  onChange?: (quantity: number) => void;
};

const QuantityControl = ({ quantity, onChange }: QuantityControlProps) => {
  const [internalValue, setInternalValue] = useState<number>(quantity);
  const value = onChange ? quantity : internalValue;

  const setValue = (next: number) => {
    const normalized = Math.max(1, next);
    if (onChange) {
      onChange(normalized);
      return;
    }
    setInternalValue(normalized);
  };

  return (
    <div className="flex items-center gap-2 rounded-full border p-1">
      <Button
        size="icon"
        type="button"
        className="flex items-center justify-center rounded-full bg-primary/90 text-white"
        onClick={() => setValue(value + 1)}
      >
        <Plus className="size-3" />
        <span className="sr-only">زيادة</span>
      </Button>
      <input
        type="number"
        value={value}
        className="w-10 text-center"
        min={1}
        onChange={(e) => setValue(Number(e.target.value) || 1)}
      />
      <Button
        size="icon"
        type="button"
        className="flex items-center justify-center rounded-full bg-primary/90 text-white"
        onClick={() => setValue(value - 1)}
      >
        <Minus className="size-3" />
        <span className="sr-only">تقليل</span>
      </Button>
    </div>
  );
};

export default QuantityControl;
