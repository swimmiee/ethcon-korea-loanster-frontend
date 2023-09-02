import { cn } from "utils";
import { Task } from "./tx.service";

interface StepperProps {
  tasks: Task[];
}

interface CircleProps extends Task {
  index: number;
  active?: boolean;
}
const Circle = ({ index, active, title, description }: CircleProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          active ? "bg-primary border-black" : "bg-background",
          "border-1.5 w-12 h-12 rounded-full flex items-center"
        )}
      >
        <p
          className={cn(
            !active && "text-neutral-400",
            "flex-1 text-t-lg text-center"
          )}
        >
          {index}
        </p>
      </div>
      <div className="my-1 bg-primary-100 px-2 rounded-md">
        <p>{title}</p>
      </div>
      <p>{description}</p>
      <div></div>
    </div>
  );
};

export const Stepper = ({ tasks }: StepperProps) => {
  return (
    <div className="flex flex-col px-4 py-6 justify-evenly gap-10">
      {tasks.map((t, i) => (
        <Circle key={i} index={i + 1} active {...t} />
      ))}
    </div>
  );
};
