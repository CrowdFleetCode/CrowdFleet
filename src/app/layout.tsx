import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrowdFleet",
  description: "CrowdFleet is a DAO-driven platform that allows users to collectively purchase and share expensive professional equipment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
