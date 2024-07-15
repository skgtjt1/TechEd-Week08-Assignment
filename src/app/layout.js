import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unofficial Final Fantasy 14 Expansion Reviews",
  description: "A place to leave your own reviews of FF14 expansions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        {children}
        {/* <Footer></Footer> */}
      </body>
    </html>
  );
}
