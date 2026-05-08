import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { papers as seedPapers } from '../data/papers';

function InteractiveCard({ paper }) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderTop: '4px solid #1E3A5F', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Chip label="4 layers" size="small" sx={{ alignSelf: 'flex-start', backgroundColor: '#F3E4D8', color: '#1E3A5F', fontWeight: 600 }} />
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
      <Button
        component={RouterLink}
        to={`/reader/${paper.id}`}
        variant="contained"
        startIcon={<AutoStoriesIcon />}
        sx={{ mt: 2.5, alignSelf: 'flex-start' }}
      >
        Open reader
      </Button>
    </Paper>
  );
}

function UploadedCard({ paper }) {
  return (
    <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
      <Chip label="Uploaded" size="small" sx={{ backgroundColor: '#eceff1', color: '#455a64' }} />
      <Typography variant="h6" sx={{ mt: 1.5, color: '#263238' }}>
        {paper.title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#607d8b', mt: 0.5 }}>
        {paper.uploadDate ? `Uploaded ${new Date(paper.uploadDate).toLocaleDateString()}` : ''}
      </Typography>
      <Typography variant="body2" sx={{ color: '#78909c', mt: 2, fontStyle: 'italic' }}>
        No interactive layers yet — convert this paper via the studio (coming soon).
      </Typography>
    </Paper>
  );
}

export default function PapersList() {
  const uploaded = useSelector((s) => s.papers.papers);

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
        </Grid>
      </Box>

      {uploaded.length > 0 && (
        <Box>
          <Typography variant="overline" sx={{ color: '#607d8b', letterSpacing: '0.14em', fontWeight: 700 }}>
            Your uploads
          </Typography>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            {uploaded.map((p) => (
              <Grid key={p.id} size={{ xs: 12, md: 6 }}>
                <UploadedCard paper={p} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
