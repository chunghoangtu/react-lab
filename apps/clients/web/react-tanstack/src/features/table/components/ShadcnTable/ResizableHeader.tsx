import { TableHead } from "@/components/shadcn/components/ui/table";
import { flexRender, type Header, type RowData } from "@tanstack/react-table";
import { features } from "./tableFeatures";
import { cn } from "@/lib/utils";

type ResizableHeaderProps<T extends RowData> = {
  header: Header<typeof features, T, unknown>;
};

export default function ResizableHeader<TValue extends RowData>({ header }: ResizableHeaderProps<TValue>) {
  const { column, colSpan } = header;
  const resizeHandler = header.getResizeHandler();

  return (
    <TableHead
      key={column.id}
      colSpan={colSpan}
      className={cn("relative bg-background p-2 text-left font-semibold")}
      style={{
        width: column.getSize(),
        flex: `0 0 ${column.getSize()}px`,
      }}
    >
      <span className='max-w-full overflow-hidden text-ellipsis whitespace-nowrap'>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </span>
      <div
        onDoubleClick={() => header.column.resetSize()}
        onMouseDown={resizeHandler}
        onTouchStart={resizeHandler}
        className={`hover:bg-primary/20 absolute top-0 right-0 h-full w-1.25 transition-colors
          duration-200 select-none ${header.column.getIsResizing() ? "bg-secondary" : ""}`}
        style={{ cursor: "col-resize", touchAction: "none" }}
      />
    </TableHead>
  );
}
