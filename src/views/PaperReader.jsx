import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams, useSearchParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Link, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import { getPaper, papers } from '../data/papers';
import { supabase, supabaseConfigured } from '../supabaseClient';
import PaperLayers from '../reader/PaperLayers';

export function PaperHeader({ paper }) {
  const byline = [paper.authors, paper.journal].filter(Boolean).join(' — ');
  return (
    <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, backgroundColor: '#fff', border: '1px solid #e6e9ef' }}>
      <Typography variant="overline" sx={{ color: '#1E3A5F', letterSpacing: '0.14em', fontWeight: 700 }}>
        Interactive paper
      </Typography>
      <Typography variant="h4" sx={{ fontFamily: 'Roboto Slab, serif', color: '#0B1728', mt: 0.5 }}>
        {paper.title || 'Untitled paper'}
      </Typography>
      {paper.subtitle && (
        <Typography variant="body1" sx={{ color: '#455a64', mt: 1 }}>
          {paper.subtitle}
        </Typography>
      )}
      {(byline || paper.doi) && (
        <Typography variant="body2" sx={{ color: '#78909c', mt: 1.5 }}>
          {byline}
          {paper.doi && (
            <>
              {byline && ' — '}
              <Link href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">
                doi:{paper.doi}
              </Link>
            </>
          )}
        </Typography>
      )}
      {paper.tagline && (
        <Typography variant="body1" sx={{ color: '#263238', mt: 2, fontStyle: 'italic', maxWidth: 720 }}>
          {paper.tagline}
        </Typography>
      )}
    </Paper>
  );
}

function useUploadedPaper(id) {
  const [state, setState] = useState({ loading: false, paper: null, fileUrl: null, published: false, error: null });

  useEffect(() => {
    if (!id || !/^\d+$/.test(id) || !supabaseConfigured) return;
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));

    supabase
      .from('paper_layers')
      .select('content, published, papers(file_url)')
      .eq('paper_id', Number(id))
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) console.error('Failed to load paper layers:', error);
        setState({
          loading: false,
          paper: data ? { ...data.content, id } : null,
          fileUrl: data?.papers?.file_url || null,
          published: Boolean(data?.published),
          error: error?.message || null,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}

export default function PaperReader() {
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();
  const id = routeId || searchParams.get('id') || papers[0]?.id;
  const seed = getPaper(id);
  const uploaded = useUploadedPaper(seed ? null : id);

  if (!seed && uploaded.loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 6, display: 'flex', gap: 2, alignItems: 'center' }}>
        <CircularProgress size={20} />
        <Typography>Loading paper…</Typography>
      </Container>
    );
  }

  const paper = seed || (uploaded.published ? uploaded.paper : null);

  if (!paper) {
    const hasDraft = !seed && uploaded.paper && !uploaded.published;
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {hasDraft ? 'This paper hasn’t been published yet.' : 'Paper not found.'}
        </Typography>
        {uploaded.error && (
          <Typography variant="body2" sx={{ color: '#c62828', mb: 1 }}>
            {uploaded.error}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          {hasDraft && (
            <Button component={RouterLink} to={`/studio/${id}`} variant="contained" startIcon={<EditIcon />}>
              Continue in studio
            </Button>
          )}
          <Button component={RouterLink} to="/papers">
            All papers
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#fcfcfd', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="lg" sx={{ pt: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Button component={RouterLink} to="/papers" startIcon={<ArrowBackIcon />} size="small" sx={{ color: '#607d8b' }}>
            All papers
          </Button>
          {!seed && uploaded.fileUrl && (
            <Button href={uploaded.fileUrl} target="_blank" rel="noopener" size="small" startIcon={<PictureAsPdfIcon />}>
              Original PDF
            </Button>
          )}
          {!seed && (
            <Button component={RouterLink} to={`/studio/${id}`} size="small" startIcon={<EditIcon />}>
              Edit in studio
            </Button>
          )}
        </Box>
        <PaperHeader paper={paper} />
      </Container>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <PaperLayers key={id} paper={paper} />
      </Container>
    </Box>
  );
}
