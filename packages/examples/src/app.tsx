import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { AppMenu } from "./components/appMenu";

import { routes } from "./models/route";

import "./app.css";

const useStyles = makeStyles((_theme: Theme) => createStyles({
  content: {
    flex: "1 0 0px",
    padding: "0.5rem 1.0rem",
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  const renderRoutes = () => {
    const sortedRoutes = [...routes].sort((l, r) => r.path.length - l.path.length);
    return sortedRoutes.map(({ label, path, view }) => (<Route key={label} path={path} component={view} />));
  };

  return (
    <BrowserRouter>
      <AppMenu />
      <Box className={classes.content}>
        <Switch>
          {renderRoutes()}
        </Switch>
      </Box>
    </BrowserRouter>
  );
};

render(
  <App />,
  document.getElementById("app"),
);
