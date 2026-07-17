import type { Metadata } from "next";
import "@fontsource/archivo-black";
import "@fontsource-variable/instrument-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAQUES.DESIGN — Sensible Web Development",
  description:
    "Websites, apps & projects. Made in Melbourne. Booking work from September 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <a className="skip-link" href="#access">
          Skip to booking
        </a>
        {children}
      </body>
    </html>
  );
}
