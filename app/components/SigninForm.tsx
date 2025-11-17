"use client";

import Link from "next/link";
import { formStyles } from "@/auth/layout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { post } from "@/lib/requests";

const SigninForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      const result = await post("/api/auth/signin", { email, password });
      console.log(result);
      router.push("/dashboard");
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <form className={formStyles.content} onSubmit={handleSubmit}>
      <h2 className={formStyles.title}>Wellcome Back</h2>
      <FormInput name="email" />
      <FormInput name="password" />
      <input className={formStyles.button} type="submit" value="Sign In" />
      <p>
        Don't have an accout yet? <Link href="/auth/signup">Sign up</Link>.
      </p>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SigninForm;
