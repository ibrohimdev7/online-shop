import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Online Shop",
  description: "Build your dreams with us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
