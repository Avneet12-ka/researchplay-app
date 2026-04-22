import { Box, Grid, Typography } from '@mui/material';
import ComicPanel from './ComicPanel';

export default function ComicLayer({ comic }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ color: '#607d8b', mb: 3, maxWidth: 720 }}>
        The comic layer is the on-ramp. One visual, one beat per panel. SVG placeholders today; swap in
        commissioned art later without touching the structure.
      </Typography>
      <Grid container spacing={3}>
        {comic.panels.map((panel, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <ComicPanel panel={panel} index={i} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
