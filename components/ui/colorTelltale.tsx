import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Diamond, Disc, LucideProps } from "lucide-react";
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
      outline: "text-outline",
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
  ...props
}: ColorTelltaleProps) => (
  <Diamond
    className={cn(colorTelltaleVariants({ variant }), className)}
    {...props}
  />
);

export { ColorTelltale, colorTelltaleVariants };
