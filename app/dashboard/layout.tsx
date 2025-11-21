import ProtectedRoute from "@/components/ProtectedRoute";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full overflow-hidden">
        {children}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
