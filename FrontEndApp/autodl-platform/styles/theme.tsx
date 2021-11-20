import { createTheme, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: '#252934'
    },
    secondary: {
      main: '#0066FF',
    },
    background: {
      paper: '#F1F3F7',
      default: '#6093BB26'
    }
  },
}));

export default theme;
