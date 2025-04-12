
import { Container, Typography, Paper, Box } from '@mui/material';

export default function PaperReader() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Paper Reader
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box>
          <Typography variant="body1">
            Reader functionality coming soon...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
