import { cn } from "utils";
import { Panel } from "components/materials/Panel";
import { HTMLAttributes } from "react";

interface TitledPanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const TogglePanel = ({
  title,
  className,
  children,
  ...props
}: TitledPanelProps) => {
  return (
    <Panel className={cn("p-8 flex-col", className)} {...props}>
      <p className="text-h-md font-bold">{title}</p>
      <div className="mt-4">{children}</div>
    </Panel>
  );
};
