import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "CyberClub Admin",
  description: "Admin panel for computer club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AppProvider>
          <div className="flex min-h-screen bg-slate-100">
            <Sidebar />
            <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
