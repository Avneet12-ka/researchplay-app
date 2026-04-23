import { useMemo, useState } from 'react';
import { Link as RouterLink, useParams, useSearchParams } from 'react-router-dom';
import { Box, Container, Link, Paper, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPaper, papers } from '../data/papers';
import LayerSwitcher from '../reader/LayerSwitcher';
import ComicLayer from '../reader/ComicLayer';
import SlidesLayer from '../reader/SlidesLayer';
import GlossaryLayer from '../reader/GlossaryLayer';
import GovernanceLayer from '../reader/GovernanceLayer';

const VALID_LAYERS = ['comic', 'slides', 'paper', 'governance'];

export default function PaperReader() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const fallbackId = searchParams.get('id');
  const paper = useMemo(() => getPaper(id || fallbackId || papers[0]?.id), [id, fallbackId]);
  const [layer, setLayer] = useState('comic');

  if (!paper) {
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h5">Paper not found.</Typography>
        <Link component={RouterLink} to="/">Back to dashboard</Link>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#fcfcfd', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="lg" sx={{ pt: 3, pb: 1 }}>
        <Button
          component={RouterLink}
          to="/papers"
          startIcon={<ArrowBackIcon />}
          size="small"
          sx={{ mb: 2, color: '#607d8b' }}
        >
          All papers
        </Button>
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, backgroundColor: '#fff', border: '1px solid #e6e9ef' }}>
          <Typography variant="overline" sx={{ color: '#1E3A5F', letterSpacing: '0.14em', fontWeight: 700 }}>
            Interactive paper
          </Typography>
          <Typography variant="h4" sx={{ fontFamily: 'Roboto Slab, serif', color: '#0B1728', mt: 0.5 }}>
            {paper.title}
          </Typography>
          {paper.subtitle && (
            <Typography variant="body1" sx={{ color: '#455a64', mt: 1 }}>
              {paper.subtitle}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: '#78909c', mt: 1.5 }}>
            {paper.authors} — {paper.journal}
            {paper.doi && (
              <>
                {' — '}
                <Link href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">
                  doi:{paper.doi}
                </Link>
              </>
            )}
          </Typography>
          {paper.tagline && (
            <Typography variant="body1" sx={{ color: '#263238', mt: 2, fontStyle: 'italic', maxWidth: 720 }}>
              {paper.tagline}
            </Typography>
          )}
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <LayerSwitcher active={layer} onChange={(k) => VALID_LAYERS.includes(k) && setLayer(k)} />
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
        {layer === 'comic' && <ComicLayer comic={paper.comic} />}
        {layer === 'slides' && <SlidesLayer slides={paper.slides} />}
        {layer === 'paper' && <GlossaryLayer paper={paper.paper} />}
        {layer === 'governance' && <GovernanceLayer governance={paper.governance} />}
      </Container>
    </Box>
  );
}
