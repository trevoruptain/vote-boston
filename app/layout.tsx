import { Inter } from "next/font/google";
import { Footer } from "./components/Footer";
import Logo from "./components/Logo";
import ProjectListDropdown from "./components/ProjectListDropdown";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vote Boston",
  description: "Find your polling location in Boston",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <header className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <Logo />
              <ProjectListDropdown />
            </div>
          </header>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
