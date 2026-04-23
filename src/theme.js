import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A5F',
      dark: '#14263F',
      light: '#3E5A7F',
      contrastText: '#FAF7F2',
    },
    secondary: {
      main: '#C26A3D',
      dark: '#9E4E25',
      light: '#D68A62',
      contrastText: '#FAF7F2',
    },
    background: {
      default: '#FAF7F2',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0B1728',
      secondary: '#455a64',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: { fontFamily: 'Roboto Slab, serif', color: '#0B1728' },
    h4: { fontFamily: 'Roboto Slab, serif', color: '#0B1728' },
    h5: { fontFamily: 'Roboto Slab, serif', color: '#1E3A5F' },
    h6: { fontFamily: 'Roboto Slab, serif' },
  },
});

export default theme;
