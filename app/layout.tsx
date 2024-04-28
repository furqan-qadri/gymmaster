import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Button from "./components/Button";
import Datagrid from "./components/Datagrid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme";

<head>
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
  />
  <meta name="viewport" content="initial-scale=1, width=device-width" />
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
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <html lang="en">
            <body>
              <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex w-full">
                  <div className="w-60 fixed h-full overflow-y-auto">
                    <Sidebar />
                  </div>
                  <div className="xl:ml-64 mt-4 mx-4 flex-grow">
                    {children}
                    <Button />
                    <Datagrid />
                  </div>
                </div>
              </div>
            </body>
          </html>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ClerkProvider>
  );
}
