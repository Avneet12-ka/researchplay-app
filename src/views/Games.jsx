
import { Container, Typography, Paper, Box } from '@mui/material';

export default function Games() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Games
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box>
          <Typography variant="body1">
            Games coming soon...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
