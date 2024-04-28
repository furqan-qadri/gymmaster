import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

<head>
  <link rel="icon" href="/favicon.ico" sizes="any" />
</head>;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GymMaster",
  description: "All-in-one gym management solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex w-full">
              <div className="w-60 fixed h-full overflow-y-auto">
                <Sidebar />
              </div>
              <div className="xl:ml-64 mt-4 mx-4 flex-grow">
                {children}hello
              </div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
