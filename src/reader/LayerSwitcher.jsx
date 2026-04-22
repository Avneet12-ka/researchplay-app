import { Box, Typography } from '@mui/material';

const LAYERS = [
  { key: 'comic', n: 1, label: 'Comic', hint: 'Narrative on-ramp' },
  { key: 'slides', n: 2, label: 'Guided slides', hint: 'Walkthrough + charts' },
  { key: 'paper', n: 3, label: 'Paper + glossary', hint: 'Full text, hover to define' },
  { key: 'governance', n: 4, label: 'Governance', hint: 'Four lenses for your institution' }
];

export default function LayerSwitcher({ active, onChange }) {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 5,
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e0e3ea',
        py: 1.25,
        px: { xs: 1, md: 2 }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          flexWrap: { xs: 'nowrap', md: 'wrap' }
        }}
      >
        {LAYERS.map((l) => {
          const isActive = active === l.key;
          return (
            <Box
              key={l.key}
              role="tab"
              tabIndex={0}
              onClick={() => onChange(l.key)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onChange(l.key)}
              sx={{
                cursor: 'pointer',
                px: 2, py: 1,
                minWidth: 180,
                borderRadius: 1.5,
                border: '1.5px solid',
                borderColor: isActive ? '#1a237e' : '#cfd4dd',
                backgroundColor: isActive ? '#1a237e' : '#fff',
                color: isActive ? '#fff' : '#37474f',
                transition: 'all 160ms ease',
                '&:hover': {
                  borderColor: '#1a237e',
                  backgroundColor: isActive ? '#1a237e' : '#eef0f8'
                }
              }}
            >
              <Typography
                variant="caption"
                sx={{ letterSpacing: '0.12em', fontWeight: 700, color: isActive ? '#c5cae9' : '#9e9e9e' }}
              >
                LAYER {l.n}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {l.label}
              </Typography>
              <Typography variant="caption" sx={{ color: isActive ? '#c5cae9' : '#78909c' }}>
                {l.hint}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
