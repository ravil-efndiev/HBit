import ProtectedRoute from "@/components/ProtectedRoute";
import type { Metadata } from "next";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
};

export default DashboardLayout;
