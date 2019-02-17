import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import MyAppBar from "./MyAppBar";
import LandingForm from "./LandingForm";
import Login from "./Login";

const theme = createMuiTheme({
    palette: {
        primary: grey,
    }
});


export default (props) => {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <MyAppBar />
                <Switch>
                    <Route exact path="/" component={LandingForm} />
                    <Route path="/logic" component={Login} />
                </Switch>
            </MuiThemeProvider>
        </Router>
    );
}