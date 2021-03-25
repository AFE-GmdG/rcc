import React from "react";

import { Gantt } from "../views/gantt";
import { Slash } from "../views/slash";

export type RouteModel = {
  label: string;
  path: string;
  view: React.ComponentType<any>;
};

export const routes: RouteModel[] = [
  {
    label: "Gantt",
    path: "/components/gantt",
    view: Gantt,
  }, {
    label: "Start",
    path: "/",
    view: Slash,
  },
];
