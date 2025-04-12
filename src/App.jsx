
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import Navigation from './components/Navigation';
import Dashboard from './views/Dashboard';
import PaperUpload from './views/PaperUpload';
import PaperReader from './views/PaperReader';
import Games from './views/Games';
import Leaderboard from './views/Leaderboard';
import Login from './views/Login';
import { store } from './store';
import theme from './theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<PaperUpload />} />
            <Route path="/reader/:id" element={<PaperReader />} />
            <Route path="/games" element={<Games />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
