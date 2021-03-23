import React from "react";
import { render } from "react-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Menu as MenuIcon } from "@material-ui/icons";

import "./app.css";

const useStyles = makeStyles((theme: Theme) => createStyles({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
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
  );
};

render(
  <App />,
  document.getElementById("app"),
);
