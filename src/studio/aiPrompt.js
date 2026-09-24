import { ART_KEYS } from '../reader/ComicPanel';
import { LENSES } from './convert';

export function buildAiPrompt(title) {
  return `I'm turning a research paper${title ? ` ("${title}")` : ''} into a 4-layer interactive reader. The PDF is attached. Read it carefully and return ONLY a single JSON object (no commentary, no code fences) with this exact shape:

{
  "title": "Short, reader-friendly title",
  "subtitle": "Optional one-line subtitle",
  "authors": "First author et al.",
  "journal": "Journal, year",
  "doi": "10.xxxx/... (no https://doi.org prefix; empty string if none)",
  "tagline": "One or two sentences on why a busy reader should care",
  "comic": {
    "panels": [
      { "title": "Panel title", "caption": "1-3 sentences, one story beat", "svg": "one of the illustration keys below" }
    ]
  },
  "slides": [
    { "kind": "title", "eyebrow": "Slide 1 of N", "title": "...", "body": "..." },
    { "kind": "text", "eyebrow": "Slide 2 of N — Background", "title": "...", "body": "..." },
    { "kind": "headline", "eyebrow": "Slide k of N — The key number", "title": "A short number or phrase", "body": "..." },
    { "kind": "chart", "eyebrow": "Slide k of N — Results", "title": "...", "body": "...",
      "chart": { "kind": "bars", "unit": "%", "max": 100,
        "bars": [ { "label": "Intervention", "value": 12.3, "color": "#1E3A5F" }, { "label": "Control", "value": 10.1, "color": "#9e9e9e" } ] } }
  ],
  "paper": {
    "glossary": { "Term": "Plain-language definition a non-specialist understands" },
    "marginNotes": { "s1-p1": "What this sentence actually claims: ..." },
    "sections": [
      { "heading": "Abstract",
        "paragraphs": [
          { "id": "s1-p1", "text": ["Plain text, then ", { "term": "Term", "text": "text as it appears" }, " more text."], "marginNote": "s1-p1" }
        ] }
    ]
  },
  "governance": {
    "intro": "One paragraph framing the decisions institutions face because of this paper",
    "cards": [
      { "id": "card-1", "title": "A concrete decision, phrased as a question",
        "context": "Who is deciding what, and why now",
        "lenses": [${LENSES.map((l) => `{ "lens": "${l}", "body": "..." }`).join(', ')}],
        "prompt": "An open discussion question for a journal club or committee" }
    ]
  }
}

Rules:
- Comic: 6-8 panels telling the paper as a story (problem, what was done, twist, meaning). "svg" MUST be one of: ${ART_KEYS.join(', ')}.
- Slides: about 10. Only kinds "title", "text", "headline", "chart". Number eyebrows "Slide i of N". Chart values must come from the paper; never invent numbers. Bar colours: "#1E3A5F" intervention, "#9e9e9e" control, "#2e7d32" benefit, "#c62828" harm, "#ff8f00" warning.
- Paper: the abstract plus the 1-2 most important results sections, using the paper's own wording. Mark 8-15 technical terms as {"term","text"} objects; every "term" must be a key in "glossary". Paragraph ids are "s<section>-p<paragraph>". Add 2-3 margin notes on the sentences carrying the paper's main claims, saying plainly what is and isn't being claimed.
- Governance: 2 cards. Each lens is 2-4 sentences. Use exactly these lens names: ${LENSES.join(', ')}.
- Be accurate. If the paper doesn't support something, leave it out rather than guessing.`;
}
