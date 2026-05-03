import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Albert Mangiri — Software Engineer",
  description:
    "Software Engineer, Tech Lead, and Full-Stack Developer specializing in scalable systems, data engineering, and modern web applications.",
  keywords: ["Albert Mangiri", "Software Engineer", "Full-Stack Developer", "Data Engineer", "Tech Lead"],
  authors: [{ name: "Albert Mangiri" }],
  openGraph: {
    title: "Albert Mangiri — Software Engineer",
    description: "Software Engineer building scalable systems and beautiful interfaces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
