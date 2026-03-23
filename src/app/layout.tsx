import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portafolio | Allan Rodriguez Venegas",
  description: "Portafolio universitario con resoluciones matemáticas e implementaciones lógicas para la Universidad CENFOTEC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="antialiased selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
