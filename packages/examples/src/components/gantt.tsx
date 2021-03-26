/* eslint-disable @typescript-eslint/no-use-before-define */

import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { GanttConfig } from "../models/gantt";

const useStyles = makeStyles((_theme: Theme) => createStyles({
  ganttBox: {
    position: "relative",
    display: "grid",
  },
  box: {
    border: "1px solid #000",
  },
}));

export type GanttProps = {
  className?: string;
  data: GanttConfig;
};

export const Gantt: React.FC<GanttProps> = (props) => {
  const { className, data } = props;

  const classes = useStyles();
  const visibleSlots = calculateVisibleSlots();

  return (
    <div className={`${classes.ganttBox} ${className}`}>
      <div className={classes.box} />
    </div>
  );

  function calculateVisibleSlots() {
    console.log("Calculating visible Slots...");
  }
};
