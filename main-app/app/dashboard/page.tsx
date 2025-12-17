import Dashboard from "@/dashboard/components/Dashboard";
import { type Metadata } from "next";
import Sidebar from "./components/Sidebar";
import TopBar from "../components/TopBar";

export const metadata: Metadata = {
  title: "Dashboard - Habit tracker",
};

const DashboardPage = () => {
  return (
    <>
      <div className="flex w-full overflow-hidden">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
};

export default DashboardPage;
