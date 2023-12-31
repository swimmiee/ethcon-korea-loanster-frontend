import { FC } from "react";
import { cn } from "utils";

interface SelectionProps<T, ID> {
  selected: ID | null;
  setSelected: (item: T) => void;
  items: T[];
  getId: (item: T) => ID;
  Item: FC<T>;
  cols: number;
}

export const Selection = <T extends {}, ID>({
  selected,
  cols,
  items,
  Item,
  getId,
  setSelected,
}: SelectionProps<T, ID>) => {
  return (
    <div
      className={cn(
        "grid border-[0.5px] border-black",
        cols === 2
          ? "grid-cols-2"
          : cols === 3
          ? "grid-cols-3"
          : cols === 4
          ? "grid-cols-4"
          : cols === 5
          ? "grid-cols-5"
          : "grid-cols-1"
      )}
    >
      {items.map((item, i) => {
        const id = getId(item);
        return (
          <div
            onClick={() => setSelected(item)}
            key={i}
            className={cn(
              selected === id
                ? "bg-primary-300 border"
                : "bg-neutral-50 hover:bg-neutral-200",
              "border-[0.5px] border-black p-3 flex gap-3 items-center"
            )}
          >
            <Item {...item} />
          </div>
        );
      })}
    </div>
  );
};
