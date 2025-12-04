import Image from "next/image";
import Dashboard from "./dashboard/components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Link from "next/link";
import { request } from "@/lib/requests";

const Home = async () => {
  // const res = await request(
  //   "http://localhost:5000/public-activities",
  //   "GET",
  //   { "x-api-key": process.env.PUBLIC_SERVICE_API_KEY || "" },
  // );
  return (
    <main>
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
};

export default Home;
