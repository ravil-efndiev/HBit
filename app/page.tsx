import Image from "next/image";
import Dashboard from "./dashboard/components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Link from "next/link";

const Home = () => {
  return (
    <main>
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
};

export default Home;
