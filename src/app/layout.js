import ReduxProvider from "@/providers/ReduxProvider";
import "./globals.css";

export const metadata = {
 title: "SIMS PPOB - M.Aldi Gunawan",
 icons: {
  icon: "/Logo.png",
 },
};

export default function RootLayout({ children }) {
 return (
  <html lang="en">
   <body>
    <ReduxProvider>{children}</ReduxProvider>
   </body>
  </html>
 );
}
