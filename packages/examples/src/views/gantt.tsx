import React from "react";
import { useRouteMatch } from "react-router-dom";

export const Gantt: React.FC = () => {
  const match = useRouteMatch();

  console.log("Gantt: ", match);

  return (
    <div />
  );
};
