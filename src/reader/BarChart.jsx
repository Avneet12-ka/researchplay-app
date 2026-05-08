import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

// Bars draw themselves when they mount or when the `cohort` key changes.
// Keying the parent component on cohort is what makes the animation re-run.
export default function BarChart({ bars, max, unit = '%' }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
      {bars.map((b, i) => {
        const pct = Math.min(100, (b.value / max) * 100);
        return (
          <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '180px 1fr 70px', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body2" sx={{ color: '#37474f', textAlign: 'right' }}>
              {b.label}
            </Typography>
            <Box sx={{ backgroundColor: '#eceff1', borderRadius: 1, height: 22, overflow: 'hidden' }}>
              <Box
                sx={{
                  width: drawn ? `${pct}%` : '0%',
                  height: '100%',
                  backgroundColor: b.color,
                  transition: 'width 900ms cubic-bezier(.2,.8,.2,1)',
                  borderRadius: 1
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ fontVariantNumeric: 'tabular-nums', color: '#1E3A5F', fontWeight: 600 }}>
              {b.value}{unit}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
