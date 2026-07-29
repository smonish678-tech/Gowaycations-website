import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
export const metadata: Metadata = { title: "Gowaycations | Travel Without Limits", description: "Expertly planned holidays, tailored to you." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={montserrat.variable}>{children}</body></html>; }
