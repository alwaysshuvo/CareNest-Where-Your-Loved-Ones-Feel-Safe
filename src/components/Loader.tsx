"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200">
      
      {/* Center Wrapper */}
      <div className="flex flex-col items-center gap-6 scale-110">
        
        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="h-28 w-28 rounded-full border-[6px] border-purple-200 border-t-purple-600 animate-spin" />

          {/* Inner pulse */}
          <div className="absolute h-20 w-20 rounded-full bg-purple-600/90 flex items-center justify-center shadow-2xl animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="white"
              className="h-9 w-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s-7-4.35-7-9a4 4 0 017-2.5A4 4 0 0119 12c0 4.65-7 9-7 9z"
              />
            </svg>
          </div>
        </div>

        {/* Brand Text */}
        <h1 className="text-2xl font-bold tracking-wide text-gray-800">
          CareNest
        </h1>

        {/* Subtitle */}
        <p className="text-base text-gray-600 animate-pulse">
          Preparing trusted care services...
        </p>
      </div>
    </div>
  );
}
