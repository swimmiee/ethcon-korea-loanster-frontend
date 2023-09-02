import { HTMLAttributes } from "react";
import { cn } from "utils";

export const Panel = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex bg-white border-1.5", className)}
      {...props}
    />
  );
};
