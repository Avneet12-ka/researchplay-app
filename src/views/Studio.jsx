import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { supabase, supabaseConfigured } from '../supabaseClient';
import { contentToDraft, draftToContent, emptyDraft, findIssues } from '../studio/convert';
import { buildAiPrompt } from '../studio/aiPrompt';
import {
  ComicEditor,
  DetailsEditor,
  GovernanceEditor,
  PaperEditor,
  SlidesEditor,
} from '../studio/Editors';
import PaperLayers from '../reader/PaperLayers';
import { PaperHeader } from './PaperReader';

const TABS = [
  { key: 'details', label: 'Details' },
  { key: 'comic', label: '1 · Comic' },
  { key: 'slides', label: '2 · Slides' },
  { key: 'paper', label: '3 · Paper + glossary' },
  { key: 'governance', label: '4 · Governance' },
  { key: 'preview', label: 'Preview' },
  { key: 'json', label: 'JSON' },
];

function isMissingTable(error) {
  return error && (error.code === 'PGRST205' || error.code === '42P01' || /paper_layers/.test(error.message || ''));
}

function stripFences(text) {
  return text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```$/, '').trim();
}

function JsonTab({ draft, onApply, onOpenPrompt }) {
  const [text, setText] = useState(() => JSON.stringify(draftToContent(draft), null, 2));
  const [error, setError] = useState(null);

  const apply = () => {
    try {
      const parsed = JSON.parse(stripFences(text));
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Expected a JSON object.');
      onApply(contentToDraft(parsed));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ color: '#607d8b', mb: 2, maxWidth: 760, lineHeight: 1.6 }}>
        The whole paper as JSON. Fastest way to fill every layer at once: click <b>Copy AI prompt</b>, paste it into
        Claude together with the PDF, then paste the JSON it returns here and click <b>Apply</b>. Review every layer
        afterwards — AI drafts can get numbers or emphasis wrong.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button variant="contained" onClick={apply}>
          Apply JSON
        </Button>
        <Button startIcon={<AutoAwesomeIcon />} onClick={onOpenPrompt}>
          Copy AI prompt
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Couldn’t apply: {error}
        </Alert>
      )}
      <TextField
        fullWidth
        multiline
        minRows={24}
        value={text}
        onChange={(e) => setText(e.target.value)}
        slotProps={{ input: { sx: { fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13 } } }}
      />
    </Box>
  );
}

export default function Studio() {
  const { paperId } = useParams();
  const pid = Number(paperId);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [upload, setUpload] = useState(null);
  const [draft, setDraft] = useState(null);
  const [savedSnapshot, setSavedSnapshot] = useState('');
  const [published, setPublished] = useState(false);
  const [tab, setTab] = useState('details');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [pendingIssues, setPendingIssues] = useState(null);
  const [promptOpen, setPromptOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!supabaseConfigured || !Number.isFinite(pid)) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    Promise.all([
      supabase.from('papers').select('id, title, file_name, file_url').eq('id', pid).maybeSingle(),
      supabase.from('paper_layers').select('content, published').eq('paper_id', pid).maybeSingle(),
    ]).then(([paperRes, layersRes]) => {
      if (cancelled) return;
      if (paperRes.error) {
        console.error('Failed to load paper:', paperRes.error);
        setLoadError(paperRes.error.message);
      } else if (!paperRes.data) {
        setLoadError('No uploaded paper with this id.');
      }
      if (isMissingTable(layersRes.error)) setNeedsSetup(true);
      else if (layersRes.error) console.error('Failed to load layers:', layersRes.error);

      const initial = layersRes.data?.content ? contentToDraft(layersRes.data.content) : emptyDraft(paperRes.data);
      setUpload(paperRes.data);
      setDraft(initial);
      setSavedSnapshot(JSON.stringify(initial));
      setPublished(Boolean(layersRes.data?.published));
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [pid]);

  const dirty = useMemo(() => draft && JSON.stringify(draft) !== savedSnapshot, [draft, savedSnapshot]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const save = async (nextPublished) => {
    setSaving(true);
    setStatus(null);
    const content = draftToContent(draft);
    const { error } = await supabase
      .from('paper_layers')
      .upsert(
        { paper_id: pid, content, published: nextPublished, updated_at: new Date().toISOString() },
        { onConflict: 'paper_id' }
      );
    setSaving(false);

    if (error) {
      console.error('Failed to save paper layers:', error);
      if (isMissingTable(error)) setNeedsSetup(true);
      setStatus({ severity: 'error', message: `Save failed: ${error.message}` });
      return;
    }
    setSavedSnapshot(JSON.stringify(draft));
    setPublished(nextPublished);
    setStatus({
      severity: 'success',
      message: nextPublished ? 'Published — this paper now opens in the 4-layer reader.' : 'Draft saved.',
    });
  };

  const tryPublish = () => {
    const issues = findIssues(draftToContent(draft));
    if (issues.length) setPendingIssues(issues);
    else save(true);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildAiPrompt(upload?.title));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!supabaseConfigured) {
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Alert severity="info">The studio needs Supabase configuration. Contact the admin.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 6, display: 'flex', gap: 2, alignItems: 'center' }}>
        <CircularProgress size={20} />
        <Typography>Loading studio…</Typography>
      </Container>
    );
  }

  if (loadError || !draft) {
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {loadError || 'Could not load this paper.'}
        </Alert>
        <Button component={RouterLink} to="/papers" startIcon={<ArrowBackIcon />}>
          All papers
        </Button>
      </Container>
    );
  }

  const content = tab === 'preview' ? draftToContent(draft) : null;

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Button component={RouterLink} to="/papers" startIcon={<ArrowBackIcon />} size="small" sx={{ mb: 2, color: '#607d8b' }}>
          All papers
        </Button>

        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, border: '1px solid #D8CFBE', mb: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="overline" sx={{ color: '#1E3A5F', letterSpacing: '0.14em', fontWeight: 700 }}>
              Studio
            </Typography>
            <Chip size="small" label={published ? 'Published' : 'Draft'} color={published ? 'primary' : 'default'} />
            {dirty && <Chip size="small" label="Unsaved changes" color="secondary" variant="outlined" />}
          </Box>
          <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', color: '#0B1728' }}>
            {draft.title || upload?.title || 'Untitled paper'}
          </Typography>
          {upload?.file_name && (
            <Typography variant="body2" sx={{ color: '#78909c', mt: 0.5 }}>
              Source: {upload.file_name}
            </Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {upload?.file_url && (
              <Button href={upload.file_url} target="_blank" rel="noopener" startIcon={<PictureAsPdfIcon />} variant="outlined" size="small">
                Open PDF
              </Button>
            )}
            <Button startIcon={<AutoAwesomeIcon />} variant="outlined" size="small" onClick={() => setPromptOpen(true)}>
              Copy AI prompt
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {published && (
              <Button component={RouterLink} to={`/reader/${pid}`} startIcon={<AutoStoriesIcon />} size="small">
                View in reader
              </Button>
            )}
            <Button variant="outlined" size="small" disabled={saving} onClick={() => save(published)}>
              {published ? 'Save changes' : 'Save draft'}
            </Button>
            {published ? (
              <Button size="small" color="inherit" disabled={saving} onClick={() => save(false)}>
                Unpublish
              </Button>
            ) : (
              <Button variant="contained" color="secondary" size="small" disabled={saving} onClick={tryPublish}>
                Publish as 4-layer
              </Button>
            )}
          </Box>
        </Paper>

        {needsSetup && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            The <code>paper_layers</code> table doesn’t exist in Supabase yet, so drafts can’t be saved. Run{' '}
            <code>supabase/setup.sql</code> from the repo in the Supabase SQL Editor, then reload this page.
          </Alert>
        )}
        {status && (
          <Alert severity={status.severity} sx={{ mb: 2 }} onClose={() => setStatus(null)}>
            {status.message}
          </Alert>
        )}

        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: '1px solid #D8CFBE', mb: 3 }}>
          {TABS.map((t) => (
            <Tab key={t.key} value={t.key} label={t.label} />
          ))}
        </Tabs>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {tab === 'details' && <DetailsEditor draft={draft} setDraft={setDraft} />}
        {tab === 'comic' && <ComicEditor draft={draft} setDraft={setDraft} />}
        {tab === 'slides' && <SlidesEditor draft={draft} setDraft={setDraft} />}
        {tab === 'paper' && <PaperEditor draft={draft} setDraft={setDraft} />}
        {tab === 'governance' && <GovernanceEditor draft={draft} setDraft={setDraft} />}
        {tab === 'preview' && (
          <Box>
            {findIssues(content).map((issue) => (
              <Alert key={issue} severity="warning" sx={{ mb: 1 }}>
                {issue}
              </Alert>
            ))}
            <Box sx={{ mt: 2 }}>
              <PaperHeader paper={content} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <PaperLayers paper={content} />
            </Box>
          </Box>
        )}
        {tab === 'json' && (
          <JsonTab
            draft={draft}
            onApply={(next) => {
              setDraft(next);
              setStatus({ severity: 'info', message: 'JSON applied. Review each layer, then save or publish.' });
            }}
            onOpenPrompt={() => setPromptOpen(true)}
          />
        )}
      </Container>

      <Dialog open={Boolean(pendingIssues)} onClose={() => setPendingIssues(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Publish with gaps?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Readers will see these gaps. Empty layers show a “not written yet” message.
          </Typography>
          {pendingIssues?.map((issue) => (
            <Alert key={issue} severity="warning" sx={{ mb: 1 }}>
              {issue}
            </Alert>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingIssues(null)}>Keep editing</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setPendingIssues(null);
              save(true);
            }}
          >
            Publish anyway
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={promptOpen} onClose={() => setPromptOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Draft all four layers with AI</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            1. Copy this prompt. 2. Open Claude, attach the PDF and paste the prompt. 3. Copy the JSON it returns into
            the <b>JSON</b> tab here and click <b>Apply JSON</b>. 4. Check every layer against the paper before
            publishing.
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={12}
            maxRows={20}
            value={buildAiPrompt(upload?.title)}
            slotProps={{ input: { readOnly: true, sx: { fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12 } } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPromptOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              copyPrompt();
              setTab('json');
            }}
          >
            {copied ? 'Copied!' : 'Copy prompt'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
