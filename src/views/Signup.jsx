
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, TextField, Button, Alert } from '@mui/material';
import { supabase } from '../supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setMessage({
          type: 'success',
          content: 'Signup successful! Please check your email to confirm your account.'
        });
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        content: `Signup failed: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Sign Up
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            minLength="6"
          />
          <Button 
            type="submit"
            variant="contained"
            disabled={loading}
            size="large"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
          {message.content && (
            <Alert severity={message.type}>
              {message.content}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
