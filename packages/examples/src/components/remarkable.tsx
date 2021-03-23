/// <reference path="./remarkable.d.ts" />
/* eslint-disable react/no-danger, @typescript-eslint/naming-convention */

import React from "react";
import { Remarkable as Markdown, RemarkableOptions } from "remarkable";

export type RemarkableProps = {
  options?: RemarkableOptions,
  source?: string,
};

export const Remarkable: React.FC<RemarkableProps> = (props) => {
  const {
    options = { html: true, xhtmlOut: true, breaks: true },
    source,
    children,
  } = props;
  const md = React.useMemo(() => new Markdown(options), [options]);

  if (source) {
    return (<span dangerouslySetInnerHTML={{ __html: md.render(source) }} />);
  }

  return (
    <>
      {
        React.Children.map(children, (child) => {
          if (typeof child === "string") {
            return (<span dangerouslySetInnerHTML={{ __html: md.render(child) }} />);
          }
          return child;
        })
      }
    </>
  );
};
