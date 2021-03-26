import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import SettingsIcon from "@material-ui/icons/Settings";

import { Gantt as GanttChart } from "../components/gantt";
import { createEmptyGanttConfig, isGanttWeekDay } from "../models/gantt";

const useStyles = makeStyles((theme: Theme) => createStyles({
  ganttContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
  },
  setupBox: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing("0.5rem", "1.0rem"),
  },
  grow: {
    flexGrow: 1,
  },
  ganttBox: {
    flex: "1 0 0px",
    padding: theme.spacing("0.5rem", "1.0rem", "1.0rem", "1.0rem"),
  },
}));

export const Gantt: React.FC = () => {
  const classes = useStyles();
  const [ganttConfig, setGanttConfig] = React.useState(createEmptyGanttConfig());
  const [myText, setMyText] = React.useState("");
  React.useEffect(() => {
    import("../assets/gantt.json").then(({ default: { firstDayOfWeek } }) => {
      if (!isGanttWeekDay(firstDayOfWeek)) {
        console.error("Invalid Data");
        return;
      }
      setGanttConfig({ ...ganttConfig, firstDayOfWeek });
    }, console.error);
  }, []);

  return (
    <Paper elevation={2} className={classes.ganttContainer}>
      <div className={classes.setupBox}>
        <Typography className={classes.grow} variant="h6">rcc Gantt Chart</Typography>
        <Button startIcon={<SettingsIcon />} color="primary" variant="contained">Setup</Button>
      </div>
      <GanttChart className={classes.ganttBox} data={ganttConfig} />
      <div className={classes.setupBox}>
        <input type="text" value={myText} onChange={(e) => setMyText(e.currentTarget.value)} placeholder="Type here..." />
        <p>{myText}</p>
      </div>
    </Paper>
  );
};
