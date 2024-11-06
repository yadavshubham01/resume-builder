import Image from "next/image";
import localFont from "next/font/local";
import Link from 'next/link';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold mb-6">Welcome to Resume Builder</h1>
          <Link href="/resume-builder">
              <h1 className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Start Building Your Resume
              </h1>
          </Link>
      </div>
  );
}