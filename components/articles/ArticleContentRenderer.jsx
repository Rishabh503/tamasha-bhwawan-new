"use client";

import React from "react";

export function extractHeadings(content) {
  if (!content) return [];
  const lines = content.split("\n");
  const headings = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("## ")) {
      const title = line.replace(/^##\s+/, "").trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, title, level: 2 });
    } else if (line.startsWith("### ")) {
      const title = line.replace(/^###\s+/, "").trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, title, level: 3 });
    }
  }

  return headings;
}

export default function ArticleContentRenderer({ content }) {
  if (!content) return null;

  // Process markdown-like structures into styled HTML elements
  const renderFormattedContent = () => {
    const lines = content.split("\n");
    const elements = [];
    let inCodeBlock = false;
    let codeContent = [];
    let inTable = false;
    let tableRows = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Code / Swaralipi blocks
      if (trimmed.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${i}`} className="my-4 rounded-xl bg-[#120204] border border-[#d4af37]/35 p-3.5 font-mono text-xs text-[#f5e6a8] overflow-x-auto shadow-inner">
              <div className="text-[10px] uppercase font-cinzel text-[#d4af37] font-bold pb-1.5 mb-2 border-b border-[#d4af37]/20 flex items-center justify-between">
                <span>⚜ Sangeet Swaralipi / Notation Sheet</span>
              </div>
              <pre className="leading-relaxed whitespace-pre font-mono text-xs">{codeContent.join("\n")}</pre>
            </div>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        continue;
      }

      // Markdown Tables
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        // Skip separator row |:---|:---|
        if (trimmed.includes("---")) {
          continue;
        }
        const cells = trimmed
          .split("|")
          .filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1)
          .map(c => c.trim());
        tableRows.push(cells);
        continue;
      } else if (inTable) {
        // Render completed table
        const [headers, ...bodyRows] = tableRows;
        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-xl border border-[#d4af37]/30 bg-[#180305]/80 shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2a070c] border-b border-[#d4af37]/30 text-[11px] font-cinzel text-[#d4af37] font-bold">
                  {headers?.map((h, idx) => (
                    <th key={idx} className="p-2.5 pl-3">{h.replace(/\*\*/g, "")}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4af37]/15 text-xs sm:text-sm font-cormorant text-stone-200">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#2e080c]/50 transition">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 pl-3 font-semibold">{cell.replace(/\*\*/g, "")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableRows = [];
      }

      // Horizontal dividers
      if (trimmed === "---") {
        elements.push(
          <div key={`hr-${i}`} className="flourish-divider w-36 my-5 mx-auto">
            <span className="text-xs">⚜</span>
          </div>
        );
        continue;
      }

      // Heading 2 (## Heading)
      if (trimmed.startsWith("## ")) {
        const title = trimmed.replace(/^##\s+/, "");
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        elements.push(
          <h2
            key={`h2-${i}`}
            id={id}
            className="scroll-mt-24 font-cinzel text-base sm:text-lg font-bold text-[#f5e6a8] mt-6 mb-2 tracking-tight flex items-center gap-1.5 border-b border-[#d4af37]/25 pb-1.5"
          >
            <span className="text-[#d4af37] text-sm">✦</span>
            <span>{title}</span>
          </h2>
        );
        continue;
      }

      // Heading 3 (### Heading)
      if (trimmed.startsWith("### ")) {
        const title = trimmed.replace(/^###\s+/, "");
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        elements.push(
          <h3
            key={`h3-${i}`}
            id={id}
            className="scroll-mt-24 font-cinzel text-sm sm:text-base font-semibold text-white mt-5 mb-2 tracking-wide"
          >
            {title}
          </h3>
        );
        continue;
      }

      // Blockquotes
      if (trimmed.startsWith("> ")) {
        const quoteText = trimmed.replace(/^>\s+/, "");
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="my-4 border-l-2 border-[#d4af37] bg-[#240609]/80 p-3.5 rounded-r-xl font-playfair italic text-xs sm:text-sm text-[#f3e5ab] shadow leading-relaxed"
          >
            &ldquo;{quoteText.replace(/\*\*/g, "")}&rdquo;
          </blockquote>
        );
        continue;
      }

      // Unordered lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const listItem = trimmed.replace(/^[-*]\s+/, "");
        elements.push(
          <li key={`li-${i}`} className="ml-5 list-disc font-cormorant text-sm sm:text-base text-[#f0e6d2] leading-relaxed my-1 marker:text-[#d4af37]">
            {renderInlineMarkdown(listItem)}
          </li>
        );
        continue;
      }

      // Numbered lists
      if (/^\d+\.\s+/.test(trimmed)) {
        const listItem = trimmed.replace(/^\d+\.\s+/, "");
        elements.push(
          <li key={`oli-${i}`} className="ml-5 list-decimal font-cormorant text-sm sm:text-base text-[#f0e6d2] leading-relaxed my-1 marker:text-[#d4af37] marker:font-cinzel">
            {renderInlineMarkdown(listItem)}
          </li>
        );
        continue;
      }

      // Regular paragraphs
      if (trimmed.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="font-cormorant text-sm sm:text-base text-[#f0e6d2]/90 leading-relaxed my-2.5 font-normal">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      }
    }

    return elements;
  };

  const renderInlineMarkdown = (text) => {
    // Basic bold **text** and code `code` replacement
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index} className="px-1.5 py-0.5 rounded bg-[#180305] text-[#f5e6a8] font-mono text-[11px] border border-[#d4af37]/30">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="article-body font-sans-modern space-y-1">
      {renderFormattedContent()}
    </div>
  );
}
