import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import UserSection from "@/components/UserSection/UserSection";

export const metadata = {
 title: "SIMS PPOB - M.Aldi Gunawan",
};

export default function RootLayout({ children }) {
 return (
  <html lang="en">
   <body>
    <Navbar />
    <UserSection />
    <main>{children}</main>
   </body>
  </html>
 );
}
