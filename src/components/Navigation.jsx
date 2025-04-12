
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto Slab' }}>
          ResearchPlay
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ '&:hover': { backgroundColor: '#283593' } }}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/upload"
            sx={{ '&:hover': { backgroundColor: '#283593' } }}
          >
            Upload
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/games"
            sx={{ '&:hover': { backgroundColor: '#283593' } }}
          >
            Games
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/leaderboard"
            sx={{ '&:hover': { backgroundColor: '#283593' } }}
          >
            Leaderboard
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/login"
            sx={{ 
              backgroundColor: '#4caf50',
              '&:hover': { backgroundColor: '#388e3c' }
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
