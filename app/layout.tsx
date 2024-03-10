import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SignInContextProvider } from "@/contexts/SignInContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VocUp",
  description: "A dictionary web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SignInContextProvider>
        <body className={inter.className}>
          <main>
          <Header />
          {children}
          </main>
        </body>
      </SignInContextProvider>
    </html>
  );
}
