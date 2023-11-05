import "./globals.css";
import type { Metadata } from "next";
import { geist } from "../lib/fonts";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "🚀",
  authors: {
    name: "Edgar Lopez Calomarde",
    url: "https://www.youtube.com/@THEskril70",
  },
  creator:"Edgar Lopez Calomarde",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"bg-god h-screen antialiased" + geist.className}>
        <main className="h-screen max-w-2xl m-auto pb-0 flex flex-col gap-2 ">
          {children}
        </main>
      </body>
    </html>
  );
}
