import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b4965',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: [
    'Roboto',
    'sans-serif'
  ],
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      }
    }
  },
  props: {
    MuiButton: {
      disableElevation: true,
      disableRipple: true
    }
  }
});

export default theme;