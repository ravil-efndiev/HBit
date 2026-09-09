import ProtectedRoute from "@/components/ProtectedRoute";
import TopBar from "../components/TopBar";
import DashboardShell from "./components/DashboardShell";
import Sidebar from "./components/Sidebar";


const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-background">
        <DashboardShell header={<TopBar />} sidebar={<Sidebar />}>
          {children}
        </DashboardShell>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
