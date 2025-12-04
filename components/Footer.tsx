'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm">
            © {currentYear} Free Note. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
          Credit by owners – these are the notes.
          </p>
        </div>
      </div>
    </footer>
  );
}

