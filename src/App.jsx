
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { login, logout } from './store/authSlice';
import theme from './theme';
import './App.css';

import Navigation from "./components/Navigation";
import Dashboard from "./views/Dashboard";
import PaperUpload from "./views/PaperUpload";
import PaperReader from "./views/PaperReader";
import Games from "./views/Games";
import Leaderboard from "./views/Leaderboard";
import Login from "./views/Login";
import Signup from "./views/Signup";

function AppContent() {
  const dispatch = useDispatch();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (mounted) {
        if (error) {
          console.error("Error getting session:", error);
        } else if (session?.user) {
          dispatch(login({ 
            id: session.user.id, 
            email: session.user.email,
          }));
        }
        setLoadingSession(false);
      }
    }

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          if (session?.user) {
            dispatch(login({ 
              id: session.user.id, 
              email: session.user.email,
            }));
          } else {
            dispatch(logout());
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  if (loadingSession) {
    return <div>Loading session...</div>;
  }

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<PaperUpload />} />
        <Route path="/reader" element={<PaperReader />} />
        <Route path="/games" element={<Games />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
