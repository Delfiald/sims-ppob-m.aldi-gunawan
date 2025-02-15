import Navbar from "@/components/Navbar/Navbar";
import UserSection from "@/components/UserSection/UserSection";

export default function AccountLayout({ children }) {
 return (
  <>
   <Navbar />
   <main>{children}</main>
  </>
 );
}
