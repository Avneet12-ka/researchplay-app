import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/papers', label: 'Papers' },
  { to: '/upload', label: 'Upload' }
];

export default function Navigation() {
  const { pathname } = useLocation();
  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: 'Roboto Slab, serif',
            color: '#fff',
            textDecoration: 'none',
            letterSpacing: '0.02em'
          }}
        >
          ResearchPlay
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {LINKS.map((l) => (
            <Button
              key={l.to}
              color="inherit"
              component={Link}
              to={l.to}
              sx={{
                backgroundColor: isActive(l.to) ? '#283593' : 'transparent',
                '&:hover': { backgroundColor: '#283593' }
              }}
            >
              {l.label}
            </Button>
          ))}
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{
              ml: 1,
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
