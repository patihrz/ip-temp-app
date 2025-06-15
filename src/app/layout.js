import { Inter } from 'next/font/google';
import './globals.css';

// Menginisialisasi font Inter dengan subset 'latin'
const inter = Inter({ subsets: ['latin'] });

// Metadata untuk SEO dan tab browser
export const metadata = {
  title: 'IP Temp - Temporary File Sharing',
  description: 'Upload, share, and forget. Files are deleted after 3 hours.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Menerapkan kelas font dan kelas animasi gradien ke tag body */}
      <body className={`${inter.className} animated-gradient`}>{children}</body>
    </html>
  );
}