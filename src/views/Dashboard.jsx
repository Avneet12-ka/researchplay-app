
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);
  const { score } = useSelector(state => state.games);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome {user ? user.name : 'Guest'}!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Progress
            </Typography>
            <Box>
              <Typography variant="body1">
                Total Score: {score}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body1">
              No recent activity to display.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
