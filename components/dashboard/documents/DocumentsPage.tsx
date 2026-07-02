import DocumentsHeader from "./DocumentsHeader";
import DocumentFilters from "./DocumentFilters";
import DocumentsTable from "./DocumentsTable";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">

      <DocumentsHeader />

      <DocumentFilters />

      <DocumentsTable />

    </div>
  );
}