import { useMemo, useRef, useState } from "react";
import {
  useTable,
  type ColumnDef,
  type PaginationState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/shadcn/components/ui/table";

import ResizableCell from "./ResizableCell";
import ResizableHeader from "./ResizableHeader";
import { features, type DataTableFeatures } from "./tableFeatures";

type ResizableDataTableProps<TData extends RowData> = {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
};

export default function ResizableDataTable<TData extends RowData>({
  columns,
  data,
}: ResizableDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, // initial page index
    pageSize: 100, // default page size
  });
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableColumnResizing: true,
  });

  const totalTableWidth = useMemo(() => {
    return table.getTotalSize();
  }, [table.state.columnSizing]);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 35,
    overscan: 10,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();

  // Shared table props to ensure consistent rendering
  const tableProps = {
    style: {
      width: `${totalTableWidth}px`,
      tableLayout: "fixed" as const,
    },
  };

  return (
    <div
      className='flex h-200 w-full flex-col gap-5'
      style={{ maxWidth: "100%", overflow: "auto" }}
      ref={outerContainerRef}
    >
      <div
        className='rounded-md border border-indigo-300'
        style={{ width: Math.max(totalTableWidth, 100) + "px" }}
      >
        <div className='overflow-hidden'>
          <Table className='bg-indigo-200/30 text-white'>
            <TableHeader
              className='bg-linear-to-r from-violet-600 via-indigo-400 to-blue-400 text-white'
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <ResizableHeader
                        header={header}
                        key={header.id}
                      />
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          </Table>
        </div>
        <div
          ref={tableContainerRef}
          style={{
            width: Math.max(totalTableWidth, 100) + "px",
            height: "400px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Table
            className='bg-indigo-200/30 text-white'
            {...tableProps}
          >
            <TableBody
              style={{
                width: "100%",
                position: "relative",
                height: `${rowVirtualizer.getTotalSize()}px`,
              }}
            >
              {virtualRows?.length ? (
                virtualRows.map((virtualItem) => {
                  const row = rows[virtualItem.index];
                  return (
                    <TableRow
                      className='absolute top-0 left-0 flex w-full items-center
                        hover:bg-violet-200/30'
                      style={{
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                      key={virtualItem.key}
                      data-index={virtualItem.index}
                      data-state={row!.getIsSelected() && "selected"}
                    >
                      {row!.getVisibleCells().map((cell) => (
                        <ResizableCell
                          key={cell.id}
                          cell={cell}
                        />
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='text-muted flex-1 text-sm'>
        {table.getSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} rows
        selected
      </div>
    </div>
  );
}
