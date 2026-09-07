import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'NeighbourHub - Local Services',
  description: 'Find trusted local professionals instantly.',
  openGraph: {
    title: 'NeighbourHub',
    description: 'Find trusted local professionals instantly.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeighbourHub',
    description: 'Find trusted local professionals instantly.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
