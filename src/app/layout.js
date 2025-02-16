import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
 title: "SIMS PPOB - M.Aldi Gunawan",
};

export default function RootLayout({ children }) {
 return (
  <html lang="en">
   <body>
    <Navbar />
    <main>{children}</main>
   </body>
  </html>
 );
}
