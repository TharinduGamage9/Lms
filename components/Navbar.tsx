'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              {/* <Image
                src="/logo.png"
                alt="Help2Study Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              /> */}
              <span className="text-xl font-bold text-indigo-600">Help2Study</span>
            </Link>
          </div>
          <div className="flex items-center">
          
          </div>
        </div>
      </div>
    </nav>
  );
}

