import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SignInContextProvider } from "@/contexts/SignInContext";
import { UserContextProvider } from "@/contexts/UserContext";

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
      <UserContextProvider>
      <SignInContextProvider>
        <body className={inter.className}>
          <main>
          <Header />
          {children}
          </main>
        </body>
      </SignInContextProvider>
      </UserContextProvider>
    </html>
  );
}
