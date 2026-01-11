import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/general/NavBar";
// import { Footer } from "@/components/general/Footer";
// import { siteConfig ,globalMetadata, organizationSchema} from "@/data/metaData.js";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "../components/general/Footer";
import { globalMetadata, siteConfig } from "../data/metaData";

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
  image:{
    url:"https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png"
  },
  ...globalMetadata
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Navbar/>
        
        {children}
        <Footer/>
      </body>
    </html>
        </ClerkProvider>
  );
}
