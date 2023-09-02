import { RANGE } from "states/position.state";
import { cn } from "utils";

interface RangeGraphProps {
  range: RANGE;
}

export const RangeGraph = ({ range }: RangeGraphProps) => {
  return (
    <div className="flex [&>div]:w-6 [&>div]:border-black [&>div]:border items-end gap-2 mb-4 justify-center">
      <div className={cn("h-8", range >= 2 ? "bg-primary-50" : "bg-neutral-100")} />
      <div className={cn("h-12", range >= 2 ? "bg-primary-50" : "bg-neutral-100")} />
      <div className={cn("h-16", range >= 2 ? "bg-primary-50" : "bg-neutral-100")} />

      <div className={cn("h-20", range >= 1 ? "bg-primary-200" : "bg-neutral-100")} />
      <div className={cn("h-24", range >= 1 ? "bg-primary-200" : "bg-neutral-100")} />
      <div className={cn("h-28", range >= 1 ? "bg-primary-200" : "bg-neutral-100")} />

      <div className={cn("h-32", range >= 0 ? "bg-primary" : "bg-neutral-100")} />
      <div className={cn("h-36", range >= 0 ? "bg-primary" : "bg-neutral-100")} />
      <div className={cn("h-36", range >= 0 ? "bg-primary" : "bg-neutral-100")} />
      <div className={cn("h-32", range >= 0 ? "bg-primary" : "bg-neutral-100")} />

      <div className={cn("h-28", range >= 1 ? "bg-primary-200" : "bg-neutral-100")} />
      <div className={cn("h-24", range >= 1 ? "bg-primary-200" : "bg-neutral-100")} />
      <div className={cn("h-20", range >= 1 ? "bg-primary-200" : "bg-neutral-100")} />

      <div className={cn("h-16", range >= 2 ? "bg-primary-50" : "bg-neutral-100")} />
      <div className={cn("h-12", range >= 2 ? "bg-primary-50" : "bg-neutral-100")} />
      <div className={cn("h-8", range >= 2 ? "bg-primary-50" : "bg-neutral-100")} />
    </div>
  );
};
