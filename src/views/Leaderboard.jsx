
import { Container, Typography, Paper, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';

const MOCK_LEADERS = [
  { id: 1, name: 'John Doe', score: 850, gamesPlayed: 12 },
  { id: 2, name: 'Jane Smith', score: 720, gamesPlayed: 8 },
  { id: 3, name: 'Bob Johnson', score: 695, gamesPlayed: 10 },
];

export default function Leaderboard() {
  const userScore = useSelector(state => state.games.score);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Your Score: {userScore}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Games Played</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_LEADERS.map((leader, index) => (
              <TableRow key={leader.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{leader.name}</TableCell>
                <TableCell align="right">{leader.score}</TableCell>
                <TableCell align="right">{leader.gamesPlayed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
