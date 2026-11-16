import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const siteDescriptions = {
  es: 'Ensayos de Carlos Dagorret sobre filosofía, sistemas, tecnología, inteligencia artificial, matemáticas y economía política.',
  en: 'Essays by Carlos Dagorret on philosophy, systems, technology, artificial intelligence, mathematics and political economy.',
};

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
const normalize = text => text.replace(/\s+/gu, ' ').trim();
const hasLink = node => ['link', 'linkReference'].includes(node.type)
  || (node.children ?? []).some(hasLink);

function plainText(node) {
  if (node.type === 'text') return node.value;
  if (node.type === 'inlineCode') return node.value;
  if (node.type === 'break') return ' ';
  if (['image', 'imageReference', 'html', 'inlineMath', 'math', 'footnoteReference'].includes(node.type)) return '';
  return (node.children ?? []).map(plainText).join('');
}

function isSeriesNote(node) {
  return node.type === 'emphasis' && hasLink(node)
    && /\b(parte|part|serie|series|tríptico|triptych|díptico|diptych|entrega)\b/iu.test(plainText(node));
}

function* proseParagraphs(body) {
  for (const node of parser.parse(body).children) {
    // Solo párrafos de primer nivel: descarta títulos, citas, listas, tablas y código.
    if (node.type !== 'paragraph') continue;
    const children = [...node.children];
    while (children.length && (
      isSeriesNote(children[0])
      || (children[0].type === 'text' && !children[0].value.trim())
    )) children.shift();
    const text = normalize(plainText({ children }).replace(/https?:\/\/\S+/giu, ''));
    if (!text || /^(?:keywords|palabras clave)\s*:/iu.test(text)) continue;
    if (/^(?:por|by)\s+Carlos Dagorret[.!]?$/iu.test(text)) continue;
    // Un subtítulo aislado en cursiva sin oración completa tampoco es prosa inicial.
    if (children.length === 1 && children[0].type === 'emphasis' && !/[.!?]/u.test(text)) continue;
    if (['abstract', 'resumen', 'introducción', 'introduction'].includes(text.toLocaleLowerCase())) continue;
    // Una oración de prosa debe contener al menos dos palabras legibles.
    if ((text.match(/\p{L}+/gu) ?? []).length < 2) continue;
    yield text;
  }
}

function truncate(text) {
  if ([...text].length <= 155) return text;
  const characters = [...text];
  let cut = 152;
  if (!/\s/u.test(characters[cut] ?? '')) {
    while (cut > 0 && !/\s/u.test(characters[cut - 1])) cut--;
  }
  const shortened = characters.slice(0, cut).join('').trimEnd();
  return shortened ? `${shortened}...` : '';
}

// La descripción propia se conserva; el texto automático se obtiene del primer párrafo de prosa.
export function resolveArticleDescription({ description, body = '', lang }) {
  if (typeof description === 'string' && description.trim()) {
    return { description, source: 'own' };
  }
  const segmenter = new Intl.Segmenter(lang, { granularity: 'sentence' });
  const sentences = [];
  for (const paragraph of proseParagraphs(body)) {
    for (const item of segmenter.segment(paragraph)) {
      const sentence = normalize(item.segment);
      if (sentence) sentences.push(sentence);
      if (sentences.length >= 2 || (sentences[0] && [...sentences[0]].length >= 70)) break;
    }
    if (sentences.length >= 2 || (sentences[0] && [...sentences[0]].length >= 70)) break;
  }
  let generated = sentences[0] ?? '';
  if ([...generated].length < 70 && sentences[1]) generated += ` ${sentences[1]}`;
  generated = truncate(generated);
  return generated
    ? { description: generated, source: 'generated' }
    : { description: siteDescriptions[lang], source: 'fallback' };
}
