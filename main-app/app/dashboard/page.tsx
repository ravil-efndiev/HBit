import Dashboard from "@/dashboard/components/Dashboard";
import { type Metadata } from "next";
import Sidebar from "./components/Sidebar";
import TopBar from "../components/TopBar";

export const metadata: Metadata = {
  title: "Dashboard - HBit",
};

const DashboardPage = () => {
  return (
    <>
      <div className="content">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
};

export default DashboardPage;
