import { createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@/components/shadcn/components/ui/checkbox";
import { HeaderButton } from "./HeaderButton";
import { type DataTableFeatures } from "./tableFeatures";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/components/ui/dropdown-menu";
import { Button } from "@/components/shadcn/components/ui/button";
import { MoreVertical } from "lucide-react";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, User>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "action",
    header: ({ table }) => (
      <Checkbox
        className='mx-6 cursor-pointer'
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select All'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className='mx-3 cursor-pointer'
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select Row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    enableMultiSort: false,
  }),
  columnHelper.accessor("firstName", {
    header: (info) => (
      <HeaderButton
        info={info}
        name='First Name'
      />
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: (info) => (
      <HeaderButton
        info={info}
        name='Last Name'
      />
    ),
  }),
  columnHelper.accessor("email", {
    header: (info) => (
      <HeaderButton
        info={info}
        name='Email'
      />
    ),
  }),
  columnHelper.accessor("age", {
    header: (info) => (
      <HeaderButton
        info={info}
        name='Age'
      />
    ),
  }),
  columnHelper.accessor("comments", {
    header: (info) => (
      <HeaderButton
        info={info}
        name='Comments'
      />
    ),
  }),
  columnHelper.display({
    id: "more",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"} className='cursor-pointer'>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup className='bg-indigo-400 text-white'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Copy</DropdownMenuItem>
              <DropdownMenuItem>Cut</DropdownMenuItem>
              <DropdownMenuItem>Paste</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    enableMultiSort: false,
  }),
]);
