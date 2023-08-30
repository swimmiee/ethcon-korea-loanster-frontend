import { cn } from "utils";
import { Panel } from "components/materials/Panel";
import { HTMLAttributes } from "react";

interface TitledPanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const TitledPanel = ({
  title,
  className,
  children,
  ...props
}: TitledPanelProps) => {
  return (
    <Panel className={cn("flex-col p-6", className)} {...props}>
      <p className="text-h-sm font-bold">{title}</p>
      <hr className="my-4" />
      {children}
    </Panel>
  );
};
