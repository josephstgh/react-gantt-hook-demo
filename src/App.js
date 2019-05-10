import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import GanttTL from './GanttTL';
import {
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

function MyApp() {
  return (
    <React.Fragment>
      {/* <MuiThemeProvider theme={theme}> */}
      <CssBaseline />
      <GanttTL />
      {/* </MuiThemeProvider> */}
    </React.Fragment>
  );
}

export default MyApp;