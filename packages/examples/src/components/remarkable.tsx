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
    options = { html: true, xhtmlOut: true },
    source,
    children,
  } = props;
  const md = React.useMemo(() => new Markdown(options), [options]);

  const renderMarkdown = (markdown: string) => {
    const html = md.render(markdown);
    const replaced = html.replace(/(<img)/mg, "<img crossorigin");
    return replaced;
  };

  if (source) {
    return (<span dangerouslySetInnerHTML={{ __html: renderMarkdown(source) }} />);
  }

  return (
    <>
      {
        React.Children.map(children, (child) => {
          if (typeof child === "string") {
            return (<span dangerouslySetInnerHTML={{ __html: renderMarkdown(child) }} />);
          }
          return child;
        })
      }
    </>
  );
};
