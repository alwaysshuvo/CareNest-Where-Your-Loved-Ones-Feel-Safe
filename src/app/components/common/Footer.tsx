export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-xl font-semibold text-purple-600">
            CareNest
          </h3>
          <p className="text-gray-600 mt-2">
            Trusted home care services for your loved ones.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li>Home</li>
            <li>Services</li>
            <li>My Bookings</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-gray-600">support@carenest.com</p>
          <p className="text-gray-600">+880 1234-567890</p>
        </div>

      </div>

      <div className="text-center text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} CareNest. All rights reserved.
      </div>
    </footer>
  );
}
