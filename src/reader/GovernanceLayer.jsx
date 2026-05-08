import { Box, Chip, Divider, Grid, Paper, Typography } from '@mui/material';
import PolicyIcon from '@mui/icons-material/AccountBalance';
import RegulatoryIcon from '@mui/icons-material/Gavel';
import EthicsIcon from '@mui/icons-material/Balance';
import EquityIcon from '@mui/icons-material/Diversity3';
import QuestionIcon from '@mui/icons-material/HelpOutline';

const LENS_ICON = {
  'Institutional policy': <PolicyIcon fontSize="small" />,
  'Regulatory': <RegulatoryIcon fontSize="small" />,
  'Ethics': <EthicsIcon fontSize="small" />,
  'Equity': <EquityIcon fontSize="small" />
};

function GovernanceCard({ card }) {
  return (
    <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, borderTop: '4px solid #1E3A5F', height: '100%' }}>
      <Typography variant="overline" sx={{ color: '#90a4ae', letterSpacing: '0.12em' }}>
        Discussion card
      </Typography>
      <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', color: '#1E3A5F', mt: 0.5, mb: 1.5 }}>
        {card.title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#455a64', mb: 3, lineHeight: 1.6 }}>
        {card.context}
      </Typography>
      <Grid container spacing={2}>
        {card.lenses.map((l) => (
          <Grid key={l.lens} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                p: 2, height: '100%', borderRadius: 1,
                backgroundColor: '#FAF7F2',
                borderLeft: '3px solid #1E3A5F'
              }}
            >
              <Chip
                icon={LENS_ICON[l.lens]}
                label={l.lens}
                size="small"
                sx={{ backgroundColor: '#1E3A5F', color: '#fff', mb: 1, '& .MuiChip-icon': { color: '#fff' } }}
              />
              <Typography variant="body2" sx={{ color: '#263238', lineHeight: 1.6 }}>
                {l.body}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <QuestionIcon sx={{ color: '#1E3A5F', mt: 0.25 }} />
        <Box>
          <Typography variant="caption" sx={{ color: '#1E3A5F', fontWeight: 700, letterSpacing: '0.08em' }}>
            DISCUSSION PROMPT
          </Typography>
          <Typography variant="body1" sx={{ color: '#263238', mt: 0.5, fontStyle: 'italic' }}>
            {card.prompt}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default function GovernanceLayer({ governance }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ color: '#607d8b', mb: 3, maxWidth: 720 }}>
        {governance.intro}
      </Typography>
      <Grid container spacing={3}>
        {governance.cards.map((card) => (
          <Grid key={card.id} size={{ xs: 12, md: 6 }}>
            <GovernanceCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
