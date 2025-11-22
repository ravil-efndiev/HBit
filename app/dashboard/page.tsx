import Dashboard from "@/dashboard/components/Dashboard";
import { type Metadata } from "next";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard - Habit tracker",
};

const DashboardPage = () => {
  return (
    <>
      <Sidebar />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
