import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/general/NavBar";
import { Footer } from "@/components/general/Footer";
import { siteConfig ,globalMetadata, organizationSchema} from "@/data/metaData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: {
    template: `%s | ${siteConfig.siteName}`,
    default: siteConfig.siteName
  },
  description: siteConfig.description,
  ...globalMetadata
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
