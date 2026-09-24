import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/general/NavBar";
// import { Footer } from "@/components/general/Footer";
// import { siteConfig ,globalMetadata, organizationSchema} from "@/data/metaData.js";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "../components/general/Footer";
import { globalMetadata, siteConfig, masterJsonLdSchema } from "../data/metaData";
import { AuthProvider } from "../context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  ...globalMetadata,
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <html lang="en">
          <head>
            {/* Master SEO / GEO / AEO Structured JSON-LD Knowledge Graph */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(masterJsonLdSchema),
              }}
            />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar/>
            <div className="pt-[68px]">
              {children}
            </div>
            <Footer/>
          </body>
        </html>
      </AuthProvider>
    </ClerkProvider>
  );
}


