import { tableFeatures, useTable, type ColumnDef } from "@tanstack/react-table";
import PERSONS from "../MOCK_DATA.json";

const data: Person[] = [...PERSONS];
const features = tableFeatures({});
const columns: Array<ColumnDef<typeof features, Person>> = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "first_name",
  },
  {
    header: "Last Name",
    accessorKey: "last_name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "University",
    accessorKey: "university",
  },
];

function usePersonTable() {
  const { getHeaderGroups, getRowModel, FlexRender } = useTable({
    key: "person-table",
    features,
    columns,
    data,
  });

  return {
    headerGroups: getHeaderGroups(),
    rowModel: getRowModel(),
    FlexRender,
  };
}

export default function SimpleTable() {
  const { headerGroups, rowModel, FlexRender } = usePersonTable();

  return (
    <div className='p-5 flex justify-center w-full custom-table'>
      <table className='rounded-xl border-2 border-indigo-200 p-5 w-250'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : <FlexRender header={header} />}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rowModel.rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  <FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
