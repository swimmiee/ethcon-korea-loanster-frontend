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
  setSelected,
  cols,
  items,
  getId,
  Item,
}: SelectionProps<T, ID>) => {
  return (
    <div
      className={cn(
        "grid border-[0.5px] border-neutral-200",
        cols === 2
          ? "grid-cols-2"
          : cols === 3
          ? "grid-cols-3"
          : cols === 4
          ? "grid-cols-4"
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
                ? "bg-white border"
                : "bg-neutral-100 hover:bg-[#FAFAFA]",
              "border-[0.5px] border-neutral-200 p-3 flex gap-3 items-center"
            )}
          >
            <Item {...item} />
          </div>
        );
      })}
    </div>
  );
};
