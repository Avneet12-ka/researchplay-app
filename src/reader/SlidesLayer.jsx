import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BarChart from './BarChart';

function SlideBody({ slide }) {
  if (slide.kind === 'title') {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontFamily: 'Roboto Slab, serif', color: '#1E3A5F', mb: 2 }}>
          {slide.title}
        </Typography>
        <Typography variant="h6" sx={{ color: '#37474f', maxWidth: 620, lineHeight: 1.5, fontWeight: 400 }}>
          {slide.body}
        </Typography>
      </Box>
    );
  }
  if (slide.kind === 'headline') {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontFamily: 'Roboto Slab, serif', color: '#1E3A5F', fontSize: 128, fontWeight: 800 }}>
          {slide.title}
        </Typography>
        <Typography variant="h6" sx={{ color: '#37474f', maxWidth: 620, mx: 'auto', mt: 1 }}>
          {slide.body}
        </Typography>
      </Box>
    );
  }
  if (slide.kind === 'chart') {
    return (
      <Box>
        <Typography variant="h4" sx={{ fontFamily: 'Roboto Slab, serif', color: '#1E3A5F', mb: 1 }}>
          {slide.title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#37474f', mb: 4, maxWidth: 680 }}>
          {slide.body}
        </Typography>
        <Box sx={{ maxWidth: 640 }}>
          <BarChart bars={slide.chart.bars} max={slide.chart.max} unit={slide.chart.unit} />
        </Box>
      </Box>
    );
  }
  if (slide.kind === 'cohortChart') {
    return <CohortChartSlide slide={slide} />;
  }
  return (
    <Box>
      <Typography variant="h4" sx={{ fontFamily: 'Roboto Slab, serif', color: '#1E3A5F', mb: 2 }}>
        {slide.title}
      </Typography>
      <Typography variant="body1" sx={{ color: '#37474f', maxWidth: 680, lineHeight: 1.7 }}>
        {slide.body}
      </Typography>
    </Box>
  );
}

function CohortChartSlide({ slide }) {
  const keys = Object.keys(slide.cohorts);
  const [cohort, setCohort] = useState(keys[0]);
  const data = slide.cohorts[cohort];
  return (
    <Box>
      <Typography variant="h4" sx={{ fontFamily: 'Roboto Slab, serif', color: '#1E3A5F', mb: 1 }}>
        {slide.title}
      </Typography>
      <Typography variant="body1" sx={{ color: '#37474f', mb: 3, maxWidth: 720 }}>
        {slide.body}
      </Typography>
      <ToggleButtonGroup
        value={cohort}
        exclusive
        onChange={(_, v) => v && setCohort(v)}
        size="small"
        sx={{ mb: 2 }}
      >
        {keys.map((k) => (
          <ToggleButton key={k} value={k} sx={{ px: 3, fontWeight: 600 }}>{k}</ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Typography variant="caption" sx={{ display: 'block', color: '#607d8b', mb: 2 }}>
        {data.note}
      </Typography>
      <Box sx={{ maxWidth: 720 }} key={cohort}>
        <BarChart bars={data.bars} max={slide.max} unit="%" />
      </Box>
    </Box>
  );
}

export default function SlidesLayer({ slides }) {
  const [i, setI] = useState(0);
  const total = slides.length;
  const slide = slides[i];

  const next = useCallback(() => setI((n) => Math.min(n + 1, total - 1)), [total]);
  const prev = useCallback(() => setI((n) => Math.max(n - 1, 0)), []);

  useEffect(() => {
    const h = (e) => {
      if (e.target && ['INPUT', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) {
        // Still allow arrow keys from buttons, but skip if actively typing.
        if (e.target.tagName !== 'BUTTON') return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { next(); e.preventDefault(); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { prev(); e.preventDefault(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [next, prev]);

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, minHeight: 420, position: 'relative' }}>
        <Typography variant="caption" sx={{ color: '#9e9e9e', letterSpacing: '0.12em', fontWeight: 600 }}>
          {slide.eyebrow}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <SlideBody slide={slide} />
        </Box>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={prev} disabled={i === 0}>
          Previous
        </Button>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {slides.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => setI(idx)}
              sx={{
                width: 10, height: 10, borderRadius: '50%',
                backgroundColor: idx === i ? '#1E3A5F' : '#cfd8dc',
                cursor: 'pointer',
                transition: 'background-color 200ms'
              }}
            />
          ))}
        </Box>
        <Button endIcon={<ArrowForwardIcon />} onClick={next} disabled={i === total - 1}>
          Next
        </Button>
      </Box>
      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#90a4ae', mt: 1 }}>
        Use ← / → or PageUp / PageDown to navigate.
      </Typography>
    </Box>
  );
}
