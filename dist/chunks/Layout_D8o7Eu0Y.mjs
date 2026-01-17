import { c as createComponent, a as createAstro, d as addAttribute, e as renderHead, r as renderComponent, f as renderSlot, b as renderTemplate } from './astro/server_PmHhxIhz.mjs';
import 'kleur/colors';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search as Search$1, X, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import Fuse from 'fuse.js';
import { g as getAllVerses } from './content_dKfi1RJA.mjs';
/* empty css                           */

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    fetch("/api/search.json").then((res) => res.json()).then((data) => setIndex(data));
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  useEffect(() => {
    if (!query || index.length === 0) {
      setResults([]);
      return;
    }
    const fuse = new Fuse(index, {
      keys: ["title", "content", "chapter"],
      threshold: 0.3
    });
    setResults(fuse.search(query).map((r) => r.item).slice(0, 50));
  }, [query, index]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-400 text-left hover:bg-zinc-800/50 transition-colors flex items-center justify-between group",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Search$1, { size: 14 }),
            "Search..."
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-600 border border-zinc-700/50 rounded px-1.5 py-0.5 group-hover:border-zinc-600 transition-colors", children: "⌘K" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setIsOpen(false),
          className: "absolute inset-0 bg-black/60 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: -20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: -20 },
          className: "w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[60vh]",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-zinc-800 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Search$1, { className: "text-zinc-500", size: 20 }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  placeholder: "Search verses, text, or concepts...",
                  className: "flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-600",
                  value: query,
                  onChange: (e) => setQuery(e.target.value)
                }
              ),
              /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(false), className: "text-zinc-500 hover:text-white", children: /* @__PURE__ */ jsx(X, { size: 20 }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "overflow-y-auto flex-1 p-2 custom-scrollbar", children: [
              query === "" && /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-zinc-600 text-sm", children: "Type to search across all verses..." }),
              results.length > 0 && /* @__PURE__ */ jsx("div", { className: "space-y-1", children: results.map((result, i) => /* @__PURE__ */ jsxs(
                "a",
                {
                  href: result.slug,
                  className: "block p-3 rounded-lg hover:bg-zinc-800/50 group transition-colors",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-amber-500 text-xs font-bold uppercase tracking-wider", children: result.title }),
                      /* @__PURE__ */ jsx(ArrowRightIcon, { className: "text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-all", size: 14 })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-zinc-400 text-sm line-clamp-2 text-left", children: result.content })
                  ]
                },
                i
              )) }),
              query !== "" && results.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-12 text-zinc-500 text-sm", children: [
                'No results found for "',
                query,
                '"'
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-2 border-t border-zinc-800 bg-zinc-900/50 text-xs text-zinc-600 text-center", children: "Navigate with arrows • Enter to select • Esc to close" })
          ]
        }
      )
    ] }) })
  ] });
}
function ArrowRightIcon(props) {
  return /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M5 12h14" }),
    /* @__PURE__ */ jsx("path", { d: "m12 5 7 7-7 7" })
  ] });
}

function Sidebar({ chapters, currentChapter, currentVerse }) {
  const [expandedChapter, setExpandedChapter] = useState(currentChapter || null);
  useEffect(() => {
    if (currentChapter) {
      setExpandedChapter(currentChapter);
    }
  }, [currentChapter]);
  const toggleChapter = (chapterNum) => {
    setExpandedChapter((prev) => prev === chapterNum ? null : chapterNum);
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-zinc-800/50", children: /* @__PURE__ */ jsxs("a", { href: "/", className: "block", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500", children: "Manu Smriti" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-500 mt-1 uppercase tracking-widest", children: "Digital Edition" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 flex-1 overflow-y-auto custom-scrollbar", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Search, {}) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2", children: "Chapters" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-1", children: chapters.map((chapter) => {
        const isExpanded = expandedChapter === chapter.number;
        const isActive = currentChapter === chapter.number;
        return /* @__PURE__ */ jsxs("div", { className: "select-none", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => toggleChapter(chapter.number),
              className: `w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-200 group ${isActive ? "bg-amber-500/10 text-amber-500" : "hover:bg-zinc-900/50 text-zinc-400 hover:text-white"}`,
              children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-sm font-medium", children: [
                  /* @__PURE__ */ jsx(BookOpen, { size: 14, className: isActive ? "text-amber-500" : "text-zinc-600 group-hover:text-zinc-400" }),
                  "Chapter ",
                  chapter.number
                ] }),
                isExpanded ? /* @__PURE__ */ jsx(ChevronDown, { size: 14 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
              ]
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isExpanded && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.2 },
              className: "overflow-hidden",
              children: /* @__PURE__ */ jsx("div", { className: "px-3 pb-2 pt-1", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-1", children: chapter.verses.map((verse) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: `/${chapter.number}/${verse.verseNumber}`,
                  className: `text-xs text-center py-1.5 rounded transition-colors ${currentVerse === verse.verseNumber && isActive ? "bg-amber-500 text-black font-bold" : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"}`,
                  title: `Verse ${verse.id}`,
                  children: verse.verseNumber
                },
                verse.id
              )) }) })
            }
          ) })
        ] }, chapter.number);
      }) })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, chapter, verse } = Astro2.props;
  const allVerses = getAllVerses();
  const chaptersMap = /* @__PURE__ */ new Map();
  allVerses.forEach((v) => {
    if (!chaptersMap.has(v.chapter)) {
      chaptersMap.set(v.chapter, []);
    }
    chaptersMap.get(v.chapter).push({
      id: v.id,
      verseNumber: v.verseNumber,
      slug: v.slug
    });
  });
  const sidebarData = Array.from(chaptersMap.entries()).map(([num, verses]) => ({
    number: num,
    verses: verses.sort((a, b) => a.verseNumber - b.verseNumber)
  })).sort((a, b) => a.number - b.number);
  const currentChapter = chapter ? parseInt(chapter.toString()) : void 0;
  const currentVerse = verse ? parseInt(verse.toString()) : void 0;
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="description" content="Manu Smriti - The Eternal Laws"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-zinc-950 text-zinc-100 font-sans antialiased min-h-screen flex selection:bg-amber-500/30"> <!-- Sidebar --> <aside class="w-72 border-r border-zinc-800 hidden lg:block h-screen sticky top-0 bg-zinc-950/50 backdrop-blur-xl"> ${renderComponent($$result, "Sidebar", Sidebar, { "client:load": true, "chapters": sidebarData, "currentChapter": currentChapter, "currentVerse": currentVerse, "client:component-hydration": "load", "client:component-path": "C:/Sangha/ai_law/manu_book/manu_web/src/components/Sidebar", "client:component-export": "default" })} </aside> <!-- Main Content --> <main class="flex-1 w-full max-w-5xl mx-auto p-6 md:p-12 pb-32"> ${renderSlot($$result, $$slots["default"])} </main> <!-- Mobile Nav Toggle (Placeholder) --> <div class="fixed bottom-6 right-6 lg:hidden z-50"> <button class="bg-amber-500 text-black p-4 rounded-full shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> </button> </div> </body></html>`;
}, "C:/Sangha/ai_law/manu_book/manu_web/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
