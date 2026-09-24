import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ComicPanel, { ART_KEYS } from '../reader/ComicPanel';
import {
  BAR_COLORS,
  SLIDE_KINDS,
  newBar,
  newCard,
  newPanel,
  newParagraph,
  newSection,
  newSlide,
  newTerm,
} from './convert';

function listOps(setDraft, key) {
  const edit = (fn) => setDraft((d) => ({ ...d, [key]: fn(d[key]) }));
  return {
    update: (i, patch) => edit((list) => list.map((x, j) => (j === i ? { ...x, ...patch } : x))),
    add: (item) => edit((list) => [...list, item]),
    remove: (i) => edit((list) => list.filter((_, j) => j !== i)),
    move: (i, dir) =>
      edit((list) => {
        const j = i + dir;
        if (j < 0 || j >= list.length) return list;
        const next = [...list];
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      }),
  };
}

function ItemShell({ label, index, count, ops, children }) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, mb: 2, border: '1px solid #D8CFBE', backgroundColor: '#fff' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="overline" sx={{ color: '#1E3A5F', fontWeight: 700, letterSpacing: '0.12em', flexGrow: 1 }}>
          {label} {index + 1}
        </Typography>
        <Tooltip title="Move up">
          <span>
            <IconButton size="small" disabled={index === 0} onClick={() => ops.move(index, -1)}>
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Move down">
          <span>
            <IconButton size="small" disabled={index === count - 1} onClick={() => ops.move(index, 1)}>
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Remove">
          <IconButton size="small" onClick={() => ops.remove(index)}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      {children}
    </Paper>
  );
}

function Hint({ children }) {
  return (
    <Typography variant="body2" sx={{ color: '#607d8b', mb: 3, maxWidth: 760, lineHeight: 1.6 }}>
      {children}
    </Typography>
  );
}

const field = (value, onChange, props = {}) => (
  <TextField fullWidth size="small" value={value} onChange={(e) => onChange(e.target.value)} {...props} />
);

export function DetailsEditor({ draft, setDraft }) {
  const set = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }));
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 760 }}>
      <Hint>Shown in the reader header and on the Papers page card.</Hint>
      {field(draft.title, set('title'), { label: 'Title', required: true })}
      {field(draft.subtitle, set('subtitle'), { label: 'Subtitle (optional)' })}
      {field(draft.authors, set('authors'), { label: 'Authors', placeholder: 'Wissel BD, et al.' })}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 7 }}>{field(draft.journal, set('journal'), { label: 'Journal & year' })}</Grid>
        <Grid size={{ xs: 12, sm: 5 }}>{field(draft.doi, set('doi'), { label: 'DOI', placeholder: '10.1093/…' })}</Grid>
      </Grid>
      {field(draft.tagline, set('tagline'), {
        label: 'One-line hook',
        multiline: true,
        minRows: 2,
        helperText: 'Why should a busy reader care? One or two sentences.',
      })}
    </Box>
  );
}

export function ComicEditor({ draft, setDraft }) {
  const ops = listOps(setDraft, 'panels');
  return (
    <Box>
      <Hint>
        One beat per panel — usually 6 to 8 panels that tell the paper as a story: the problem, what was done, the
        twist, what it means. Pick an illustration for each from the library; the preview updates as you type.
      </Hint>
      {draft.panels.map((p, i) => (
        <ItemShell key={i} label="Panel" index={i} count={draft.panels.length} ops={ops}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {field(p.title, (v) => ops.update(i, { title: v }), { label: 'Panel title' })}
              {field(p.caption, (v) => ops.update(i, { caption: v }), { label: 'Caption', multiline: true, minRows: 3 })}
              {field(p.svg, (v) => ops.update(i, { svg: v }), {
                label: 'Illustration',
                select: true,
                children: ART_KEYS.map((k) => (
                  <MenuItem key={k} value={k}>
                    {k}
                  </MenuItem>
                )),
              })}
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <ComicPanel panel={p} index={i} />
            </Grid>
          </Grid>
        </ItemShell>
      ))}
      <Button startIcon={<AddIcon />} onClick={() => ops.add(newPanel())}>
        Add panel
      </Button>
    </Box>
  );
}

function BarsEditor({ bars, onChange }) {
  const update = (j, patch) => onChange(bars.map((b, k) => (k === j ? { ...b, ...patch } : b)));
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {bars.map((b, j) => (
        <Box key={j} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1.5fr auto' }, gap: 1 }}>
          {field(b.label, (v) => update(j, { label: v }), { label: 'Bar label' })}
          {field(b.value, (v) => update(j, { value: v }), { label: 'Value', type: 'number' })}
          {field(b.color, (v) => update(j, { color: v }), {
            label: 'Colour',
            select: true,
            children: BAR_COLORS.map((c) => (
              <MenuItem key={c.value} value={c.value}>
                <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: '2px', backgroundColor: c.value, mr: 1 }} />
                {c.label}
              </MenuItem>
            )),
          })}
          <IconButton size="small" onClick={() => onChange(bars.filter((_, k) => k !== j))} sx={{ alignSelf: 'center' }}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button size="small" startIcon={<AddIcon />} onClick={() => onChange([...bars, newBar()])} sx={{ alignSelf: 'flex-start' }}>
        Add bar
      </Button>
    </Box>
  );
}

export function SlidesEditor({ draft, setDraft }) {
  const ops = listOps(setDraft, 'slides');
  return (
    <Box>
      <Hint>
        A guided walkthrough, usually around 10 slides. Slide numbers are added automatically. Use a “Big number”
        slide for the one figure a reader should remember, and bar charts for the key comparison.
      </Hint>
      {draft.slides.map((s, i) => (
        <ItemShell key={i} label="Slide" index={i} count={draft.slides.length} ops={ops}>
          {s.raw ? (
            <Typography variant="body2" sx={{ color: '#607d8b' }}>
              Interactive cohort chart — edit it in the JSON tab.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 5 }}>
                  {field(s.kind, (v) => ops.update(i, { kind: v }), {
                    label: 'Slide type',
                    select: true,
                    children: SLIDE_KINDS.map((k) => (
                      <MenuItem key={k.value} value={k.value}>
                        {k.label}
                      </MenuItem>
                    )),
                  })}
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }}>
                  {field(s.label, (v) => ops.update(i, { label: v }), { label: 'Section label (optional)', placeholder: 'Background' })}
                </Grid>
              </Grid>
              {field(s.title, (v) => ops.update(i, { title: v }), {
                label: s.kind === 'headline' ? 'Big number or phrase' : 'Title',
                placeholder: s.kind === 'headline' ? '43 deaths' : '',
              })}
              {field(s.body, (v) => ops.update(i, { body: v }), { label: 'Body', multiline: true, minRows: 3 })}
              {s.kind === 'chart' && (
                <>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6, sm: 3 }}>{field(s.unit, (v) => ops.update(i, { unit: v }), { label: 'Unit', placeholder: '%' })}</Grid>
                    <Grid size={{ xs: 6, sm: 3 }}>
                      {field(s.max, (v) => ops.update(i, { max: v }), { label: 'Axis max', type: 'number', helperText: 'Blank = auto' })}
                    </Grid>
                  </Grid>
                  <BarsEditor bars={s.bars} onChange={(bars) => ops.update(i, { bars })} />
                </>
              )}
            </Box>
          )}
        </ItemShell>
      ))}
      <Button startIcon={<AddIcon />} onClick={() => ops.add(newSlide())}>
        Add slide
      </Button>
    </Box>
  );
}

export function PaperEditor({ draft, setDraft }) {
  const termOps = listOps(setDraft, 'glossary');
  const secOps = listOps(setDraft, 'sections');

  return (
    <Box>
      <Hint>
        Paste the abstract and key results, one paragraph per box. To make a term hoverable, wrap it in double
        brackets: <code>[[AKI]]</code>, or <code>[[AKI|acute kidney injury]]</code> to show different text than the
        glossary key. Every bracketed term needs a glossary entry below. Add a margin note to flag what a sentence
        is really claiming.
      </Hint>

      <Typography variant="h6" sx={{ mb: 1.5 }}>Glossary</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {draft.glossary.map((g, i) => (
          <Box key={i} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 3fr auto' }, gap: 1 }}>
            {field(g.term, (v) => termOps.update(i, { term: v }), { label: 'Term' })}
            {field(g.definition, (v) => termOps.update(i, { definition: v }), { label: 'Plain-language definition', multiline: true })}
            <IconButton size="small" onClick={() => termOps.remove(i)} sx={{ alignSelf: 'center' }}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button size="small" startIcon={<AddIcon />} onClick={() => termOps.add(newTerm())} sx={{ alignSelf: 'flex-start' }}>
          Add term
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 1.5 }}>Sections</Typography>
      {draft.sections.map((sec, i) => {
        const setParas = (paragraphs) => secOps.update(i, { paragraphs });
        const updatePara = (j, patch) => setParas(sec.paragraphs.map((p, k) => (k === j ? { ...p, ...patch } : p)));
        return (
          <ItemShell key={i} label="Section" index={i} count={draft.sections.length} ops={secOps}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {field(sec.heading, (v) => secOps.update(i, { heading: v }), { label: 'Heading', placeholder: 'Abstract' })}
              {sec.paragraphs.map((p, j) => (
                <Box key={j} sx={{ pl: 2, borderLeft: '3px solid #EDE5D7', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#78909c', flexGrow: 1 }}>
                      Paragraph {j + 1}
                    </Typography>
                    <IconButton size="small" onClick={() => setParas(sec.paragraphs.filter((_, k) => k !== j))}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  {field(p.text, (v) => updatePara(j, { text: v }), { multiline: true, minRows: 4, placeholder: 'Paragraph text with [[Terms]]…' })}
                  {field(p.note, (v) => updatePara(j, { note: v }), { label: 'Margin note (optional)', multiline: true })}
                </Box>
              ))}
              <Button size="small" startIcon={<AddIcon />} onClick={() => setParas([...sec.paragraphs, newParagraph()])} sx={{ alignSelf: 'flex-start' }}>
                Add paragraph
              </Button>
            </Box>
          </ItemShell>
        );
      })}
      <Button startIcon={<AddIcon />} onClick={() => secOps.add(newSection())}>
        Add section
      </Button>
    </Box>
  );
}

export function GovernanceEditor({ draft, setDraft }) {
  const ops = listOps(setDraft, 'cards');
  return (
    <Box>
      <Hint>
        Each card is a real decision an institution might face because of this paper, looked at through four lenses.
        Leave a lens blank to skip it. End with a discussion prompt for a journal club or committee.
      </Hint>
      {field(draft.govIntro, (v) => setDraft((d) => ({ ...d, govIntro: v })), { label: 'Intro', multiline: true, minRows: 2, sx: { mb: 3 } })}
      {draft.cards.map((c, i) => (
        <ItemShell key={i} label="Card" index={i} count={draft.cards.length} ops={ops}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {field(c.title, (v) => ops.update(i, { title: v }), { label: 'Decision / question', placeholder: 'Should our hospital turn this alert on?' })}
            {field(c.context, (v) => ops.update(i, { context: v }), { label: 'Context', multiline: true, minRows: 2 })}
            {c.lenses.map((l, j) => (
              <Box key={l.lens}>
                {field(
                  l.body,
                  (v) => ops.update(i, { lenses: c.lenses.map((x, k) => (k === j ? { ...x, body: v } : x)) }),
                  { label: l.lens, multiline: true, minRows: 2 }
                )}
              </Box>
            ))}
            {field(c.prompt, (v) => ops.update(i, { prompt: v }), { label: 'Discussion prompt', multiline: true })}
          </Box>
        </ItemShell>
      ))}
      <Button startIcon={<AddIcon />} onClick={() => ops.add(newCard())}>
        Add card
      </Button>
    </Box>
  );
}
