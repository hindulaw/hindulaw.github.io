import { g as getAllVerses } from '../../chunks/content_dKfi1RJA.mjs';
export { renderers } from '../../renderers.mjs';

async function GET() {
  const verses = getAllVerses();
  const searchIndex = verses.map((v) => ({
    title: `Verse ${v.id}`,
    // Use rawContent for the searchable text
    content: v.rawContent,
    slug: `/${v.chapter}/${v.verseNumber}`,
    chapter: v.chapter
  }));
  return new Response(JSON.stringify(searchIndex), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
