import { cn } from "utils";
import { Panel } from "components/materials/Panel";
import { HTMLAttributes } from "react";

interface TitledPanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string
}

export const TogglePanel = ({
  title,
  description,
  className,
  children,
  ...props
}: TitledPanelProps) => {
  return (
    <Panel className={cn("p-8 flex-col", className)} {...props}>
      <p className="text-h-md font-bold">{title}</p>
      <p className="mt-1 text-t-lg text-neutral-700 font-light">{description}</p>
      <div className="mt-4">{children}</div>
    </Panel>
  );
};
