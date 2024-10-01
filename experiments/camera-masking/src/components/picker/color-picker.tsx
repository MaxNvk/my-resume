"use client";

import { forwardRef, useEffect, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "../../lib/utils";
import { useForwardedRef } from "../../lib/use-forwarded-ref";
import type { ButtonProps } from "./button";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Input } from "./input";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const [internalValue, setInternalValue] = useState(value || "#ffffff");

    const changeValue = (newVal: string) => {
      onChange(newVal);
      setInternalValue(newVal);
    };

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn("block", className)}
            name={name}
            onClick={() => setOpen(true)}
            size="icon"
            style={{
              backgroundColor: internalValue,
            }}
            variant="outline"
          >
            <div />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full">
          <HexColorPicker color={internalValue} onChange={changeValue} />
          <Input
            maxLength={7}
            onChange={(e) => changeValue(e?.currentTarget?.value)}
            ref={ref}
            value={internalValue}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
