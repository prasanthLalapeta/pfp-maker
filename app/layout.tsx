import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fredoka, Quicksand } from 'next/font/google';
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'] });
const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka'
});
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand'
});

export const metadata: Metadata = {
  title: 'Chibi PFP AI Generator',
  description: 'Transform your photos into adorable chibi-style cartoon avatars',
  metadataBase: new URL('https://pfp-maker-ai.vercel.app'),
  openGraph: {
    title: 'Chibi PFP AI Generator',
    description: 'Transform your photos into adorable chibi-style cartoon avatars',
    images: [
      {
        url: '/og-native.png',
        width: 1200,
        height: 630,
        alt: 'Chibi PFP AI Generator - Transform your photos into adorable chibi avatars',
      },
    ],
    type: 'website',
    url: 'https://pfp-maker-ai.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chibi PFP AI Generator',
    description: 'Transform your photos into adorable chibi-style cartoon avatars',
    images: ['/og-native.png'],
    creator: '@heylalapeta',
  },
  icons: {
    icon: [
      {
        url: '/magic-wand.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ],
    shortcut: '/magic-wand.png',
    apple: {
      url: '/magic-wand.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${fredoka.variable} ${quicksand.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
