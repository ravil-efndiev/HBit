import { Metadata } from "next";
import { formStyles } from "../layout";
import { signupAction } from "./action";
import FormInput from "../components/FormInput";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up - Habit tracker",
};

interface Props {
  searchParams: Promise<{
    error?: string;
  }>;
}

const Signup = async ({ searchParams }: Props) => {
  const { error } = await searchParams;

  return (
    <form className={formStyles.content} action={signupAction}>
      <h2 className={formStyles.title}>Create an account</h2>
      <FormInput name="username" />
      <FormInput name="name" />
      <FormInput name="email" />
      <FormInput name="password" />
      <input className={formStyles.button} type="submit" value="Sign Up" />
      <p>
        Already have an accout? <Link href="/auth/signin">Sign In</Link>.
      </p>
      {error && <p className="text-(--col-peach)">{error}</p>}
    </form>
  );
};

export default Signup;
