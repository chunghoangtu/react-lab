import { ResizableShadcnTable } from "@/features/table/components/ShadcnTable";
import { columns } from "../components/ShadcnTable/columns";
import { data } from "../components/ShadcnTable/data";

export default function TablePage() {
  return (
    <>
      {/* <SimpleTable /> */}
      {/* <ShadcnTable
        data={data}
        columns={columns}
      /> */}
      <ResizableShadcnTable
        data={data}
        columns={columns}
      />
    </>
  );
}
