import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import RecoilRootProvider from "@/utils/RecoilRootProvider";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Wassup! 와썹 간편한 출석 관리 서비스",
  description: "간편한 출석 관리 서비스입니다.",
  icons: {
    icon: "/w.png",
  },
};

const myFont = localFont({
  src: [
    {
      path: "./fonts/SOYO Maple Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SOYO Maple Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRootProvider>
      <html lang="en" className="light">
        <Providers>
          <body className={myFont.className}>{children}</body>
        </Providers>
      </html>
    </RecoilRootProvider>
  );
}
