import Navbar from "@/components/Navbar/Navbar";
import UserSection from "@/components/UserSection/UserSection";

export default function MainLayout({ children }) {
 return (
  <>
   <Navbar />
   <UserSection />
   <main>{children}</main>
  </>
 );
}
