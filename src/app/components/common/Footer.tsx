import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo-icon.png"
              alt="CareNest Logo"
              width={52}
              height={52}
            />
            <h3 className="text-2xl font-bold">
              Care<span className="text-purple-600">Nest</span>
            </h3>
          </div>
          <p className="text-gray-600 mt-3 max-w-sm">
            Trusted home care services for children, elderly, and special care —
            safe, reliable, and compassionate.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Quick Links
          </h4>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link href="/" className="hover:text-purple-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-purple-600 transition">
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/my-bookings"
                className="hover:text-purple-600 transition"
              >
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Contact
          </h4>
          <p className="text-gray-600">📧 support@carenest.com</p>
          <p className="text-gray-600 mt-2">📞 +880 1234-567890</p>
          <p className="text-gray-600 mt-2">🏠 Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t py-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-gray-700">CareNest</span>. All rights reserved.
      </div>
    </footer>
  );
}
