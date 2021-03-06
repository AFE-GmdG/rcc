import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { createStyles, fade, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import { routes } from "../models/route";

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const AppMenu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [appMenuAnchor, setAppMenuAnchor] = React.useState<null | HTMLElement>(null);
  const openAppMenu = Boolean(appMenuAnchor);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAppMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAppMenuAnchor(null);
  };

  const renderDefaultRoute = () => {
    const defaultRoute = routes.find((route) => route.path === "/");
    if (!defaultRoute) {
      return null;
    }
    return (
      <MenuItem
        disabled={location.pathname === defaultRoute.path}
        onClick={() => {
          history.push(defaultRoute.path);
          handleClose();
        }}
      >
        {defaultRoute.label}
      </MenuItem>
    );
  };

  const renderRoutes = () => {
    const otherRoutes = routes.filter((route) => route.path !== "/");
    return otherRoutes.map((route) => (
      <MenuItem
        key={route.label}
        disabled={location.pathname === route.path}
        onClick={() => {
          history.push(route.path);
          handleClose();
        }}
      >
        {route.label}
      </MenuItem>
    ));
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            rcc Example Explorer
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>

      <Menu
        id="app-menu"
        anchorEl={appMenuAnchor}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        getContentAnchorEl={null}
        keepMounted
        open={openAppMenu}
        onClose={handleClose}
      >
        {renderDefaultRoute()}
        {renderRoutes()}
      </Menu>
    </>
  );
};
