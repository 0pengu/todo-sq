import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Providers } from "./providers";
import CustomNavbar from "@/app/components/CustomNavbar";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { Cross1Icon } from "@radix-ui/react-icons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo^2",
  description: "A simple todo app integrated with Discord.",
  generator: "",
  authors: [{ name: "Tahmid Ahmed", url: "https://midhat.io" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className)}>
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <CustomNavbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
