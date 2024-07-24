import "@/styles/globals.css";
import Footer from "@/components/footer.js";

export const metadata = {
  title: 'SACI'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}

