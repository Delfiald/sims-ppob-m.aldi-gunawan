import Navbar from "@/components/Navbar/Navbar";

export default function AccountLayout({ children }) {
 return (
  <>
   <Navbar />
   <main>{children}</main>
  </>
 );
}
