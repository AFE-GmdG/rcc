/* eslint-disable import/no-webpack-loader-syntax */

import React from "react";
import { Remarkable } from "../components/remarkable";
/* @ts-ignore */
import md from "!!raw-loader!../../../../README.md";

export const Slash: React.FC = () => {
  if (md == null) {
    return null;
  }

  return (
    <Remarkable source={md} />
  );
};
