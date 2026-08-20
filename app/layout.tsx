import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

async function getSiteOrigin() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const forwardedProto = requestHeaders.get("x-forwarded-proto");
  const protocol =
    forwardedProto?.split(",")[0]?.trim() ??
    (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getSiteOrigin();

  return {
    metadataBase: new URL(origin),
    title: "Feine Gravur | Personalisierte Geschenke",
    description:
      "Mehrsprachiger E-Shop-Prototyp für Weihnachtskugeln, Holz-Lesezeichen, Anhänger, Flaschenöffner und Kugelschreiber mit Gravur.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Feine Gravur | Personalisierte Geschenke",
      description:
        "Konfigurierbare Gravurgeschenke mit eigener Namensgravur, Logo-Motiv und Sprachumschaltung.",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "Feine Gravur Produktkonfigurator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Feine Gravur | Personalisierte Geschenke",
      description:
        "Konfigurierbare Gravurgeschenke mit eigener Namensgravur, Logo-Motiv und Sprachumschaltung.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
