
import { useState } from 'react';
import { Container, Typography, Paper, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentGame, updateScore } from '../store/gamesSlice';

const GAMES = [
  { id: 1, title: 'Vocabulary Match', description: 'Match research terms with their definitions' },
  { id: 2, title: 'Citation Challenge', description: 'Format citations correctly to earn points' },
  { id: 3, title: 'Research Quiz', description: 'Test your knowledge of research methodologies' },
];

export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const dispatch = useDispatch();

  const handlePlayGame = (game) => {
    setSelectedGame(game);
    dispatch(setCurrentGame(game));
    // Simulate scoring
    setTimeout(() => {
      dispatch(updateScore(Math.floor(Math.random() * 100)));
    }, 1000);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Research Games
      </Typography>
      <Grid container spacing={3}>
        {GAMES.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {game.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {game.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handlePlayGame(game)}
                >
                  Play Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
