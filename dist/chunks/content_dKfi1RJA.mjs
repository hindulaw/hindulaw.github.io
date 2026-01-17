import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.resolve(process.cwd(), "../manu_extract/content");
function getAllChapters() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const dirs = fs.readdirSync(CONTENT_DIR);
  const chapters = dirs.filter((d) => d.startsWith("manu_")).map((d) => parseInt(d.replace("manu_", ""), 10)).sort((a, b) => a - b);
  return chapters;
}
function getVersesForChapter(chapter) {
  const chapterDir = path.join(CONTENT_DIR, `manu_${chapter}`);
  if (!fs.existsSync(chapterDir)) return [];
  const files = fs.readdirSync(chapterDir).filter((f) => f.endsWith(".md"));
  const verses = files.map((file) => {
    const content = fs.readFileSync(path.join(chapterDir, file), "utf-8");
    return parseVerse(content, chapter, file);
  });
  return verses.sort((a, b) => a.verseNumber - b.verseNumber);
}
function getAllVerses() {
  const chapters = getAllChapters();
  return chapters.flatMap((c) => getVersesForChapter(c));
}
function parseVerse(content, chapter, filename) {
  let id = `${chapter}.0`;
  const fileMatch = filename.match(/Manu_(\d+)_(\d+)\.md/i);
  if (fileMatch) {
    id = `${fileMatch[1]}.${fileMatch[2]}`;
  }
  const verseNumber = parseFloat(id.split(".")[1] || "0");
  return {
    id,
    chapter,
    verseNumber,
    rawContent: content,
    slug: id.replace(/\./g, "-")
  };
}

export { getAllVerses as g };
