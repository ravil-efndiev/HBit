"use client";

import { reqPost } from "@/lib/requests";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const SignoutButton = ({ className }: Props) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await reqPost("/api/auth/signout", {});
      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
    }
  }
     
  return (
    <button className={`btn btn-error ${className}`} onClick={handleClick}>Sign out</button>
  )
}

export default SignoutButton;
