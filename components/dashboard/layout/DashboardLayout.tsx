import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-[#F8F9FC]">

      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-72 border-r bg-white">
        <Sidebar />
      </div>

      {/* Right Section */}
      <div className="ml-72 flex h-screen flex-col">

        {/* Sticky Topbar */}
        <div className="sticky top-0 z-50">
          <Topbar />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}