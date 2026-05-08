import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { papers as seedPapers } from '../data/papers';

const LAYERS = [
  { n: 1, label: 'Comic', body: 'One panel, one beat. Narrative on-ramp for readers who aren’t the target audience.' },
  { n: 2, label: 'Guided slides', body: 'Ten keyboard-navigable slides with live charts and a cohort toggle.' },
  { n: 3, label: 'Paper + glossary', body: 'Full text with hover-to-define dotted terms and margin notes that flag what a sentence actually claims.' },
  { n: 4, label: 'Governance', body: 'Four lenses — institutional policy, regulatory, ethics, equity — written for your institution.' }
];

export default function Dashboard() {
  const { user } = useSelector((s) => s.auth);
  const featured = seedPapers[0];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="overline" sx={{ color: '#1E3A5F', letterSpacing: '0.14em', fontWeight: 700 }}>
        ResearchPlay
      </Typography>
      <Typography variant="h3" sx={{ fontFamily: 'Roboto Slab, serif', color: '#0B1728', mt: 0.5, maxWidth: 820 }}>
        Let readers pick their own entry point into your paper.
      </Typography>
      <Typography variant="h6" sx={{ color: '#455a64', mt: 2, fontWeight: 400, maxWidth: 780, lineHeight: 1.5 }}>
        Welcome{user ? `, ${user.email}` : ''}. Each paper in ResearchPlay has four layers: a comic, a guided slideshow,
        the full text with a hover glossary, and a governance discussion. MBBS students start at Layer 2. A dean jumps
        to Layer 4. A patient’s family stays in Layer 1 — and that’s completely fine.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: 'wrap', gap: 2 }}>
        <Button
          component={RouterLink}
          to={`/reader/${featured.id}`}
          variant="contained"
          size="large"
          startIcon={<AutoStoriesIcon />}
        >
          Open ELAIA-2
        </Button>
        <Button
          component={RouterLink}
          to="/papers"
          variant="outlined"
          size="large"
          startIcon={<FormatListBulletedIcon />}
        >
          All papers
        </Button>
        <Button
          component={RouterLink}
          to="/upload"
          variant="text"
          size="large"
          startIcon={<UploadFileIcon />}
        >
          Upload a PDF
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, borderTop: '4px solid #1E3A5F', height: '100%' }}>
            <Chip label="Featured" size="small" sx={{ backgroundColor: '#F3E4D8', color: '#1E3A5F', fontWeight: 600 }} />
            <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', mt: 2, color: '#0B1728' }}>
              {featured.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#607d8b', mt: 0.5 }}>
              {featured.authors}
            </Typography>
            <Typography variant="body2" sx={{ color: '#607d8b' }}>
              {featured.journal}
            </Typography>
            {featured.tagline && (
              <Typography variant="body1" sx={{ color: '#263238', mt: 2, fontStyle: 'italic' }}>
                {featured.tagline}
              </Typography>
            )}
            <Button
              component={RouterLink}
              to={`/reader/${featured.id}`}
              variant="contained"
              sx={{ mt: 3 }}
              startIcon={<AutoStoriesIcon />}
            >
              Start in Layer 1 (Comic)
            </Button>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, backgroundColor: '#FAF7F2', height: '100%' }}>
            <Typography variant="overline" sx={{ color: '#1E3A5F', letterSpacing: '0.12em', fontWeight: 700 }}>
              How the layers work
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              {LAYERS.map((l) => (
                <Box key={l.n} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      minWidth: 32, height: 32, borderRadius: '50%',
                      backgroundColor: '#1E3A5F', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700
                    }}
                  >
                    {l.n}
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#0B1728' }}>
                      {l.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#455a64', lineHeight: 1.55 }}>
                      {l.body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
