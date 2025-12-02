import ProtectedRoute from "@/components/ProtectedRoute";
import TopBar from "./components/TopBar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <TopBar />
        {children}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
