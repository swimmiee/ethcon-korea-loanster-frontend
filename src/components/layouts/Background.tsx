import { HTMLAttributes } from "react";
import { cn } from "utils";

const Background = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <main className={cn(" bg-background w-screen min-h-screen pb-20", className)} {...props} />;
};

export default Background;