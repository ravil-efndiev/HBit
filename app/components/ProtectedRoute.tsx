import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const ProtectedRoute = async ({ children }: PropsWithChildren) => {
  const currentUser = await getSessionUser();

  if (!currentUser) {
    redirect("/auth/signin");
  }

  return children;
};

export default ProtectedRoute;
