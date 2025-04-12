
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Paper, Box, TextField, Button, Alert, Link } from '@mui/material';
import { supabase } from '../supabaseClient';
import { login } from '../store/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session && data.user) {
        dispatch(login({ 
          id: data.user.id, 
          email: data.user.email,
        }));
        setMessage({ type: 'success', content: 'Login successful!' });
        navigate('/');
      }
    } catch (error) {
      setMessage({ type: 'error', content: `Login failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            size="large"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {message.content && (
            <Alert severity={message.type}>
              {message.content}
            </Alert>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link component={RouterLink} to="/signup">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
