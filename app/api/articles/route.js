import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where = {
      isPublished: true,
    };

    if (category && category !== "ALL") {
      where.category = category;
    }

    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { excerpt: { contains: search.trim(), mode: "insensitive" } },
        { content: { contains: search.trim(), mode: "insensitive" } },
        { authorName: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    let articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // If no articles in database yet, seed with authentic classical articles
    if (articles.length === 0 && (!search || !search.trim()) && (!category || category === "ALL")) {
      const seedArticles = [
        {
          title: "The Architecture of Raga Bhairav: Dawn, Devotion & Microtonal Komal Re",
          slug: "architecture-of-raga-bhairav",
          excerpt: "An exhaustive treatise on Raga Bhairav's microtonal Komal Rishabh and Dhaivat, examining its devotional temperament (Bhakti Rasa) and ancient origins in Sangeet Ratnakar.",
          category: "Raga Shastra",
          tags: ["Raga Bhairav", "Komal Swaras", "Bhakti Rasa", "Morning Ragas", "Shrutis"],
          readingTimeMin: 7,
          coverImage: "/images/hero_classical_tanpura.jpg",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          audioDuration: 360,
          authorName: "Acharya Sangeet Praveen",
          authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
          authorRole: "Head of Musicology, Tamasha Bhawan",
          authorBio: "Gold medalist in Gandharva Sangeet Visharad with over 25 years of research in microtonal Shruti theory and Vedic chhandas.",
          content: `## The Primal Significance of Raga Bhairav

In the grand continuum of Hindustani Classical Music, **Raga Bhairav** reigns supreme as the primordial morning raga. Belonging to its own parent thaat (Bhairav Thaat), it establishes the tonal framework that evokes profound devotion, solemnity, and spiritual awakening at the break of dawn (*Prathama Prahar*).

Historically associated with Lord Shiva in his meditative and benevolent manifestations, the melody carries an austere gravity (*Gambhirya*) that few other ragas command.

---

## Swara Structure & Vadi-Samvadi Concordance

The raga is characterized by its Sampurna-Sampurna (heptatonic) structure:

- **Arohana (Ascent):** \`S - r - G - m - P - d - N - S'\`
- **Avarohana (Descent):** \`S' - N - d - P - m - G - r - S\`
- **Vadi Swara (Sonant):** \`Komal Dhaivat (d)\`
- **Samvadi Swara (Consonant):** \`Komal Rishabh (r)\`
- **Time of Rendition:** Early Morning (4:00 AM – 7:00 AM, Sandhiprakash Prahar)

The soul of Raga Bhairav lies strictly in the deliberate treatment of its two flat notes: **Komal Rishabh (r)** and **Komal Dhaivat (d)**. Unlike lighter morning melodies, these notes are not rendered flatly; they are sustained with a deep, slow, and reverent oscillation known as **Andolan**.

---

## The Art of the Microtonal Andolan

The execution of Andolan on Komal Re and Komal Dha forms the crucible of authenticity in Gharana performance. When oscillating on Komal Re:

1. The vocalist begins from the pristine Shadja (*Sa*).
2. Touches the lower microtonal boundary of Rishabh with gentle deflection (*Meend*).
3. Vibrates the swara without touching Shuddha Re or collapsing into Shadja.

> "A swara without its true microtonal breath is merely acoustic frequency; with andolita shruti, it transforms into an immortal deity."  
> — *Sangeet Ratnakar, Sarangadeva*

---

## Bandish Notation: 'Jago Mohan Pyare'

Here is a traditional Vilambit Ektaal Bandish celebrated across Gwalior and Agra Gharanas:

\`\`\`
Sthayi:
S   r   G   m | P   -   d   P | m   G   r   S
Ja- go  Mo- han | Pya-  -   re- - | Ka- na- ha- i

Antara:
m   P   d   N | S'  -   N   d | P   m   G   r
Bho-ra  Bha-yi| Ba- -   la  Go- | pa-   -   -
\`\`\`

---

## Pedagogical Insights for Riyaz

For aspiring Gandharva examinees and Visharad candidates, daily riyaz in Bhairav must prioritize:

- **Mandra Saptak Exploration:** Establishing stability in the lower octave before ascending to Madhya Saptak.
- **Tanpura Tuning:** Perfect tuning of the first string to *Pancham* (P) or *Madhyam* (m) depending on the vocalist's fundamental scale.
- **Meend Precision:** Seamless gliding from Madhyam to Komal Rishabh without acoustic breaks.`,
        },
        {
          title: "The Lineage & Gayaki of Gwalior Gharana: The Cradle of Khayal",
          slug: "lineage-and-gayaki-of-gwalior-gharana",
          excerpt: "Tracing the historic roots of Gwalior Gharana from Nathan Pir Bakhsh to modern stalwarts, analyzing the signature open-throat Aakaar and robust Bol-Taans.",
          category: "Gharana Parampara",
          tags: ["Gwalior Gharana", "Khayal", "Guru Shishya", "Aakaar", "Bol Taan"],
          readingTimeMin: 6,
          coverImage: "/images/hero_classical_sitar_tabla.jpg",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          audioDuration: 420,
          authorName: "Pandit Devavrata Sharma",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
          authorRole: "Senior Vocal Guru & Archival Historian",
          authorBio: "Direct disciple of the Gwalior tradition and visiting scholar at Gandharva Mahavidyalaya with over 3 decades of stage and academic pedagogy.",
          content: `## The Fountainhead of Classical Khayal

Often hailed as the **Gangotri** (origin) of Hindustani classical vocal traditions, the **Gwalior Gharana** represents the oldest, purest, and most comprehensive framework of Khayal gayaki. 

Formally institutionalized in the 18th century royal court of the Scindias by **Ustad Nathan Pir Bakhsh**, **Hassu Khan**, and **Haddu Khan**, this tradition harmonized the grandeur of ancient Dhrupad with the agile ornamentation and emotional nuance of Khayal.

---

## Defining Characteristics of Gwalior Gayaki

The Gwalior style is instantly recognized by several quintessential aesthetic principles:

1. **Khula Aakaar (Open-Throat Production):** The voice is cultivated from the navel (*Nabhi*) through the chest (*Uras*) with completely unrestricted resonance.
2. **Ashtanga Gayaki (Eightfold Presentation):** A complete recital systematically traverses:
   - *Alap* (Structured melodic exposition)
   - *Bol-Alap* (Lyric-based improvisation)
   - *Behlawa* (Stepwise note elaboration)
   - *Bol-Taan* (Rhythmic phrasing with words)
   - *Taans* (Sapat, Chhut, and Gamak runs)
   - *Layakari* (Complex cross-rhythms)
   - *Tarana* (High-speed syllabic finale)
   - *Tappa / Bhajan* (Concluding devotional semi-classical)

---

## The Role of Dhrupadic Dignity

Unlike modern styles that prioritize rapid acoustic acrobatics, Gwalior maintains an unhurried, royal dignity. The singer respects the *Sam* (first beat of the rhythmic cycle) with unerring precision, arriving on the pivotal syllable like a wave cresting gracefully upon the shore.

> "The true measure of a vocalist is not how fast they can sing, but how still they can hold a single swara while the universe pauses to listen."`,
        },
        {
          title: "Deciphering Sangeet Ratnakar: Shrutis, Gramas & Ancient Murchhanas",
          slug: "deciphering-sangeet-ratnakar-shrutis-and-gramas",
          excerpt: "An analytical breakdown of Sarangadeva's 13th-century masterpiece, examining the 22 Shrutis, Shadja-Grama system, and its transition into modern Thaat classification.",
          category: "Ancient Treatises",
          tags: ["Sangeet Ratnakar", "Sarangadeva", "22 Shrutis", "Murchhana", "Musicology"],
          readingTimeMin: 9,
          coverImage: "/images/hero_sangeet_shastra.jpg",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          audioDuration: 510,
          authorName: "Dr. Vidya Nandini",
          authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
          authorRole: "UGC-NET Musicologist & Sanskrit Scholar",
          authorBio: "Doctorate in ancient Sanskrit musicological treatises from Banaras Hindu University and author of 4 published books on Indian musical Shastras.",
          content: `## Sarangadeva's Magnum Opus

Written in the 13th century in the court of King Singhana of the Yadava dynasty, **Sangeet Ratnakar** by **Pt. Sarangadeva** stands as the definitive bridge connecting ancient Gandharva music with medieval and modern Hindustani systems.

Comprising seven exhaustive chapters (*Saptadhyayi*), the treatise provides the foundational terminology referenced in every UGC-NET and Gandharva degree examination today.

---

## The 22 Shrutis & Mathematical Distribution

Sarangadeva codified the 22 microtones (*Shrutis*) across one Saptak:

- **Shadja Grama (Sa Grama):** 4 Shrutis on Sa, 3 on Ri, 2 on Ga, 4 on Ma, 4 on Pa, 3 on Dha, 2 on Ni. (4 + 3 + 2 + 4 + 4 + 3 + 2 = 22)
- **Madhyama Grama (Ma Grama):** Pa has 3 Shrutis (Pancham is lowered by one Pramana Shruti).

| Note (Swara) | Shruti Interval | Ancient Canonical Name |
| :--- | :--- | :--- |
| **Shadja (Sa)** | 4 Shrutis | Tivra, Kumudvati, Manda, Chandovati |
| **Rishabh (Ri)** | 3 Shrutis | Dayavati, Ranjani, Raktika |
| **Gandhara (Ga)**| 2 Shrutis | Raudri, Krodha |
| **Madhyam (Ma)** | 4 Shrutis | Vajrika, Prasarini, Priti, Marjani |
| **Pancham (Pa)** | 4 Shrutis | Kshiti, Rakta, Sandipini, Alapini |
| **Dhaivat (Dha)**| 3 Shrutis | Madanti, Rohini, Ramya |
| **Nishad (Ni)**  | 2 Shrutis | Ugra, Kshobhini |

---

## Transition from Grama-Murchhana to Modern Thaat

The modern system developed by **Pt. Vishnu Narayan Bhatkhande** distilled these ancient Murchhanas into 10 fundamental Thaats (Bilawal, Kalyan, Khamaj, Bhairav, Bhairavi, Asavari, Todi, Poorvi, Marwa, Kafi).

Understanding this evolution is vital for all advanced scholars navigating theoretical dissertations and exam papers.`,
        }
      ];

      for (const item of seedArticles) {
        await prisma.article.create({ data: item });
      }

      articles = await prisma.article.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(articles);
  } catch (error) {
    console.error("[ARTICLES_PUBLIC_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
