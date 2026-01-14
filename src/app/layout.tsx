import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import "./globals.css";


export const metadata = {
  title: "CareNest",
  description: "Trusted Home Care Service Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
