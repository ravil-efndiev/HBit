import type { Metadata } from "next";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="formLayout">
      {children}
    </div>
  );
}
