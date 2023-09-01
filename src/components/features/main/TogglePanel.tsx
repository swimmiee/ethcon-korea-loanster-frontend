import { cn } from "utils";
import { Panel } from "components/materials/Panel";
import { HTMLAttributes, useState } from "react";

interface TitledPanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  disabled?: boolean;
  height: `h-[${number}px]`;
}

export const TogglePanel = ({
  title,
  className,
  children,
  height,
  ...props
}: TitledPanelProps) => {
  const [open, isOpen] = useState<boolean>(true);
  // const toggle = () => isOpen((p) => !p);
  return (
    <Panel className={cn("p-8 flex-col", className)} {...props}>
      <p className="text-h-md font-bold">{title}</p>
      <div
        className={cn(
          "duration-300 overflow-hidden",
          open ? height : "h-0",
          open && "pt-6"
        )}
      >
        {children}
      </div>
    </Panel>
  );
};
