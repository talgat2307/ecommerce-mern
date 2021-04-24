import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#03071e',
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