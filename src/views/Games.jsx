
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
    setTimeout(() => {
      dispatch(updateScore(Math.floor(Math.random() * 100)));
    }, 1000);
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
