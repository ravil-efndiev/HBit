import { Metadata } from "next";
import { formStyles } from "@/auth/layout";
import { signinAction } from "./action";
import FormInput from "../components/FormInput";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In - Habit tracker",
};

interface Props {
  searchParams: Promise<{
    error?: string;
  }>;
}

const Signin = async ({ searchParams }: Props) => {
  const { error } = await searchParams;
  
  return (
    <form className={formStyles.content} action={signinAction}>
      <h2 className={formStyles.title}>Wellcome Back</h2>
      <FormInput name="email" />
      <FormInput name="password" />
      <input className={formStyles.button} type="submit" value="Sign In" />
      <p>
        Don't have an accout yet? <Link href="/auth/signup">Sign up</Link>.
      </p>
      {error && <p className="text-(--col-peach)">{error}</p>}
    </form>
  );
};

export default Signin;
