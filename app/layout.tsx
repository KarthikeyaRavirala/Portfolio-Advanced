import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Karthikeya Ravirala | AI Engineering & Tech Creator",
    template: "%s | Karthikeya Ravirala"
  },
  description: "Innovative AI Engineer & Top LinkedIn Creator showcasing cutting-edge projects and expertise in AI, ML, and tech content creation",
  keywords: ["AI Engineer", "Machine Learning", "Tech Creator", "LinkedIn Top Creator", "Portfolio", "AI Projects", "Innovation"],
  authors: [{ name: "Karthikeya Ravirala" }],
  creator: "Karthikeya Ravirala",
  metadataBase: new URL('https://karthikeyaravirala.github.io/portfolio'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://karthikeyaravirala.github.io/portfolio",
    title: "Karthikeya Ravirala | AI Engineering & Tech Creator",
    description: "Innovative AI Engineer & Top LinkedIn Creator showcasing cutting-edge projects and expertise",
    siteName: "Karthikeya Ravirala Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Placeholder - you would need to create this
        width: 1200,
        height: 630,
        alt: "Karthikeya Ravirala Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthikeya Ravirala | AI Engineering & Tech Creator",
    description: "Innovative AI Engineer & Top LinkedIn Creator showcasing cutting-edge projects and expertise",
    images: ["/og-image.jpg"], // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#1B2631] text-[#F0F4F8] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}