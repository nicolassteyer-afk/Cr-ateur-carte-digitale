import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./flams.css";

export const metadata: Metadata = {
  title: "Createur carte digitale",
  description: "Back-office minimaliste de creation de cartes digitales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
