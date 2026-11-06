import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/shadcn/components/ui/context-menu";
import type { HeaderContext } from "@tanstack/react-table";
import { ArrowDownAZ, ArrowDownZa } from "lucide-react";
import { features } from "./tableFeatures";

type HeaderButtonProps<T> = {
  info: HeaderContext<typeof features, User, T>;
  name: string;
};

export function HeaderButton<TValue>({
  info: { column, table },
  name,
}: HeaderButtonProps<TValue>) {
  const isSorted = column.getIsSorted();

  return (
    <ContextMenu>
      <ContextMenuTrigger
        className='flex p-3 translate-0 items-center bg-transparent text-white shadow-none cursor-pointer'
        onPointerDown={(e) => {
          e.preventDefault();
          if (e.button === 2) return;
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        {name}
        {isSorted === "asc" && <ArrowDownAZ className='ml-2 h-4 w-4' />}
        {isSorted === "desc" && <ArrowDownZa className='ml-2 h-4 w-4' />}
        {/* <ArrowUpDown className='ml-2 h-4 w-4' /> */}
      </ContextMenuTrigger>
      <ContextMenuContent className='bg-indigo-400 text-white'>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <ContextMenuCheckboxItem
              closeOnClick
              key={column.id}
              className='capitalize'
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </ContextMenuCheckboxItem>
          ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
