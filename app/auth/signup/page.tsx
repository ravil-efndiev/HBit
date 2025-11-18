import { Metadata } from "next";
import SignupForm from "@/auth/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up - Habit tracker",
};

const Signup = () => {
  return (
    <SignupForm />
  );
};

export default Signup;
