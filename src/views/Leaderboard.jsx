
import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const userScore = useSelector(state => state.games.score);
  
  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from('game_sessions')
        .select(`
          id,
          score,
          created_at,
          users (
            email
          ),
          papers (
            title
          )
        `)
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching scores:', error);
        return;
      }

      setScores(data.map(session => ({
        id: session.id,
        userName: session.users?.email || 'Anonymous',
        paperTitle: session.papers?.title || 'Unknown Paper',
        score: session.score,
        date: session.created_at
      })));
    };

    fetchScores();
  }, []);
  
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
              <TableCell>Paper</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((score, index) => (
              <TableRow key={score.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{score.userName}</TableCell>
                <TableCell>{score.paperTitle}</TableCell>
                <TableCell align="right">{score.score}</TableCell>
                <TableCell align="right">{new Date(score.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
