import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

import { Gantt } from "./views/gantt";
import { Slash } from "./views/slash";

import "./app.css";

const useStyles = makeStyles((theme: Theme) => createStyles({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <AppBar position="relative">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            rcc Example Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box flex="1 0 0px">
        <Switch>
          <Route path="/components/gantt" component={Gantt} />
          <Route component={Slash} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
};

render(
  <App />,
  document.getElementById("app"),
);
