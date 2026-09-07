import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Blinking — Real people. Real trust.',
  description: 'Turn a first interaction into a trusted relationship. Explore Blinking’s configurable identity verification, video identification, and digital onboarding solutions.',
  icons: { icon: '/brand/blinking-logo.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
