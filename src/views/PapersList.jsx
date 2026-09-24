import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import { papers as seedPapers } from '../data/papers';
import { supabase, supabaseConfigured } from '../supabaseClient';
import { setPapers } from '../store/papersSlice';

function InteractiveCard({ paper, studioId }) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderTop: '4px solid #1E3A5F', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip label="4 layers" size="small" sx={{ backgroundColor: '#F3E4D8', color: '#1E3A5F', fontWeight: 600 }} />
        {studioId && <Chip label="Uploaded" size="small" sx={{ backgroundColor: '#eceff1', color: '#455a64' }} />}
      </Box>
      <Typography variant="h6" sx={{ fontFamily: 'Roboto Slab, serif', mt: 1.5, color: '#0B1728' }}>
        {paper.title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#607d8b', mt: 0.5 }}>
        {paper.journal}
      </Typography>
      {paper.tagline && (
        <Typography variant="body2" sx={{ color: '#37474f', mt: 1.5, flexGrow: 1, lineHeight: 1.6 }}>
          {paper.tagline}
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 1, mt: 2.5 }}>
        <Button component={RouterLink} to={`/reader/${paper.id}`} variant="contained" startIcon={<AutoStoriesIcon />}>
          Open reader
        </Button>
        {studioId && (
          <Button component={RouterLink} to={`/studio/${studioId}`} startIcon={<EditIcon />}>
            Edit
          </Button>
        )}
      </Box>
    </Paper>
  );
}

function UploadedCard({ paper, hasDraft }) {
  const uploaded = paper.uploaded_at || paper.uploadDate;
  return (
    <Paper elevation={1} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Chip label="Uploaded" size="small" sx={{ alignSelf: 'flex-start', backgroundColor: '#eceff1', color: '#455a64' }} />
      <Typography variant="h6" sx={{ mt: 1.5, color: '#263238' }}>
        {paper.title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#607d8b', mt: 0.5 }}>
        {uploaded ? `Uploaded ${new Date(uploaded).toLocaleDateString()}` : ''}
        {paper.file_name ? ` · ${paper.file_name}` : ''}
      </Typography>
      <Typography variant="body2" sx={{ color: '#78909c', mt: 2, mb: 2, fontStyle: 'italic', flexGrow: 1 }}>
        {hasDraft
          ? 'Draft in progress — publish it from the studio to open it in the 4-layer reader.'
          : 'Read-only PDF for now. Build the four layers in the studio to make it interactive.'}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {paper.file_url && (
          <Button component={Link} href={paper.file_url} target="_blank" rel="noopener" variant="outlined" startIcon={<PictureAsPdfIcon />}>
            Open PDF
          </Button>
        )}
        <Button component={RouterLink} to={`/studio/${paper.id}`} variant="contained" color="secondary" startIcon={<EditIcon />}>
          {hasDraft ? 'Continue draft' : 'Build 4 layers'}
        </Button>
      </Box>
    </Paper>
  );
}

export default function PapersList() {
  const dispatch = useDispatch();
  const uploaded = useSelector((s) => s.papers.papers);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [layers, setLayers] = useState({});

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;

    async function fetchPapers() {
      setLoading(true);
      setFetchError(null);
      const [papersRes, layersRes] = await Promise.all([
        supabase.from('papers').select('*').order('uploaded_at', { ascending: false }),
        supabase
          .from('paper_layers')
          .select('paper_id, published, title:content->>title, journal:content->>journal, tagline:content->>tagline'),
      ]);

      if (cancelled) return;
      if (papersRes.error) {
        console.error('Failed to fetch papers:', papersRes.error);
        setFetchError(papersRes.error.message);
      } else {
        dispatch(setPapers(papersRes.data || []));
      }
      if (layersRes.error) {
        console.error('Failed to fetch paper layers:', layersRes.error);
      } else {
        setLayers(Object.fromEntries((layersRes.data || []).map((l) => [l.paper_id, l])));
      }
      setLoading(false);
    }

    fetchPapers();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const publishedUploads = uploaded.filter((p) => layers[p.id]?.published);
  const pendingUploads = uploaded.filter((p) => !layers[p.id]?.published);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" sx={{ fontFamily: 'Roboto Slab, serif', color: '#0B1728', mb: 1 }}>
        Papers
      </Typography>
      <Typography variant="body1" sx={{ color: '#607d8b', mb: 4, maxWidth: 720 }}>
        Interactive papers have four layers — a comic on-ramp, a guided slideshow, the full text with a hover-to-define
        glossary, and a governance discussion layer. Uploaded PDFs show here until they’re converted.
      </Typography>

      <Box sx={{ mb: 5 }}>
        <Typography variant="overline" sx={{ color: '#1E3A5F', letterSpacing: '0.14em', fontWeight: 700 }}>
          Ready to read
        </Typography>
        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          {seedPapers.map((p) => (
            <Grid key={p.id} size={{ xs: 12, md: 6 }}>
              <InteractiveCard paper={p} />
            </Grid>
          ))}
          {publishedUploads.map((p) => {
            const l = layers[p.id];
            return (
              <Grid key={`u-${p.id}`} size={{ xs: 12, md: 6 }}>
                <InteractiveCard
                  paper={{ id: String(p.id), title: l.title || p.title, journal: l.journal, tagline: l.tagline }}
                  studioId={p.id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box>
        <Typography variant="overline" sx={{ color: '#607d8b', letterSpacing: '0.14em', fontWeight: 700 }}>
          Your uploads
        </Typography>
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1.5 }}>
            <CircularProgress size={18} />
            <Typography variant="body2" sx={{ color: '#607d8b' }}>Loading uploaded papers…</Typography>
          </Box>
        )}
        {fetchError && (
          <Alert severity="error" sx={{ mt: 1.5 }}>
            Could not load uploaded papers: {fetchError}
          </Alert>
        )}
        {!loading && !fetchError && pendingUploads.length === 0 && (
          <Typography variant="body2" sx={{ color: '#78909c', mt: 1.5, fontStyle: 'italic' }}>
            {uploaded.length ? 'Every upload is published.' : 'No uploaded papers yet. Head to Upload to add one.'}
          </Typography>
        )}
        {pendingUploads.length > 0 && (
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            {pendingUploads.map((p) => (
              <Grid key={p.id} size={{ xs: 12, md: 6 }}>
                <UploadedCard paper={p} hasDraft={Boolean(layers[p.id])} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
