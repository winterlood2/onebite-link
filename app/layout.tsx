import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "링크를 저장하고 관리하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
