"use client";

import { post } from "@/lib/requests";
import { useRouter } from "next/navigation";

const SignoutButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await post("/api/auth/signout", {});
      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
    }
  }
     
  return (
    <button className="btn btn-error" onClick={handleClick}>Sign out</button>
  )
}

export default SignoutButton;
