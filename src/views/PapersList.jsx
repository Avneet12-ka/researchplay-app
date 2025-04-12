
import { Container, Typography, Paper, Box, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';
import { useSelector } from 'react-redux';

export default function PapersList() {
  const papers = useSelector(state => state.papers.papers);
  const user = useSelector(state => state.auth.user);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Uploaded Papers
      </Typography>
      <Paper sx={{ p: 3 }}>
        <List>
          {papers.map((paper) => (
            <ListItem key={paper.id} divider>
              <ListItemText 
                primary={paper.title}
                secondary={`Uploaded on ${new Date(paper.uploadDate).toLocaleDateString()}`}
              />
              <ListItemSecondaryAction>
                <Button variant="contained" color="primary" href={`/reader?id=${paper.id}`}>
                  Read
                </Button>
                {user?.role === 'staff' && (
                  <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
                    Create Game
                  </Button>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
