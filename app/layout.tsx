import type { Metadata } from 'next';
import './globals.css';
import './storytelling.css';
export const metadata: Metadata = {
  title: 'Blinking — Real people. Real trust.',
  description: 'Explore Blinking’s configurable identity verification, digital onboarding, AML and PEP screening, watchlist checks, and video identification solutions.',
  icons: { icon: '/brand/blinking-logo.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
