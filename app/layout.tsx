import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://wdd430-portfolio.vercel.app"),
  title: {
    default: "Edward Tiyari | Full-Stack Developer Portfolio",
    template: "%s | Edward Tiyari",
  },
  description:
    "Full-stack web development portfolio showcasing Next.js applications, FocusStride sprint management, and software engineering projects.",
  openGraph: {
    title: "Edward Tiyari | Full-Stack Developer Portfolio",
    description:
      "Full-stack web development portfolio showcasing Next.js applications and FocusStride sprint management.",
    url: "/",
    siteName: "Edward Tiyari Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
