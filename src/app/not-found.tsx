"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6">
      <div className="flex flex-col items-center text-center max-w-md">
        
        {/* Icon */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-100 text-purple-600 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-12 w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-5xl font-bold text-purple-600">404</h1>

        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-600">
          Oops! The page you’re looking for doesn’t exist or may have been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-purple-700"
        >
          Back to Home
        </Link>

        {/* Brand line */}
        <p className="mt-8 text-sm text-gray-400">
          CareNest — Caring made easy 💜
        </p>
      </div>
    </div>
  );
}
