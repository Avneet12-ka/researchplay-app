
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Link } from '@mui/material';
import { login } from '../store/authSlice';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '', role: 'student' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd validate and make an API call here
    dispatch(login({ name: credentials.email.split('@')[0], email: credentials.email }));
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={credentials.role}
                label="Role"
                onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>
            <Button 
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account? <Link href="https://replit.com/signup" target="_blank">Sign up</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
