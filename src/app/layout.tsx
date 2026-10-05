import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'IC-MEMS 2027 | International Conference on Materials, Energy and Management for Sustainability',
  description:
    'International Conference on Materials, Energy and Management for Sustainability (IC-MEMS 2027), organised by Alva\'s Institute of Engineering and Technology, Moodbidri, Karnataka, India.',
  keywords: [
    'IC-MEMS 2027', 'International Conference', 'Materials', 'Energy', 'Sustainability',
    'Hydrogen', 'Renewable Energy', 'Environmental Engineering', 'Sustainable Management',
    'Green Finance', 'AIET', 'Moodbidri', 'Karnataka',
  ],
  openGraph: {
    type: 'website',
    url: 'https://aiet.org.in/icmems2027',
    title: 'IC-MEMS 2027 | International Conference on Materials, Energy and Management for Sustainability',
    description:
      'IC-MEMS 2027, organised by Alva\'s Institute of Engineering and Technology, Moodbidri. 16–17 September 2027, Hybrid Mode.',
    siteName: 'IC-MEMS 2027',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IC-MEMS 2027',
    description: 'International Conference on Materials, Energy and Management for Sustainability',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="pt-[88px] min-h-screen">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
