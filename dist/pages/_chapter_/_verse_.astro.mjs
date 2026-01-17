/* empty css                                      */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, u as unescapeHTML, d as addAttribute } from '../../chunks/astro/server_PmHhxIhz.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_D8o7Eu0Y.mjs';
import { g as getAllVerses } from '../../chunks/content_dKfi1RJA.mjs';
import { marked } from 'marked';
import * as cheerio from 'cheerio';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const verses = getAllVerses();
  return verses.map((verse, index) => {
    const prevVerse = verses[index - 1] || null;
    const nextVerse = verses[index + 1] || null;
    return {
      params: { chapter: verse.chapter.toString(), verse: verse.verseNumber.toString() },
      props: { verse, prevVerse, nextVerse }
    };
  });
}
const $$verse = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$verse;
  const { verse, prevVerse, nextVerse } = Astro2.props;
  const rawHtml = marked.parse(verse.rawContent);
  const $ = cheerio.load(rawHtml);
  const sections = [];
  const rootKids = $("body").children();
  let currentSection = [];
  rootKids.each((i, el) => {
    if (el.tagName === "hr") {
      if (currentSection.length > 0) sections.push([...currentSection]);
      currentSection = [];
    } else {
      currentSection.push(el);
    }
  });
  if (currentSection.length > 0) sections.push([...currentSection]);
  $("body").empty();
  sections.forEach((nodes) => {
    const sectionWrapper = $('<div class="section-card mb-8 p-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm transition-all hover:border-amber-500/20"></div>');
    const nodesObj = $(nodes);
    const textContent = nodesObj.text().toLowerCase();
    if (textContent.includes("verse") || /[\u0900-\u097F]/.test(textContent)) {
      sectionWrapper.addClass("verse-card bg-gradient-to-b from-zinc-900/80 to-zinc-950 border-amber-500/30");
    } else if (textContent.includes("translation") || textContent.includes("interpretation")) {
      sectionWrapper.addClass("translation-card border-l-4 border-l-amber-500");
    } else if (textContent.includes("principles")) {
      sectionWrapper.addClass("principles-card border-indigo-500/30");
    } else if (textContent.includes("axiom")) {
      sectionWrapper.addClass("axioms-card border-emerald-500/30 bg-emerald-950/5");
    } else if (textContent.includes("guidelines") || textContent.includes("directives")) {
      sectionWrapper.addClass("guidelines-card border-blue-500/30 bg-blue-950/5");
    }
    sectionWrapper.append(nodes);
    $("body").append(sectionWrapper);
  });
  const finalHtml = $("body").html();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Verse ${verse.id} | Manu Smriti`, "chapter": verse.chapter, "verse": verse.verseNumber }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500"> <!-- Simple Navigation Header --> <nav class="flex justify-between items-center pb-6 border-b border-zinc-800"> ${prevVerse ? renderTemplate`<a${addAttribute(`/${prevVerse.chapter}/${prevVerse.verseNumber}`, "href")} class="text-sm text-zinc-500 hover:text-amber-500 transition-colors uppercase tracking-wider flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
Previous
</a>` : renderTemplate`<div></div>`} <div class="text-zinc-500 font-mono text-xs">VERSE ${verse.id}</div> ${nextVerse ? renderTemplate`<a${addAttribute(`/${nextVerse.chapter}/${nextVerse.verseNumber}`, "href")} class="text-sm text-zinc-500 hover:text-amber-500 transition-colors uppercase tracking-wider flex items-center gap-2">
Next
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg> </a>` : renderTemplate`<div></div>`} </nav> <!-- Main Content Area --> <article class="prose prose-invert prose-lg max-w-none 
            prose-headings:font-serif prose-headings:tracking-wide
            prose-p:leading-relaxed prose-p:text-zinc-300
            prose-strong:text-amber-200 prose-strong:font-semibold
            prose-a:text-amber-500 hover:prose-a:text-amber-400
            
            /* Table Styling */
            prose-table:border-collapse prose-table:border prose-table:border-zinc-800/50 
            prose-th:bg-zinc-900/50 prose-th:p-4 prose-th:text-amber-500 prose-th:uppercase prose-th:text-xs prose-th:tracking-wider prose-th:font-medium
            prose-td:p-4 prose-td:border-t prose-td:border-zinc-800/50 prose-td:text-zinc-300
            
            /* Blockquote */
            prose-blockquote:border-l-amber-500 prose-blockquote:bg-zinc-900/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
            
            /* Custom Card Styling (injected classes) */
            [&_.verse-card]:shadow-xl [&_.verse-card]:shadow-amber-900/5 
            [&_.verse-card]:text-center [&_.verse-card_h1]:text-amber-500 [&_.verse-card_h2]:text-amber-500 [&_.verse-card_h3]:text-amber-500
            [&_.verse-card_p]:text-xl [&_.verse-card_p]:text-amber-100 [&_.verse-card_p]:font-medium [&_.verse-card_p]:leading-loose
            
            [&_.translation-card_h3]:text-amber-500 [&_.translation-card_h2]:text-amber-500
            [&_.translation-card_strong]:text-amber-400
            
            [&_.axioms-card_h3]:text-emerald-400 [&_.axioms-card_h2]:text-emerald-400
            [&_.axioms-card_strong]:text-emerald-300
            [&_.axioms-card_code]:text-emerald-200 [&_.axioms-card_code]:bg-emerald-950/30 [&_.axioms-card_code]:border-emerald-500/20
            
            [&_.principles-card_h3]:text-indigo-400 [&_.principles-card_h2]:text-indigo-400
            
            [&_.guidelines-card_h3]:text-blue-400
            "> <div>${unescapeHTML(finalHtml)}</div> </article> </div> ` })}`;
}, "C:/Sangha/ai_law/manu_book/manu_web/src/pages/[chapter]/[verse].astro", void 0);

const $$file = "C:/Sangha/ai_law/manu_book/manu_web/src/pages/[chapter]/[verse].astro";
const $$url = "/[chapter]/[verse]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$verse,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
