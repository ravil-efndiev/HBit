"use client";

import Link from "next/link";
import { formStyles } from "@/auth/layout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { post } from "@/lib/requests";

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await post("/api/auth/signup", { name, email, password });
      console.log(result);
      router.push("/dashboard");
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <form className={formStyles.content} onSubmit={handleSubmit}>
      <h2 className={formStyles.title}>Create an account</h2>
      <FormInput name="name" />
      <FormInput name="email" />
      <FormInput name="password" />
      <input className={formStyles.button} type="submit" value="Sign Up" />
      <p>
        Already have an accout? <Link href="/auth/signin">Sign In</Link>.
      </p>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupForm;
