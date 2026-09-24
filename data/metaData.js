// metadata.js - Centralized SEO, GEO (Generative Engine Optimization) & AEO (Answer Engine Optimization) configuration

export const siteConfig = {
  siteName: "Tamasha Bhawan",
  siteTitle: "Tamasha Bhawan | Premier Indian Classical Music Academy & UGC NET Preparation",
  siteUrl: "https://www.tamashabhawan.com",
  description:
    "Delhi's top Indian classical music academy & online learning sanctuary. Master Hindustani classical vocal, prepare for UGC NET Music (JRF), and earn Gandharva Mahavidyalaya Pune certifications with maestros.",
  keywords: [
    "music learning in delhi",
    "top music academy in delhi",
    "best music academy delhi",
    "hindustani classical music classes delhi",
    "ugc net preparation for music",
    "ugc net music coaching",
    "net jrf music syllabus",
    "gandharva mahavidyalaya exam preparation",
    "gandharva visharad vocal training",
    "online classical music learning india",
    "indian classical vocal classes",
    "sangeet shastra granthalaya",
    "raga shastra musicology",
    "classical music teachers in delhi",
    "learn khayal gayaki delhi",
    "classical vocal classes for beginners",
    "akhil bharatiya gandharva mahavidyalaya mandal",
    "music net jrf notes"
  ].join(", "),
  author: "Tamasha Bhawan Faculty",
  logo: "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png",
  image: "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png",
  phone: "+919310395103",
  email: "contact@tamashabhawan.com",
  address: {
    streetAddress: "Sanctuary of Sangeet, Central Delhi",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN"
  },
  geo: {
    latitude: "28.6139",
    longitude: "77.2090"
  }
};

// Global metadata defaults
export const globalMetadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Tamasha Bhawan | Top Music Academy in Delhi & Online Classical Music Learning",
    template: "%s | Tamasha Bhawan",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Tamasha Bhawan", url: siteConfig.siteUrl }],
  creator: "Tamasha Bhawan",
  publisher: "Tamasha Bhawan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    title: "Tamasha Bhawan | Best Classical Music Academy in Delhi & UGC NET Music Prep",
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero_classical_tanpura.jpg",
        width: 1200,
        height: 630,
        alt: "Tamasha Bhawan - Indian Classical Music Academy & Research Sanctuary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tamasha Bhawan | Best Music Academy in Delhi & UGC NET Music",
    description: siteConfig.description,
    images: ["/images/hero_classical_tanpura.jpg"],
  },
};

// Home Page Metadata
export const homePageMetadata = {
  ...globalMetadata,
  title: "Music Learning in Delhi | Top Music Academy & UGC NET Preparation | Tamasha Bhawan",
  description:
    "Ranked among the top music academies in Delhi. Learn Hindustani classical vocal, master Raga Shastra, prepare for UGC NET Music (JRF), and earn Gandharva Mahavidyalaya degrees online & offline.",
  keywords: [
    "music learning in delhi",
    "top music academy in delhi",
    "best music academy delhi",
    "hindustani classical music classes delhi",
    "ugc net preparation for music",
    "ugc net music coaching delhi",
    "gandharva mahavidyalaya exam preparation",
    "gandharva visharad degree classes",
    "online classical vocal classes delhi",
    "indian classical music institute delhi",
    "delhi classical music academy",
    "learn classical vocal delhi ncr",
    "music teacher in delhi",
    "khayal gayaki classes delhi"
  ].join(", "),
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

// About Page Metadata
export const aboutPageMetadata = {
  ...globalMetadata,
  title: "About Us | Top Music Academy in Delhi | Tamasha Bhawan Faculty & Heritage",
  description:
    "Discover Tamasha Bhawan's lineage in Delhi. Renowned faculty from Gandharva Mahavidyalaya Pune, UGC NET JRF scholars, and maestros dedicated to authentic Guru-Shishya parampara.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
  },
};

// Courses Page Metadata
export const coursesPageMetadata = {
  ...globalMetadata,
  title: "Music Courses | UGC NET Music, Gandharva Exams & Classical Vocal Training",
  description:
    "Explore structured courses in Hindustani Classical Vocal, UGC NET Music Paper 2 JRF, Gandharva Prarambhik to Visharad exam preparations, and voice culture masterclasses in Delhi.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/courses`,
  },
};

// Articles Page Metadata
export const articlesPageMetadata = {
  ...globalMetadata,
  title: "Sangeet Shastra Granthalaya | Musicology Treatises & Raga Shastra Articles",
  description:
    "Read in-depth Hindustani musicology treatises, microtonal 22 Shruti breakdowns, Sangeet Ratnakar dissertations, and audio commentaries by senior maestros at Tamasha Bhawan.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/articles`,
  },
};

// Live Quiz Page Metadata
export const liveQuizPageMetadata = {
  ...globalMetadata,
  title: "Live Sangeet Quiz Arena | UGC NET & Gandharva Exam Practice Tests",
  description:
    "Compete live with music scholars across India. Real-time gamified quizzes on Raga Lakshanas, Taals, Gharana Lineages, and UGC NET Musicology exam questions.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/live-quiz/join`,
  },
};

// GEO / AEO Structured Data Knowledge Graph (JSON-LD)
export const masterJsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MusicSchool", "EducationalOrganization", "LocalBusiness"],
      "@id": `${siteConfig.siteUrl}/#organization`,
      name: "Tamasha Bhawan",
      alternateName: "Tamasha Bhawan Sanctuary of Sangeet",
      url: siteConfig.siteUrl,
      logo: siteConfig.logo,
      image: siteConfig.image,
      description: siteConfig.description,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      priceRange: "₹₹",
      currenciesAccepted: "INR, USD, AED",
      paymentAccepted: "Credit Card, Debit Card, UPI, Net Banking",
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      areaServed: [
        { "@type": "City", name: "Delhi" },
        { "@type": "City", name: "New Delhi" },
        { "@type": "City", name: "Noida" },
        { "@type": "City", name: "Gurgaon" },
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "AdministrativeArea", name: "Worldwide Online" }
      ],
      knowsAbout: [
        "Hindustani Classical Music",
        "Indian Classical Vocal",
        "UGC NET Music Examination",
        "UGC NET JRF Musicology",
        "Akhil Bharatiya Gandharva Mahavidyalaya Mandal Pune",
        "Gandharva Visharad & Alankar",
        "Raga Shastra & 22 Shrutis",
        "Sangeet Ratnakar by Sarangadeva",
        "Bhatkhande Swaralipi Notation System",
        "Gwalior Gharana Khayal Gayaki",
        "Voice Culture & Riyaz Techniques"
      ],
      sameAs: [
        "https://www.youtube.com/@tamashabhawan",
        "https://www.instagram.com/tamashabhawan",
        "https://wa.me/919310395103"
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Classical Music Training & Certification Programs",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "UGC NET Music (JRF / Assistant Professor) Comprehensive Coaching",
              description: "Complete analytical coverage of UGC NET Music syllabus, ancient treatises, theoretical papers, and live test series in Delhi.",
              provider: { "@type": "Organization", name: "Tamasha Bhawan" }
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Gandharva Mahavidyalaya Pune Examination Preparation",
              description: "Structured vocal curriculum for Prarambhik, Praveshika, Madhyama, and Visharad examinations with practical riyaz & notation sheets.",
              provider: { "@type": "Organization", name: "Tamasha Bhawan" }
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Hindustani Classical Vocal Foundations & Khayal Gayaki",
              description: "Authentic Guru-Shishya training in Swara Sadhana, Bandish rendition, Tala mastery, and Raga improvisation in Delhi.",
              provider: { "@type": "Organization", name: "Tamasha Bhawan" }
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      url: siteConfig.siteUrl,
      name: "Tamasha Bhawan",
      description: siteConfig.description,
      publisher: {
        "@id": `${siteConfig.siteUrl}/#organization`
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.siteUrl}/articles?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Which is the top music academy in Delhi for Indian Classical Music?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tamasha Bhawan is recognized as one of the top music academies in Delhi for Hindustani Classical Music, offering authentic vocal training, microtonal Shruti study, and recognized diploma and degree coaching affiliated with Gandharva Mahavidyalaya."
          }
        },
        {
          "@type": "Question",
          name: "How can I prepare for the UGC NET Music exam with Tamasha Bhawan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tamasha Bhawan offers specialized UGC NET Music coaching covering ancient Sangeet Shastras (Natya Shastra, Sangeet Ratnakar, Brihaddeshi), Raga classifications, Tala theory, Gharana lineages, live mock quizzes, and previous years' question papers."
          }
        },
        {
          "@type": "Question",
          name: "Are courses affiliated with Akhil Bharatiya Gandharva Mahavidyalaya Mandal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our curriculum prepares students systematically for official Gandharva Mahavidyalaya Pune examinations from Prarambhik, Praveshika, Madhyama, to Visharad and Alankar degrees."
          }
        },
        {
          "@type": "Question",
          name: "Can beginners in Delhi or outside join online classical music classes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Tamasha Bhawan provides both online and offline classical vocal training designed for beginners as well as advanced scholars, featuring 1-on-1 feedback, notation sheets, and interactive riyaz sessions."
          }
        }
      ]
    }
  ]
};
