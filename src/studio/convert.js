export const LENSES = ['Institutional policy', 'Regulatory', 'Ethics', 'Equity'];
export const SLIDE_KINDS = [
  { value: 'title', label: 'Title slide' },
  { value: 'text', label: 'Text slide' },
  { value: 'headline', label: 'Big number / headline' },
  { value: 'chart', label: 'Bar chart' },
];
export const BAR_COLORS = [
  { value: '#1E3A5F', label: 'Primary (intervention)' },
  { value: '#9e9e9e', label: 'Gray (control)' },
  { value: '#2e7d32', label: 'Green (benefit)' },
  { value: '#c62828', label: 'Red (harm)' },
  { value: '#ff8f00', label: 'Amber (warning)' },
];

const MARKUP = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

// "Text with [[Term|shown text]] and [[Term]]" -> ["Text with ", {term, text}, " and ", {term, text}]
export function parseMarkup(str) {
  const parts = [];
  let last = 0;
  for (const m of str.matchAll(MARKUP)) {
    if (m.index > last) parts.push(str.slice(last, m.index));
    const term = m[1].trim();
    parts.push({ term, text: (m[2] ?? m[1]).trim() });
    last = m.index + m[0].length;
  }
  if (last < str.length) parts.push(str.slice(last));
  return parts;
}

export function toMarkup(parts) {
  if (typeof parts === 'string') return parts;
  return parts
    .map((p) => (typeof p === 'string' ? p : p.term === p.text ? `[[${p.term}]]` : `[[${p.term}|${p.text}]]`))
    .join('');
}

export const newPanel = () => ({ title: '', caption: '', svg: 'alert' });
export const newSlide = () => ({ kind: 'text', label: '', title: '', body: '', unit: '%', max: '', bars: [] });
export const newBar = () => ({ label: '', value: '', color: '#1E3A5F' });
export const newSection = () => ({ heading: '', paragraphs: [newParagraph()] });
export const newParagraph = () => ({ text: '', note: '' });
export const newTerm = () => ({ term: '', definition: '' });
export const newCard = () => ({
  title: '',
  context: '',
  lenses: LENSES.map((lens) => ({ lens, body: '' })),
  prompt: '',
});

export function emptyDraft(upload) {
  return {
    title: upload?.title || '',
    subtitle: '',
    authors: '',
    journal: '',
    doi: '',
    tagline: '',
    panels: [newPanel()],
    slides: [{ ...newSlide(), kind: 'title' }],
    glossary: [newTerm()],
    sections: [{ heading: 'Abstract', paragraphs: [newParagraph()] }],
    govIntro: '',
    cards: [newCard()],
  };
}

const stripSlidePrefix = (eyebrow = '') => eyebrow.replace(/^Slide \d+ of \d+\s*(—\s*)?/, '');

export function contentToDraft(c) {
  const notes = c.paper?.marginNotes || {};
  return {
    title: c.title || '',
    subtitle: c.subtitle || '',
    authors: c.authors || '',
    journal: c.journal || '',
    doi: c.doi || '',
    tagline: c.tagline || '',
    panels: (c.comic?.panels || []).map((p) => ({ ...newPanel(), ...p })),
    slides: (c.slides || []).map((s) => ({
      ...newSlide(),
      kind: s.kind,
      label: stripSlidePrefix(s.eyebrow),
      title: s.title || '',
      body: s.body || '',
      unit: s.chart?.unit ?? '%',
      max: s.chart?.max ?? '',
      bars: (s.chart?.bars || []).map((b) => ({ ...b, value: String(b.value) })),
      raw: s.kind === 'cohortChart' ? s : undefined,
    })),
    glossary: Object.entries(c.paper?.glossary || {}).map(([term, definition]) => ({ term, definition })),
    sections: (c.paper?.sections || []).map((s) => ({
      heading: s.heading || '',
      paragraphs: s.paragraphs.map((p) => ({
        text: toMarkup(p.text),
        note: p.marginNote ? notes[p.marginNote] || '' : '',
      })),
    })),
    govIntro: c.governance?.intro || '',
    cards: (c.governance?.cards || []).map((card) => ({
      title: card.title || '',
      context: card.context || '',
      lenses: LENSES.map((lens) => ({
        lens,
        body: card.lenses?.find((l) => l.lens === lens)?.body || '',
      })),
      prompt: card.prompt || '',
    })),
  };
}

const hasText = (...vals) => vals.some((v) => String(v ?? '').trim());

export function draftToContent(draft) {
  const d = {
    ...draft,
    panels: draft.panels.filter((p) => hasText(p.title, p.caption)),
    slides: draft.slides.filter((s) => s.raw || hasText(s.title, s.body)),
    cards: draft.cards.filter((c) => hasText(c.title, c.context, c.prompt, ...c.lenses.map((l) => l.body))),
  };
  const total = d.slides.length;
  const marginNotes = {};
  const glossary = {};
  for (const g of d.glossary) {
    if (g.term.trim()) glossary[g.term.trim()] = g.definition.trim();
  }

  return {
    title: d.title.trim(),
    subtitle: d.subtitle.trim(),
    authors: d.authors.trim(),
    journal: d.journal.trim(),
    doi: d.doi.trim(),
    tagline: d.tagline.trim(),
    comic: {
      panels: d.panels.map((p) => ({ title: p.title.trim(), caption: p.caption.trim(), svg: p.svg })),
    },
    slides: d.slides.map((s, i) => {
      if (s.raw) return { ...s.raw, eyebrow: eyebrow(i, total, s.label) };
      const slide = { kind: s.kind, eyebrow: eyebrow(i, total, s.label), title: s.title.trim(), body: s.body.trim() };
      if (s.kind === 'chart') {
        const bars = s.bars
          .filter((b) => b.label.trim() && b.value !== '')
          .map((b) => ({ label: b.label.trim(), value: Number(b.value), color: b.color }));
        const biggest = Math.max(0, ...bars.map((b) => b.value));
        const max = s.max === '' ? Math.ceil(biggest * 1.15) || 1 : Number(s.max);
        slide.chart = { kind: 'bars', unit: s.unit, max, bars };
      }
      return slide;
    }),
    paper: {
      glossary,
      marginNotes,
      sections: d.sections.map((sec, si) => ({
        heading: sec.heading.trim(),
        paragraphs: sec.paragraphs
          .filter((p) => p.text.trim())
          .map((p, pi) => {
            const id = `s${si + 1}-p${pi + 1}`;
            const para = { id, text: parseMarkup(p.text.trim()) };
            if (p.note.trim()) {
              marginNotes[id] = p.note.trim();
              para.marginNote = id;
            }
            return para;
          }),
      })),
    },
    governance: {
      intro: d.govIntro.trim(),
      cards: d.cards.map((c, i) => ({
        id: `card-${i + 1}`,
        title: c.title.trim(),
        context: c.context.trim(),
        lenses: c.lenses.filter((l) => l.body.trim()).map((l) => ({ lens: l.lens, body: l.body.trim() })),
        prompt: c.prompt.trim(),
      })),
    },
  };
}

function eyebrow(i, total, label) {
  const base = `Slide ${i + 1} of ${total}`;
  return label?.trim() ? `${base} — ${label.trim()}` : base;
}

export function findIssues(content) {
  const issues = [];
  if (!content.title) issues.push('Title is empty.');
  if (!content.comic.panels.length) issues.push('Comic has no panels.');
  if (!content.slides.length) issues.push('Slides layer has no slides.');
  if (!content.paper.sections.some((s) => s.paragraphs.length)) issues.push('Paper layer has no paragraphs.');
  if (!content.governance.cards.length) issues.push('Governance has no cards.');

  const undefinedTerms = new Set();
  for (const s of content.paper.sections) {
    for (const p of s.paragraphs) {
      for (const part of p.text) {
        if (typeof part !== 'string' && !content.paper.glossary[part.term]) undefinedTerms.add(part.term);
      }
    }
  }
  if (undefinedTerms.size) {
    issues.push(`Terms marked in the text but missing from the glossary: ${[...undefinedTerms].join(', ')}.`);
  }
  content.slides.forEach((s, i) => {
    if (s.kind === 'chart' && !s.chart?.bars.length) issues.push(`Slide ${i + 1} is a chart with no bars.`);
  });
  return issues;
}
