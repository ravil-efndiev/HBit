import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Mono, Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntuFont = Ubuntu({weight: ["300", "400", "500", "700"]});

export const metadata: Metadata = {
  title: "Habit tracker",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={ubuntuFont.className}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
