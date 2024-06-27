import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Circle, LucideProps } from "lucide-react";
import * as React from "react";

const colorTelltaleVariants = cva("w-4 h-4", {
  variants: {
    variant: {
      default: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      pinklight: "text-pinklight",
      pinkdark: "text-pinkdark",
      // outline: "text-outline",
      purple: "text-purple",
      orange: "text-orange",
    },
  },
  defaultVariants: { variant: "default" },
});

type ColorTelltaleProps = VariantProps<typeof colorTelltaleVariants> &
  LucideProps;

const ColorTelltale = ({
  variant,
  className,
  // fill: customFill = undefined,
  ...props
}: ColorTelltaleProps) => {
  const fillclass = colorTelltaleVariants({ variant });

  return (
    <Circle
      className={cn(
        colorTelltaleVariants({ variant }),
        fillclass,
        "fill-current",
        className,
      )}
      {...props}
    />
  );
};

export { ColorTelltale, colorTelltaleVariants };
