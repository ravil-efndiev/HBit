import { Metadata } from "next";
import SigninForm from "@/components/SigninForm";

export const metadata: Metadata = {
  title: "Sign In - Habit tracker",
};

const Signin = () => {
  return (
    <SigninForm />
  );
};

export default Signin;
