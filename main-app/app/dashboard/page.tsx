import Dashboard from "@/dashboard/components/Dashboard";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - HBit",
};

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
