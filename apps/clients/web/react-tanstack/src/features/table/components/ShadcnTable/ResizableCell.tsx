import { flexRender, type Cell, type RowData } from "@tanstack/react-table";
import { features } from "./tableFeatures";
import { TableCell } from "@/components/shadcn/components/ui/table";

export default function ResizableCell<TData extends RowData>({
  cell,
}: {
  cell: Cell<typeof features, TData, unknown>;
}) {
  return (
    <TableCell
      key={cell.id}
      style={{ width: cell.column.getSize(), flex: `0 0 ${cell.column.getSize()}px` }}
    >
      <span className='block max-w-full overflow-hidden text-ellipsis whitespace-nowrap'>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </span>
    </TableCell>
  );
}
