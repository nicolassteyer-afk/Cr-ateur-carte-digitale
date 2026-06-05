import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Createur carte digitale",
  description: "Back-office minimaliste de creation de cartes digitales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
