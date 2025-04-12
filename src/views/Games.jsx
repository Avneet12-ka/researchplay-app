
import { useState } from 'react';
import { Container, Typography, Paper, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentGame, updateScore } from '../store/gamesSlice';

import { useSelector } from 'react-redux';

const createGameFromPaper = (paper) => ({
  id: `game-${paper.id}`,
  title: `Quiz: ${paper.title}`,
  description: 'Test your understanding of the research paper',
  paperId: paper.id
});

export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const dispatch = useDispatch();

  const handlePlayGame = (game) => {
    setSelectedGame(game);
    dispatch(setCurrentGame(game));
    // Simulate scoring
    try {
      // Create game session in Supabase
      const { data: gameSession, error } = await supabase
        .from('game_sessions')
        .insert([{
          paper_id: game.paperId,
          user_id: auth.user?.id,
          started_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;

      // Update score in Redux
      dispatch(updateScore(0)); // Reset score for new game
      navigate(`/game/${gameSession[0].id}`);
    } catch (err) {
      console.error('Error starting game:', err);
    }
  };

  const papers = useSelector(state => state.papers.papers);
  const games = papers.map(createGameFromPaper);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Paper-Based Games
      </Typography>
      <Grid container spacing={3}>
        {games.map((game) => (
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
