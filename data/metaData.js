// metadata.js - Centralized metadata configuration

export const siteConfig = {
  siteName: "Tamasha Bhawan",
  siteUrl: "www.tamashabhawan.com", 
  description: "Premier online Hindustani classical music classes. UGC NET preparation, vocal training affiliated with Gandharva Mahavidyalaya Pune. Best institute in Delhi for Indian classical music education.",
  keywords: "hindustani classical music, online music classes, ugc net music, gandharva mahavidyalaya, vocal classes, indian classical music, delhi music institute",
  author: "Tamasha Bhawan",
  image: "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png" 
};

// Home Page Metadata
export const homeMetadata = {
  title: "Online Hindustani Classical Music Classes | Delhi's #1 Music Institute | UGC NET Preparation",
  description: "Learn Hindustani classical music online with expert teachers from Gandharva Mahavidyalaya Pune. Best music institute in Delhi offering UGC NET preparation, vocal classes, and light music training. Join students in Dubai and worldwide.",
  keywords: [
    "hindustani classical music online classes",
    "online classes indian hindustani classical music", 
    "delhi number 1 institute hindustani classical music",
    "best institute hindustani classical music",
    "hindustani classical music dubai",
    "ugc net music preparation",
    "online ugc net music preparation",
    "vocal classes hindustani classical music",
    "online vocal classes hindustani classical music",
    "gandharva mahavidyalaya affiliated vocal classes",
    "music teacher gandharva maha vishwavidyalaya pune",
    "hindustani music vocal class",
    "vocal classes gandhar",
    "online class hindustani classical music"
  ].join(", "),
  openGraph: {
    title: "Online Hindustani Classical Music Classes | Delhi's Premier Music Academy",
    description: "Master Hindustani classical music with expert guidance. UGC NET preparation, Gandharva Mahavidyalaya affiliated courses, serving students in Delhi, Dubai & worldwide.",
    images: [
      {
        url: "/images/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "Hindustani Classical Music Online Classes"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Hindustani Classical Music Classes | Delhi's #1 Institute",
    description: "Learn from expert teachers affiliated with Gandharva Mahavidyalaya Pune. UGC NET prep & vocal training available online."
  }
};

// About Page Metadata
export const aboutMetadata = {
  title: "About Us | Tamasha Bhawan | Expert Hindustani Classical Music Teachers",
  description: "Meet our expert music teachers from Gandharva Maha Vishwavidyalaya Pune. Leading online Hindustani classical music education with UGC NET qualified instructors serving students globally.",
  keywords: [
    "music teacher gandharva maha vishwavidyalaya pune",
    "gandharva mahavidyalaya pune affiliated teachers",
    "hindustani classical music teachers",
    "ugc net qualified music teachers",
    "best music teachers delhi",
    "online music teachers india",
    "classical music education experts"
  ].join(", "),
  openGraph: {
    title: "Expert Music Teachers | Tamasha Bhawan",
    description: "Learn from UGC NET qualified teachers affiliated with Gandharva Maha Vishwavidyalaya Pune. Dedicated to preserving and teaching Indian classical music traditions.",
    images: [
      {
        url: "/images/about-teachers.jpg",
        width: 1200,
        height: 630,
        alt: "Expert Hindustani Classical Music Teachers"
      }
    ]
  }
};

// Courses Page Metadata
export const coursesMetadata = {
  title: "Hindustani Classical Music Courses | UGC NET Prep | Vocal Classes | Light Music",
  description: "Comprehensive online courses: Hindustani classical vocal, UGC NET music preparation, Gandharva exam prep, light music classes. Affiliated with Gandharva Mahavidyalaya Pune.",
  keywords: [
    "hindustani classical music courses",
    "ugc net music preparation classes",
    "classes gandharva exam hindustani classical music vocals",
    "vocal classes affiliated gandharva mahavidyalaya pune",
    "vocal classes light music",
    "online vocal classes light music",
    "tgt music class",
    "pgt music",
    "jrf music class",
    "music class delhi",
    "music classes online"
  ].join(", "),
  openGraph: {
    title: "Complete Hindustani Music Courses | UGC NET & Classical Vocal Training",
    description: "Master classical music with our structured courses. UGC NET preparation, Gandharva exam training, and light music classes available online.",
    images: [
      {
        url: "/images/courses-overview.jpg",
        width: 1200,
        height: 630,
        alt: "Hindustani Classical Music Courses"
      }
    ]
  }
};

// Contact Page Metadata
export const contactMetadata = {
  title: "Contact Tamasha Bhawan | Enroll in Online Hindustani Classical Music Classes",
  description: "Join Delhi's premier music institute for online Hindustani classical music classes. Contact us for UGC NET preparation, vocal training, and Gandharva Mahavidyalaya affiliated courses.",
  keywords: [
    "contact hindustani music classes",
    "enroll online music classes delhi",
    "Tamasha Bhawan contact",
    "hindustani classical music admission",
    "online music classes registration",
    "music institute delhi contact",
    "ugc net music classes enrollment"
  ].join(", "),
  openGraph: {
    title: "Contact Us | Tamasha Bhawan Delhi",
    description: "Ready to begin your musical journey? Contact Delhi's top music institute for online Hindustani classical music classes and UGC NET preparation.",
    images: [
      {
        url: "/images/contact-us.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Tamasha Bhawan"
      }
    ]
  }
};

// UGC NET Specific Page Metadata (if you have a dedicated page)
export const ugcNetMetadata = {
  title: "UGC NET Music Preparation Online | Best Coaching in Delhi | Gandharva Academy",
  description: "Ace UGC NET Music exam with our expert online coaching. Comprehensive preparation for TGT, PGT, and JRF music exams by experienced teachers from Gandharva Mahavidyalaya.",
  keywords: [
    "ugc net music preparation",
    "online ugc net music preparation", 
    "ugc net music coaching delhi",
    "tgt music class",
    "pgt music preparation",
    "jrf music class",
    "ugc net music online classes",
    "best ugc net music coaching"
  ].join(", "),
  openGraph: {
    title: "UGC NET Music Preparation | Online Coaching by Experts",
    description: "Comprehensive UGC NET Music preparation with high success rate. Expert guidance for TGT, PGT, and JRF music examinations.",
    images: [
      {
        url: "/images/ugc-net-prep.jpg",
        width: 1200,
        height: 630,
        alt: "UGC NET Music Preparation Classes"
      }
    ]
  }
};

// Schema.org JSON-LD structured data
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Tamasha Bhawan",
  "description": "Premier online institute for Hindustani classical music education and UGC NET preparation",
  "url": "www.tamashabhawan.com",
  "logo": "https://yourwebsite.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Delhi",
    "addressCountry": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://facebook.com/yourpage",
    "https://instagram.com/yourpage",
    "https://youtube.com/yourchannel"
  ]
};

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Online Hindustani Classical Music Classes",
  "description": "Comprehensive online course for learning Hindustani classical music with expert teachers",
  "provider": {
    "@type": "Organization",
    "name": "Tamasha Bhawan"
  },
  "courseMode": "online",
  "educationalLevel": "All Levels",
  "teaches": [
    "Hindustani Classical Music",
    "Vocal Training", 
    "Music Theory",
    "UGC NET Preparation"
  ]
};

// Global metadata for all pages
export const globalMetadata = {
  robots: "index, follow",
  googlebot: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  charset: "utf-8",
  language: "en-IN",
  alternates: {
    canonical: siteConfig.siteUrl
  },
  verification: {
    google: "your-google-verification-code",
    bing: "your-bing-verification-code"
  }
};

// Example implementation for Next.js pages

// For app/page.js (Home)
export const homePageMetadata = {
  ...globalMetadata,
  title: homeMetadata.title,
  description: homeMetadata.description,
  keywords: homeMetadata.keywords,
  openGraph: {
    ...homeMetadata.openGraph,
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    type: "website"
  },
  twitter: homeMetadata.twitter
};

// For app/about/page.js
export const aboutPageMetadata = {
  ...globalMetadata,
  title: aboutMetadata.title,
  description: aboutMetadata.description,
  keywords: aboutMetadata.keywords,
  openGraph: {
    ...aboutMetadata.openGraph,
    url: `${siteConfig.siteUrl}/about`,
    siteName: siteConfig.siteName,
    type: "website"
  }
};

// For app/contact/page.js
export const contactPageMetadata = {
  ...globalMetadata,
  title: contactMetadata.title,
  description: contactMetadata.description,
  keywords: contactMetadata.keywords,
  openGraph: {
    ...contactMetadata.openGraph,
    url: `${siteConfig.siteUrl}/contact`,
    siteName: siteConfig.siteName,
    type: "website"
  }
};